#!/usr/bin/env python3
from __future__ import annotations

import argparse
import os
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Update Primeus/Codex room state summary.")
    parser.add_argument("--topic", required=True)
    parser.add_argument("--owner", required=True, choices=["primeus", "codex"])
    parser.add_argument("--status", required=True)
    parser.add_argument("--last-action", required=True)
    parser.add_argument("--needs-boss", default="none")
    parser.add_argument(
        "--state-file",
        default=os.environ.get("PRIMEUS_MONITOR_ROOM_STATE_FILE", "./data/PRIMEUS_CODEX_ROOM_STATE.sample.md"),
        help="Path to PRIMEUS_CODEX_ROOM_STATE.md",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    state_file = Path(args.state_file)
    state_file.parent.mkdir(parents=True, exist_ok=True)

    content = "\n".join(
        (
            "# PRIMEUS_CODEX_ROOM_STATE.md",
            "",
            f"- current topic: {args.topic.strip()}",
            f"- current owner: {args.owner.strip()}",
            f"- status: {args.status.strip()}",
            f"- last action: {args.last_action.strip()}",
            f"- needs boss: {args.needs_boss.strip()}",
            "",
        )
    )
    state_file.write_text(content, encoding="utf-8")
    print(f"Updated room state at {state_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
