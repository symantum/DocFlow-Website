from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field


def to_camel(value: str) -> str:
    first, *rest = value.split("_")
    return first + "".join(word.capitalize() for word in rest)


class IntakeData(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        extra="forbid",
        str_strip_whitespace=True,
    )


ShortText = Annotated[str, Field(min_length=1, max_length=200)]
LongText = Annotated[str, Field(min_length=10, max_length=4000)]


class PilotData(IntakeData):
    full_name: ShortText
    company_name: ShortText
    work_email: EmailStr
    country: ShortText
    locations: ShortText
    monthly_volume: ShortText
    accounting_system: ShortText
    intake_method: ShortText
    delivery_method: ShortText
    capability: Literal["automation", "both"]
    target_start: ShortText
    objective: LongText
    consent: Literal[True]


class ProductionData(IntakeData):
    full_name: ShortText
    company_name: ShortText
    work_email: EmailStr
    country: ShortText
    monthly_volume: ShortText
    locations: ShortText
    accounting_system: ShortText
    intake_method: ShortText
    integration_type: ShortText
    target_start: ShortText
    objective: LongText
    service_choice: Literal["ap-only", "client-portal", "intelligence"]
    consent: Literal[True]


class ContactData(IntakeData):
    full_name: ShortText
    company_name: ShortText
    work_email: EmailStr
    inquiry_type: ShortText
    message: LongText
    consent: Literal[True]


class PublicSubmissionRequest(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, extra="forbid")

    kind: Literal["pilot", "production", "contact"]
    data: dict
    bot_token: str | None = Field(default=None, max_length=4096)


class PublicSubmissionResponse(BaseModel):
    reference: str
    status: str


class EmailVerificationResponse(BaseModel):
    application_id: str
    status: str
    account_id: str | None = None
    provision_status: str | None = None


class ApplicationStatusUpdate(BaseModel):
    status: Literal["UNDER_REVIEW", "APPROVED", "REJECTED"]


class ApplicationReviewIn(BaseModel):
    """Confirmed by Symantum before APPROVED provisions AP. Not a public form."""

    display_name: str = Field(min_length=1, max_length=200)
    ap_only: bool = True
    use_symantum_alias: bool = True
    client_intake_email: str | None = Field(default=None, max_length=320)
    delivery_mode: Literal["email", "sftp", "email_and_sftp"] = "email"


class ApplicationReviewOut(BaseModel):
    application_id: str
    kind: str
    status: str
    work_email: str
    organisation_name: str
    account_id: str | None = None
    provision_status: str | None = None
    payload: dict
    review: dict | None = None
    created_at: str | None = None


INTAKE_MODELS = {
    "pilot": PilotData,
    "production": ProductionData,
    "contact": ContactData,
}
