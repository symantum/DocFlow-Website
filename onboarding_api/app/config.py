from functools import lru_cache
from typing import Literal

from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # staging = hosted on DO before Postmark/Turnstile; production = public forms go-live
    environment: Literal["development", "test", "staging", "production"] = "development"
    database_url: str = "sqlite:///./docflow_onboarding.db"
    auto_create_tables: bool = True
    allowed_origins: str = "http://localhost:5173"
    public_website_url: str = "http://localhost:5173"

    email_provider: Literal["outbox", "postmark"] = "outbox"
    email_from: str = "DocFlow by Symantum <onboarding@localhost>"
    internal_notification_email: str = "onboarding@localhost"
    postmark_server_token: str = ""

    bot_provider: Literal["disabled", "turnstile"] = "disabled"
    turnstile_secret_key: str = ""

    app_secret: str = "development-only-secret-change-before-deploy"
    internal_api_key: str = "development-internal-api-key"
    consent_version: str = "2026-09-17"
    rate_limit_requests: int = 10
    rate_limit_window_seconds: int = 3600

    # Phase 8 — AP provision (onboarding coordinator → AP internal-provision)
    ap_provision_enabled: bool = True
    ap_portal_url: str = ""
    ap_portal_integration_secret: str = ""
    email_alias_domain: str = "df.symantum.com"

    @field_validator("allowed_origins")
    @classmethod
    def validate_origins(cls, value: str) -> str:
        if not any(origin.strip() for origin in value.split(",")):
            raise ValueError("ALLOWED_ORIGINS must contain at least one origin")
        return value

    @model_validator(mode="after")
    def validate_deployed_security(self) -> "Settings":
        if self.environment not in ("staging", "production"):
            return self
        if len(self.app_secret) < 32 or "change" in self.app_secret.lower() or "local-" in self.app_secret.lower():
            raise ValueError("Deployed APP_SECRET must be a strong environment secret")
        if (
            len(self.internal_api_key) < 32
            or "development" in self.internal_api_key.lower()
            or "local-" in self.internal_api_key.lower()
        ):
            raise ValueError("Deployed INTERNAL_API_KEY must be a strong environment secret")
        if self.auto_create_tables:
            raise ValueError("Deployed environments must use migrations, not AUTO_CREATE_TABLES")
        if self.environment == "staging":
            # Hosted intake + AP review before public email/bot providers.
            return self
        if self.email_provider != "postmark" or not self.postmark_server_token:
            raise ValueError("Production requires a configured transactional email provider")
        if self.bot_provider != "turnstile" or not self.turnstile_secret_key:
            raise ValueError("Production requires configured bot protection")
        return self

    @property
    def origin_list(self) -> list[str]:
        return [origin.strip().rstrip("/") for origin in self.allowed_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
