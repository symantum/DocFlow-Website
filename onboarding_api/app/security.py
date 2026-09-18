import hashlib
import hmac
import json
import secrets


REFERENCE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


def new_reference(prefix: str, length: int = 8) -> str:
    token = "".join(secrets.choice(REFERENCE_ALPHABET) for _ in range(length))
    return f"{prefix}-{token}"


def new_verification_token() -> str:
    return secrets.token_urlsafe(32)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def request_hash(payload: dict) -> str:
    canonical = json.dumps(payload, sort_keys=True, separators=(",", ":"), ensure_ascii=True)
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()


def source_hash(source: str, app_secret: str) -> str:
    digest = hmac.new(app_secret.encode("utf-8"), source.encode("utf-8"), hashlib.sha256)
    return digest.hexdigest()


def constant_time_equal(left: str, right: str) -> bool:
    return hmac.compare_digest(left, right)
