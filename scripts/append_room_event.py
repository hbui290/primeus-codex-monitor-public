#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import os
from datetime import datetime
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Append a Primeus/Codex room event.")
    parser.add_argument("--from", dest="from_actor", required=True, choices=["primeus", "codex"])
    parser.add_argument("--to", dest="to_actor", required=True, choices=["primeus", "codex"])
    parser.add_argument(
        "--type",
        dest="event_type",
        required=True,
        choices=["task", "update", "question", "answer", "decision", "blocked", "done"],
    )
    parser.add_argument("--topic", required=True)
    parser.add_argument("--status", required=True)
    parser.add_argument("--text", required=True)
    parser.add_argument(
        "--room-file",
        default=os.environ.get("PRIMEUS_MONITOR_ROOM_FILE", "./data/PRIMEUS_CODEX_ROOM.sample.jsonl"),
        help="Path to PRIMEUS_CODEX_ROOM.jsonl",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    room_file = Path(args.room_file)
    room_file.parent.mkdir(parents=True, exist_ok=True)

    payload = {
        "ts": datetime.now().astimezone().replace(microsecond=0).isoformat(),
        "from": args.from_actor,
        "to": args.to_actor,
        "type": args.event_type,
        "topic": args.topic.strip(),
        "status": args.status.strip(),
        "text": args.text.strip(),
    }

    with room_file.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(payload, ensure_ascii=True) + "\n")

    print(f"Appended room event to {room_file}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
