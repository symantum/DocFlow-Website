#!/bin/sh
set -e
echo "Running alembic upgrade head..."
alembic upgrade head
echo "Starting DocFlow Onboarding API..."
PORT="${PORT:-8080}"
exec uvicorn app.main:app --host 0.0.0.0 --port "$PORT"
