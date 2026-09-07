#!/usr/bin/env python3
"""Что из каталога ещё не описано словами.

    python3 scripts/docs_coverage.py

Печатает точки и места, которых нет в docs/extension-points.md. Это НЕ страж:
код возврата всегда 0. Робот пересъёма вставляет этот список в текст коммита,
чтобы человек, открыв историю, увидел, где не хватает абзаца. Останавливать
обновление снимка из-за прозы нельзя: снимок привязан к релизу, а абзац
пишется потом.
"""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    catalog = json.loads((ROOT / "snapshot/platform-catalog/v1/platform-catalog.json").read_text("utf-8"))
    doc = (ROOT / "docs/extension-points.md").read_text("utf-8")
    points = [p["key"] for p in catalog.get("extension_points", []) if p["key"] not in doc]
    places = [p["placement"] for p in catalog.get("ui_placements", []) if p["placement"] not in doc]
    if not points and not places:
        print("документация называет каждую точку и каждое место каталога")
        return 0
    print("нужен абзац в docs/extension-points.md:")
    for key in points:
        print(f"  точка {key}")
    for key in places:
        print(f"  место {key}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
