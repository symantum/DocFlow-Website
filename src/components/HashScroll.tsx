import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * >>> NAV↔PAGE HASH BRIDGE (start)
 * Revert: delete NAV_HASH_ALIASES below and the resolveHashId() call;
 * restore direct `id = decodeURIComponent(hash.slice(1))` only (keep validate→audit
 * inline if you still need that one legacy Automation link).
 *
 * Public nav hashes stay Phase 1 labels. Page elements keep content-stable ids.
 * This table is the only contract between them.
 */
const NAV_HASH_ALIASES: Record<string, string> = {
  // Automation — legacy
  validate: 'audit',

  // Analytics — Phase 1 nav → capability cards
  spending: 'spend-dashboard',
  insights: 'vendor-category',
  detections: 'anomalies',
  guardrails: 'budget',
  // Analytics — older hashes → same cards
  reports: 'spend-dashboard',
  advice: 'vendor-category',
  'spend-dashboard': 'spend-dashboard',
  'vendor-category': 'vendor-category',
  anomalies: 'anomalies',
  budget: 'budget',

  // Data Integrity — Phase 1 nav → page targets
  architecture: 'architecture',
  sovereignty: 'local-residency',
  compliance: 'outcome',
  // Data Integrity — older / interim hashes
  outcome: 'outcome',
  risks: 'risks',
  'local-residency': 'local-residency',

  // Resources — Phase 1 nav → Blueprint sections
  company: 'company',
  model: 'model',
  credentials: 'credentials',
  // Resources — essay deep links
  'verified-capture': 'verified-capture',
  'spend-control': 'spend-control',
}
// <<< NAV↔PAGE HASH BRIDGE (end)

function resolveHashId(raw: string): string {
  return NAV_HASH_ALIASES[raw] ?? raw
}

/** Scroll to the hash target after client-side route or hash changes. */
export default function HashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = resolveHashId(decodeURIComponent(hash.slice(1)))

    let cancelled = false
    const scrollToHash = () => {
      if (cancelled) return false
      const el = document.getElementById(id)
      if (!el) return false
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return true
    }

    if (scrollToHash()) return

    const t1 = window.setTimeout(scrollToHash, 50)
    const t2 = window.setTimeout(scrollToHash, 200)
    return () => {
      cancelled = true
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [pathname, hash])

  return null
}
