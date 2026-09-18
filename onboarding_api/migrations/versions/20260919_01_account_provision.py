"""Add Account ID and AP provision fields to applications (Phase 8).

Revision ID: 20260919_01
Revises: 20260917_01
"""

from alembic import op
import sqlalchemy as sa


revision = "20260919_01"
down_revision = "20260917_01"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("applications", sa.Column("account_id", sa.String(length=20), nullable=True))
    op.add_column("applications", sa.Column("provision_status", sa.String(length=30), nullable=True))
    op.add_column("applications", sa.Column("provisioned_at", sa.DateTime(timezone=True), nullable=True))
    op.add_column("applications", sa.Column("provision_detail", sa.JSON(), nullable=True))
    op.create_index("ix_applications_account_id", "applications", ["account_id"], unique=True)
    op.create_index("ix_applications_provision_status", "applications", ["provision_status"])


def downgrade() -> None:
    op.drop_index("ix_applications_provision_status", table_name="applications")
    op.drop_index("ix_applications_account_id", table_name="applications")
    op.drop_column("applications", "provision_detail")
    op.drop_column("applications", "provisioned_at")
    op.drop_column("applications", "provision_status")
    op.drop_column("applications", "account_id")
