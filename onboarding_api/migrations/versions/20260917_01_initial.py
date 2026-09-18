"""Create DocFlow onboarding intake tables.

Revision ID: 20260917_01
Revises:
"""

from alembic import op
import sqlalchemy as sa


revision = "20260917_01"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "applications",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("application_id", sa.String(20), nullable=False),
        sa.Column("kind", sa.String(20), nullable=False),
        sa.Column("status", sa.String(40), nullable=False),
        sa.Column("work_email", sa.String(320), nullable=False),
        sa.Column("organisation_name", sa.String(200), nullable=False),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("consent_version", sa.String(40), nullable=False),
        sa.Column("email_verified_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("application_id"),
    )
    op.create_index("ix_applications_application_id", "applications", ["application_id"])
    op.create_index("ix_applications_status", "applications", ["status"])
    op.create_index("ix_applications_work_email", "applications", ["work_email"])

    op.create_table(
        "contact_inquiries",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("reference", sa.String(20), nullable=False),
        sa.Column("status", sa.String(30), nullable=False),
        sa.Column("work_email", sa.String(320), nullable=False),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("consent_version", sa.String(40), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("reference"),
    )
    op.create_index("ix_contact_inquiries_reference", "contact_inquiries", ["reference"])
    op.create_index("ix_contact_inquiries_status", "contact_inquiries", ["status"])

    op.create_table(
        "email_verification_tokens",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column(
            "application_pk",
            sa.String(36),
            sa.ForeignKey("applications.id", ondelete="CASCADE"),
            nullable=False,
        ),
        sa.Column("token_hash", sa.String(64), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("used_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("token_hash"),
    )
    op.create_index(
        "ix_email_verification_tokens_application_pk",
        "email_verification_tokens",
        ["application_pk"],
    )
    op.create_index(
        "ix_email_verification_tokens_token_hash",
        "email_verification_tokens",
        ["token_hash"],
    )

    op.create_table(
        "audit_events",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("entity_type", sa.String(30), nullable=False),
        sa.Column("entity_id", sa.String(36), nullable=False),
        sa.Column("event_type", sa.String(60), nullable=False),
        sa.Column("actor", sa.String(80), nullable=False),
        sa.Column("details", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_audit_events_entity_type", "audit_events", ["entity_type"])
    op.create_index("ix_audit_events_entity_id", "audit_events", ["entity_id"])

    op.create_table(
        "outbox_messages",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("recipient", sa.String(320), nullable=False),
        sa.Column("template_alias", sa.String(80), nullable=False),
        sa.Column("subject", sa.String(250), nullable=False),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("status", sa.String(30), nullable=False),
        sa.Column("provider_message_id", sa.String(200)),
        sa.Column("last_error", sa.Text()),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("sent_at", sa.DateTime(timezone=True)),
    )
    op.create_index("ix_outbox_messages_status", "outbox_messages", ["status"])

    op.create_table(
        "idempotency_records",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("key", sa.String(100), nullable=False),
        sa.Column("request_hash", sa.String(64), nullable=False),
        sa.Column("response_payload", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("key", name="uq_idempotency_key"),
    )

    op.create_table(
        "submission_attempts",
        sa.Column("id", sa.String(36), primary_key=True),
        sa.Column("source_hash", sa.String(64), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index(
        "ix_submission_attempt_source_created",
        "submission_attempts",
        ["source_hash", "created_at"],
    )


def downgrade() -> None:
    op.drop_table("submission_attempts")
    op.drop_table("idempotency_records")
    op.drop_table("outbox_messages")
    op.drop_table("audit_events")
    op.drop_table("email_verification_tokens")
    op.drop_table("contact_inquiries")
    op.drop_table("applications")
