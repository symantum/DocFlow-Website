import { useEffect, useRef } from 'react'

const SITE_KEY = String(import.meta.env.VITE_TURNSTILE_SITE_KEY || '').trim()

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
        },
      ) => string
      remove: (widgetId?: string) => void
    }
  }
}

type TurnstileFieldProps = {
  onTokenChange: (token: string | undefined) => void
  className?: string
}

/** Renders Cloudflare Turnstile when VITE_TURNSTILE_SITE_KEY is set; otherwise nothing. */
export function TurnstileField({ onTokenChange, className }: TurnstileFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const onTokenChangeRef = useRef(onTokenChange)
  onTokenChangeRef.current = onTokenChange

  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) {
      onTokenChangeRef.current(undefined)
      return
    }

    let cancelled = false

    const mount = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return
      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null
      }
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        theme: 'light',
        callback: (token) => onTokenChangeRef.current(token),
        'expired-callback': () => onTokenChangeRef.current(undefined),
        'error-callback': () => onTokenChangeRef.current(undefined),
      })
    }

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-docflow-turnstile="1"]',
    )
    if (window.turnstile) {
      mount()
    } else if (existing) {
      existing.addEventListener('load', mount)
    } else {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.docflowTurnstile = '1'
      script.addEventListener('load', mount)
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* ignore */
        }
        widgetIdRef.current = null
      }
    }
  }, [])

  if (!SITE_KEY) return null

  return (
    <div className={className}>
      <div ref={containerRef} />
      <p className="mt-2 text-[11px] text-slate-500">Protected by Cloudflare Turnstile.</p>
    </div>
  )
}

export function turnstileRequired(): boolean {
  return Boolean(SITE_KEY)
}
