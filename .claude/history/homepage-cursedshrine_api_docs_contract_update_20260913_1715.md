# API docs updated after Mecca fixes (2026-09-13 17:15)
- Mecca page: /notification/send → /notification/subscribe {name, email} → 201;
  error section notes no internal detail; statuses add 404/405, 502, 500.
- Mail Service page: gateway route renamed to /api/notification/subscribe.
- Stack chips: Rust 2021 → Rust 2024 (both Cargo.toml files are edition 2024).
- Regenerated via .claude/tools/docs/build_docs.py; generator backup
  .claude/backups/build_docs.py.bak-20260913-1710.
