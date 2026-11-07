#!/usr/bin/env bash
# Пересъём снимка роботом при релизе Akeda.
#
# Робот `sdk-snapshot.yml` в Akeda ERP клонирует этот репозиторий и зовёт этот
# скрипт: что именно проверять перед пушем, решает SDK, а не робот. Раньше
# робот сам перечислял шаги и пушил в main без тестов, а список идемпотентных
# команд закреплён в тестах поимённо — main был красным с 24.09, и этого никто
# не видел, потому что красный CI после пуша никого не останавливал.
#
# Теперь в main уходит только снимок, на котором прошли те же проверки, что и в
# CI. Упали тесты — снимок уходит в ветку robot/snapshot-<релиз>, main не
# трогается, а скрипт завершается ошибкой со ссылкой, по которой человек
# открывает pull request и дописывает решение (например, новую команду в
# закреплённый список). Ключ робота — deploy key: открыть pull request сам он
# не может, а ветку запушить может.
#
# Использование: scripts/robot_refresh.sh <дерево Akeda ERP> <sha релиза>
# Нужны python3 (3.11+), go, node и npm.
set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "использование: scripts/robot_refresh.sh <дерево Akeda ERP> <sha релиза>" >&2
  exit 2
fi
source_tree="$1"
release="$2"
short="${release::12}"

cd "$(dirname "$0")/.."

step="снятие снимка"
trap 'echo "::error::Снимок SDK под релиз $short не снят: упал шаг «$step». main SDK не тронут." >&2' ERR

python3 scripts/snapshot.py --source "$source_tree"
step="генерация"
python3 scripts/generate.py
step="проверка секретов"
python3 scripts/scan_secrets.py
step="сверка снимка и generated"
python3 scripts/snapshot.py --check
python3 scripts/generate.py --check

if [ -z "$(git status --porcelain)" ]; then
  echo "Снимок SDK уже совпадает с релизом $short."
  exit 0
fi

step="покрытие документации"
coverage="$(python3 scripts/docs_coverage.py)"
trap - ERR

# Те же проверки, что в CI. Каждая пишет свой вывод в лог; падение любой не
# прерывает остальные, чтобы человек увидел сразу всё, что разошлось.
work="$(mktemp -d)"
failed=()
check() {
  local name="$1"; shift
  echo "::group::$name"
  if ! "$@"; then failed+=("$name"); fi
  echo "::endgroup::"
}
go_fmt() {
  local unformatted
  unformatted="$(gofmt -l .)"
  [ -z "$unformatted" ] || { echo "$unformatted"; return 1; }
}
python_tests() {
  python3 -m venv "$work/venv" &&
    "$work/venv/bin/python" -m pip install --quiet --disable-pip-version-check pytest &&
    (cd clients/python && "$work/venv/bin/python" -m pytest -q)
}
typescript_tests() {
  (cd clients/typescript && npm ci --no-audit --no-fund && npm test &&
    npx tsc -p ../../examples/typescript/tsconfig.json)
}
check "Go: gofmt" go_fmt
check "Go: vet" go vet ./...
check "Go: тесты" go test ./...
check "Go: линт манифестов" sh -c 'go run ./cmd/akeda manifest lint examples/extension/app.json && go run ./cmd/akeda manifest lint examples/stock-abc/app.json'
check "Python: тесты" python_tests
check "TypeScript: тесты" typescript_tests
rm -rf "$work"

git config user.name "akeda-sdk-snapshot-robot"
git config user.email "akeda-sdk-snapshot-robot@users.noreply.github.com"
git add -A
git commit --quiet -m "Пересъём снимка под релиз $short" \
  -m "Снято роботом с Artogceo/ERP-AKEDA@$release при релизе в main. Номер версии и тег SDK ставит человек." \
  -m "$coverage"

if [ "${#failed[@]}" -eq 0 ]; then
  git push origin HEAD:main
  echo "SDK обновлён под релиз $short."
  exit 0
fi

branch="robot/snapshot-$short"
git push --force origin "HEAD:refs/heads/$branch"
list="$(printf '%s, ' "${failed[@]}")"
echo "::error::Снимок под релиз $short не прошёл проверки SDK (${list%, }). main SDK не тронут; снимок лежит в ветке $branch. Откройте pull request https://github.com/Artogceo/akeda-sdk/compare/main...$branch?expand=1 и допишите то, что тесты требуют решить человеком (например, новую команду в закреплённый список идемпотентных)." >&2
exit 1
