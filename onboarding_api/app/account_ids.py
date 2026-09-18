"""DocFlow Account ID generation (organisation identity)."""

from __future__ import annotations

import re
import secrets

_ACCOUNT_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"
_ACCOUNT_ID_RE = re.compile(r"^DF-[2-9A-HJ-NP-Z]{6}$")


def is_docflow_account_id(value: str | None) -> bool:
    if not value:
        return False
    return bool(_ACCOUNT_ID_RE.match(value.strip().upper()))


def generate_docflow_account_id() -> str:
    body = "".join(secrets.choice(_ACCOUNT_ID_ALPHABET) for _ in range(6))
    return f"DF-{body}"


def account_id_email_local_part(account_id: str) -> str:
    """IMAP/email-safe local-part derived from Account ID (lowercase)."""
    return account_id.strip().lower()
