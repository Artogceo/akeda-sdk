# Сборка расширения «ABC-XYZ анализ запасов».
#
# Контекст сборки — КОРЕНЬ репозитория SDK, а не этот каталог: расширение
# импортирует клиента из clients/go, и контекст, срезанный до examples/stock-abc,
# не увидел бы ни его, ни go.mod.
#
#   docker build -f examples/stock-abc/Dockerfile -t akeda-stock-abc .
#
# Секрета в образе нет и быть не может: токен установки приходит окружением или
# файлом при запуске. Значение, попавшее в слой образа, остаётся в нём навсегда
# и уезжает всюду, куда уезжает образ, — включая реестр.

FROM golang:1.23-alpine AS build

WORKDIR /src

# Зависимостей у SDK нет намеренно, поэтому и go.sum нет: копируется только
# go.mod, клиент и сам пример. Слой не пересобирается от правки документации.
COPY go.mod ./
COPY clients/go ./clients/go
COPY examples/stock-abc ./examples/stock-abc

# CGO выключен: бинарь должен запускаться в образе без libc.
# -trimpath убирает пути сборочной машины из бинаря — они и так никому не нужны,
# а в трассе стека рассказывают о чужом каталоге больше, чем следует.
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/stock-abc ./examples/stock-abc

FROM scratch

# Корневые сертификаты: приложение ходит к Akeda по HTTPS, и без них каждый
# запрос отвергается проверкой сертификата.
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt
COPY --from=build /out/stock-abc /stock-abc

# Не root. Числом, а не именем: в образе scratch нет /etc/passwd, и имя
# пользователя разрешать нечем.
USER 65532:65532

EXPOSE 8090

# Проверка здоровья описана в манифесте как healthUrl и живёт по /healthz.
# HEALTHCHECK здесь не объявлен: в образе нет ни curl, ни wget, а тащить их
# ради одной строки значит добавить в образ оболочку, которой там быть не
# должно. Проверку делает оркестратор своим запросом.

ENTRYPOINT ["/stock-abc"]
