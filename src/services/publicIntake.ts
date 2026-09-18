export type PublicSubmissionKind = 'pilot' | 'production' | 'contact'

export type PublicSubmissionResult = {
  reference?: string
}

const INTAKE_API_URL = String(import.meta.env.VITE_ONBOARDING_API_URL || '').replace(/\/+$/, '')
const pendingIdempotencyKeys = new Map<string, string>()

function newIdempotencyKey(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export async function submitPublicIntake(
  kind: PublicSubmissionKind,
  data: Record<string, unknown>,
  botToken?: string,
): Promise<PublicSubmissionResult> {
  if (!INTAKE_API_URL) {
    throw new Error(
      'Online submission is not connected yet. Please email hello@df.symantum.com for immediate assistance.',
    )
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 15_000)
  const fingerprint = JSON.stringify([kind, data])
  const idempotencyKey = pendingIdempotencyKeys.get(fingerprint) ?? newIdempotencyKey()
  pendingIdempotencyKeys.set(fingerprint, idempotencyKey)

  try {
    const response = await fetch(`${INTAKE_API_URL}/public-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify({ kind, data, botToken }),
      signal: controller.signal,
    })

    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      const detail =
        typeof body.detail === 'string'
          ? body.detail
          : 'We could not submit your request. Please review your details and try again.'
      throw new Error(detail)
    }

    const reference =
      typeof body.application_id === 'string'
        ? body.application_id
        : typeof body.reference === 'string'
          ? body.reference
          : undefined

    pendingIdempotencyKeys.delete(fingerprint)
    return { reference }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('The request timed out. Please try again.')
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

export async function verifyApplicationEmail(
  token: string,
): Promise<{ applicationId: string; status: string }> {
  if (!INTAKE_API_URL) {
    throw new Error('Email verification is not connected yet.')
  }
  const response = await fetch(
    `${INTAKE_API_URL}/email/verify?token=${encodeURIComponent(token)}`,
  )
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(
      typeof body.detail === 'string' ? body.detail : 'The verification link could not be accepted.',
    )
  }
  return {
    applicationId: String(body.application_id || ''),
    status: String(body.status || ''),
  }
}
