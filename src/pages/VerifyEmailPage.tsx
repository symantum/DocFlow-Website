import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, LoaderCircle, TriangleAlert } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyApplicationEmail } from '../services/publicIntake'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const started = useRef(false)
  const [result, setResult] = useState<{
    status: 'verifying' | 'success' | 'error'
    applicationId?: string
    message?: string
  }>({ status: 'verifying' })

  useEffect(() => {
    if (started.current) return
    started.current = true
    const token = searchParams.get('token')
    if (!token) {
      setResult({ status: 'error', message: 'The verification link is incomplete.' })
      return
    }

    verifyApplicationEmail(token)
      .then(({ applicationId }) => setResult({ status: 'success', applicationId }))
      .catch((error) =>
        setResult({
          status: 'error',
          message: error instanceof Error ? error.message : 'Email verification failed.',
        }),
      )
  }, [searchParams])

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden hero-section-pad section-band-a min-h-[70vh] flex items-center">
        <div className="home-container-narrow">
          <div className="section-panel text-center" role="status">
            {result.status === 'verifying' && (
              <>
                <LoaderCircle size={38} className="text-sky-600 animate-spin mx-auto mb-5" />
                <h1 className="type-h1 mb-4">Verifying Your Work Email</h1>
                <p className="hero-lead">Please wait while we validate your secure link.</p>
              </>
            )}

            {result.status === 'success' && (
              <>
                <CheckCircle2 size={42} className="text-emerald-600 mx-auto mb-5" />
                <h1 className="type-h1 mb-4">Work Email Verified</h1>
                <p className="hero-lead mb-4">
                  Your DocFlow application is ready for Symantum review.
                </p>
                {result.applicationId && (
                  <p className="text-sm font-bold text-sky-700 mb-7">
                    Application ID: {result.applicationId}
                  </p>
                )}
                <Link to="/" className="btn-primary text-sm px-8 py-3.5 font-bold">
                  Return to DocFlow
                </Link>
              </>
            )}

            {result.status === 'error' && (
              <>
                <TriangleAlert size={42} className="text-amber-600 mx-auto mb-5" />
                <h1 className="type-h1 mb-4">Verification Link Not Accepted</h1>
                <p className="hero-lead mb-7">{result.message}</p>
                <Link to="/contact" className="btn-primary text-sm px-8 py-3.5 font-bold">
                  Contact the DocFlow Team
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
