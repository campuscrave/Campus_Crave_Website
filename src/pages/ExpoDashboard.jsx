import { useState, useEffect } from 'react'

const VALID_EMAIL = 'admin@campuscrave.com'
const VALID_PASSWORD = import.meta.env.VITE_EXPO_DASHBOARD_PASSWORD || 'CraveExpo2025!'

// ── Eye icon SVGs ────────────────────────────────────────────────────────────

function EyeOpen() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOff() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}

// ── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

// ── Dot-grid background ──────────────────────────────────────────────────────

const DOT_BG = {
  backgroundColor: '#0C0118',
  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
}

// ── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onAuth }) {
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPw, setShowPw]       = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [visible, setVisible]     = useState(false)

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setVisible(true), 30)
    return () => clearTimeout(t)
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (email.toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
        sessionStorage.setItem('expo_auth', 'true')
        onAuth(true)
      } else {
        setError('Incorrect credentials. Try again.')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={DOT_BG}
    >
      {/* Entrance animation wrapper */}
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 400ms ease-out, transform 400ms ease-out',
        }}
      >
        {/* Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Card header */}
          <div style={{ padding: '2rem 2rem 1.5rem', borderBottom: '1px solid #F3F4F6', textAlign: 'center' }}>
            <img
              src="/logo.jpeg"
              alt="CampusCrave"
              style={{ height: '40px', objectFit: 'contain', margin: '0 auto 1.25rem', display: 'block' }}
            />
            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1.375rem',
                fontWeight: 700,
                color: '#0C0118',
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Expo Command Center
            </h1>
            <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '6px', fontWeight: 400 }}>
              CampusCrave · University of Tampa · 2025
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ padding: '1.75rem 2rem 2rem' }}>
            {/* Email */}
            <div style={{ marginBottom: '1rem' }}>
              <label
                htmlFor="expo-email"
                style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}
              >
                Email
              </label>
              <input
                id="expo-email"
                type="email"
                autoComplete="email"
                placeholder="admin@campuscrave.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                required
                style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: `1.5px solid ${error ? '#FCA5A5' : '#E5E7EB'}`,
                  borderRadius: '12px',
                  outline: 'none',
                  color: '#0C0118',
                  background: '#FAFAFA',
                  transition: 'border-color 150ms, box-shadow 150ms',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#6B2FA0'
                  e.target.style.boxShadow = '0 0 0 3px rgba(107,47,160,0.1)'
                  e.target.style.background = '#fff'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = error ? '#FCA5A5' : '#E5E7EB'
                  e.target.style.boxShadow = 'none'
                  e.target.style.background = '#FAFAFA'
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                htmlFor="expo-password"
                style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="expo-password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError('') }}
                  required
                  style={{
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '12px 44px 12px 16px',
                    fontSize: '14px',
                    border: `1.5px solid ${error ? '#FCA5A5' : '#E5E7EB'}`,
                    borderRadius: '12px',
                    outline: 'none',
                    color: '#0C0118',
                    background: '#FAFAFA',
                    transition: 'border-color 150ms, box-shadow 150ms',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6B2FA0'
                    e.target.style.boxShadow = '0 0 0 3px rgba(107,47,160,0.1)'
                    e.target.style.background = '#fff'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = error ? '#FCA5A5' : '#E5E7EB'
                    e.target.style.boxShadow = 'none'
                    e.target.style.background = '#FAFAFA'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  tabIndex={-1}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? <EyeOff /> : <EyeOpen />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div
                style={{
                  marginBottom: '1rem',
                  padding: '10px 14px',
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#DC2626',
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                background: loading ? '#8B5CF6' : '#6B2FA0',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background 200ms, transform 100ms',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#5a2585' }}
              onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#6B2FA0' }}
              onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)' }}
              onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {loading ? <><Spinner /> Verifying…</> : 'Access Dashboard'}
            </button>

            {/* Footer */}
            <p style={{ textAlign: 'center', fontSize: '11px', color: '#D1D5DB', marginTop: '1.25rem', marginBottom: 0 }}>
              Secured · CampusCrave Corp. 2025
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard placeholder ────────────────────────────────────────────────────

function DashboardView({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#0C0118' }}>
          Dashboard loaded ✓
        </h1>
        <button
          onClick={onLogout}
          style={{
            padding: '8px 16px',
            background: 'transparent',
            border: '1.5px solid #E5E7EB',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#6B7280',
            cursor: 'pointer',
            transition: 'border-color 150ms, color 150ms',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#6B2FA0'; e.currentTarget.style.color = '#6B2FA0' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.color = '#6B7280' }}
        >
          Logout
        </button>
      </div>
      <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Full dashboard coming in the next prompt.</p>
    </div>
  )
}

// ── Root export ──────────────────────────────────────────────────────────────

export default function ExpoDashboard() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('expo_auth') === 'true'
  )

  function handleLogout() {
    sessionStorage.removeItem('expo_auth')
    setAuthenticated(false)
  }

  if (authenticated) {
    return <DashboardView onLogout={handleLogout} />
  }

  return <LoginScreen onAuth={setAuthenticated} />
}
