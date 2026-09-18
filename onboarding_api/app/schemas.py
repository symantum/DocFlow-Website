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


class ApplicationStatusUpdate(BaseModel):
    status: Literal["UNDER_REVIEW", "APPROVED", "REJECTED"]


INTAKE_MODELS = {
    "pilot": PilotData,
    "production": ProductionData,
    "contact": ContactData,
}
