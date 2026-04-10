import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const VALID_EMAIL = 'admin@campus-crave.com'
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
                placeholder="admin@campus-crave.com"
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

// ── Mock data ────────────────────────────────────────────────────────────────

const MOCK_DATA = {
  orders: [
    { id: 'CC-0421', student: 'jsmith@ut.edu', restaurant: 'Green Lemon', items: 'Tacos x2', total: '$12.50', status: 'READY', time: '2:34 PM' },
    { id: 'CC-0420', student: 'mrodriguez@ut.edu', restaurant: 'Jay Luigi', items: 'Pasta', total: '$14.00', status: 'CONFIRMED', time: '2:28 PM' },
    { id: 'CC-0419', student: 'alopez@ut.edu', restaurant: 'Taco Dirty', items: 'Burrito x1', total: '$9.75', status: 'COMPLETED', time: '2:15 PM' },
  ],
  surveys: [
    { email: 'jsmith@ut.edu', year: 'Junior', mealPlan: 'Yes - $200/sem', wouldUse: true, comment: 'Would love this!', time: '2:30 PM' },
    { email: 'tkumar@ut.edu', year: 'Sophomore', mealPlan: 'Yes - $150/sem', wouldUse: true, comment: 'Finally someone gets it', time: '2:22 PM' },
  ],
  emails: [
    { email: 'jsmith@ut.edu', source: 'Order', time: '2:34 PM' },
    { email: 'mrodriguez@ut.edu', source: 'Survey', time: '2:28 PM' },
    { email: 'tkumar@ut.edu', source: 'Survey', time: '2:22 PM' },
  ],
}

function formatTimeAgo(timestamp) {
  const diff = Math.floor((Date.now() - timestamp) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`
  return `${Math.floor(diff / 3600)}h ago`
}

function buildActivityFeed(orders, emails) {
  const events = []
  ;(orders || []).slice(0, 5).forEach((order) => {
    const ts = order.raw_created_at ? new Date(order.raw_created_at).getTime() : Date.now()
    events.push({ type: 'order', color: '#22C55E', text: `New order from ${order.student || 'student'}`, ts })
  })
  ;(emails || []).slice(0, 5).forEach((e) => {
    const ts = e.raw_created_at ? new Date(e.raw_created_at).getTime() : Date.now()
    events.push({ type: 'email', color: '#8B5CF6', text: `Email captured: ${e.email}`, ts })
  })
  return events
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 5)
    .map((e) => ({ ...e, timeLabel: formatTimeAgo(e.ts) }))
}

// ── Small inline SVG icons ────────────────────────────────────────────────────

function IconOrders() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  )
}
function IconSurveys() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  )
}
function IconEmails() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}
function IconOverview() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  )
}
function IconAnalytics() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  )
}

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  const map = {
    PENDING:   { bg: '#FEF9C3', color: '#92400E', label: 'Pending' },
    CONFIRMED: { bg: '#DBEAFE', color: '#1E40AF', label: 'Confirmed' },
    READY:     { bg: '#DCFCE7', color: '#166534', label: 'Ready' },
    COMPLETED: { bg: '#F3F4F6', color: '#6B7280', label: 'Completed' },
  }
  const s = map[status] || map.PENDING
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: '11px', fontWeight: 600,
      padding: '3px 10px', borderRadius: '20px',
      letterSpacing: '0.02em',
    }}>
      {s.label}
    </span>
  )
}

// ── Source badge ──────────────────────────────────────────────────────────────

function SourceBadge({ source }) {
  const map = {
    Order:    { bg: '#F3E8FF', color: '#6B21A8' },
    Survey:   { bg: '#DBEAFE', color: '#1D4ED8' },
    Interest: { bg: '#D1FAE5', color: '#065F46' },
  }
  const s = map[source] || map.Interest
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: '11px', fontWeight: 600,
      padding: '3px 10px', borderRadius: '20px',
    }}>
      {source}
    </span>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({ message }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#9CA3AF' }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 1rem' }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
      <p style={{ fontSize: '14px' }}>{message}</p>
    </div>
  )
}

// ── Overview tab ──────────────────────────────────────────────────────────────

function OverviewTab({ data, activeUsers, analytics }) {
  const stats = [
    { label: 'Total Orders',      value: data.orders.length,               sub: 'orders placed today',  icon: '🛒' },
    { label: 'Surveys Completed', value: data.surveys.length,              sub: 'responses collected',  icon: '📋' },
    { label: 'Emails Captured',   value: data.emails.length,               sub: 'unique emails',        icon: '📧' },
    { label: 'Active Now',        value: activeUsers,                      sub: 'viewing the app',      icon: '👁' },
    { label: 'Engagement Rate',   value: `${analytics?.engagementRate ?? 0}%`, sub: 'stayed 20+ sec',  icon: '📊' },
  ]

  const feed = buildActivityFeed(data.orders, data.emails)

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            background: '#fff', border: '1px solid #F3F4F6', borderRadius: '16px',
            padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', fontSize: '1.25rem', opacity: 0.5 }}>
              {s.icon}
            </div>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.75rem', fontWeight: 700, color: '#0C0118', lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '0.5rem' }}>{s.sub}</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginTop: '0.75rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #F3F4F6' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Recent Activity</span>
        </div>
        {feed.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF', fontSize: '13px' }}>
            No activity yet — orders and sign-ups will appear here in real time.
          </div>
        ) : feed.map((ev, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '0.875rem 1.5rem',
            borderBottom: i < feed.length - 1 ? '1px solid #F9FAFB' : 'none',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ev.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: '13px', color: '#374151' }}>{ev.text}</span>
            <span style={{ fontSize: '12px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{ev.timeLabel}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Orders tab ────────────────────────────────────────────────────────────────

function OrdersTab({ orders }) {
  if (!orders.length) return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <EmptyState message="No orders yet. They're coming!" />
    </div>
  )

  const cols = ['Order ID', 'Student', 'Restaurant', 'Items', 'Total', 'Status', 'Time']

  return (
    <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
            {cols.map((c) => (
              <th key={c} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={o.id}
              style={{ borderBottom: i < orders.length - 1 ? '1px solid #F9FAFB' : 'none', transition: 'background 120ms' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#FAFAFA'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <td style={{ padding: '13px 16px', fontFamily: 'monospace', fontWeight: 600, color: '#6B2FA0' }}>{o.id}</td>
              <td style={{ padding: '13px 16px', color: '#374151' }}>{o.student}</td>
              <td style={{ padding: '13px 16px', color: '#374151' }}>{o.restaurant}</td>
              <td style={{ padding: '13px 16px', color: '#6B7280' }}>{o.items}</td>
              <td style={{ padding: '13px 16px', fontWeight: 600, color: '#0C0118' }}>{o.total}</td>
              <td style={{ padding: '13px 16px' }}><StatusBadge status={o.status} /></td>
              <td style={{ padding: '13px 16px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>{o.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Surveys tab ───────────────────────────────────────────────────────────────

function SurveysTab({ surveys }) {
  if (!surveys.length) return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3F4F6', padding: '3rem', textAlign: 'center', color: '#9CA3AF', fontSize: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      Survey responses will appear here in real time.
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {surveys.map((s, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: '16px', padding: '1.25rem 1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#0C0118', fontFamily: 'monospace' }}>{s.email}</span>
            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{s.time}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>Year in school</div>
              <div style={{ fontSize: '13px', color: '#374151' }}>{s.year}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>Would use CampusCrave</div>
              <div style={{ fontSize: '13px', color: '#374151' }}>{s.wouldUse}</div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>Main frustration</div>
              <div style={{ fontSize: '13px', color: '#6B7280', fontStyle: 'italic' }}>&ldquo;{s.frustration}&rdquo;</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Emails tab ────────────────────────────────────────────────────────────────

function EmailsTab({ emails }) {
  const [toast, setToast] = useState(false)

  function copyAll() {
    const text = emails.map((e) => e.email).join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setToast(true)
      setTimeout(() => setToast(false), 2000)
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>{emails.length} email{emails.length !== 1 ? 's' : ''} captured</span>
        <button
          onClick={copyAll}
          disabled={!emails.length}
          style={{
            padding: '8px 16px', fontSize: '13px', fontWeight: 600,
            background: '#0C0118', color: '#fff',
            border: 'none', borderRadius: '10px', cursor: emails.length ? 'pointer' : 'not-allowed',
            opacity: emails.length ? 1 : 0.4, transition: 'opacity 150ms, background 150ms',
          }}
          onMouseEnter={(e) => { if (emails.length) e.currentTarget.style.background = '#6B2FA0' }}
          onMouseLeave={(e) => { if (emails.length) e.currentTarget.style.background = '#0C0118' }}
        >
          Copy All
        </button>
      </div>

      {/* List */}
      {!emails.length ? (
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3F4F6', padding: '3rem', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>
          Email list is empty. Start collecting!
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          {emails.map((e, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '13px 20px',
              borderBottom: i < emails.length - 1 ? '1px solid #F9FAFB' : 'none',
              transition: 'background 120ms',
            }}
              onMouseEnter={(el) => el.currentTarget.style.background = '#FAFAFA'}
              onMouseLeave={(el) => el.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#0C0118' }}>{e.email}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <SourceBadge source={e.source} />
                <span style={{ fontSize: '12px', color: '#9CA3AF', minWidth: '56px', textAlign: 'right' }}>{e.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast */}
      <div style={{
        position: 'fixed', bottom: '2rem', right: '2rem',
        background: '#0C0118', color: '#fff',
        padding: '12px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 600,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        opacity: toast ? 1 : 0,
        transform: toast ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 200ms ease, transform 200ms ease',
        pointerEvents: 'none',
        zIndex: 9999,
      }}>
        ✓ {emails.length} email{emails.length !== 1 ? 's' : ''} copied!
      </div>
    </div>
  )
}

// ── Analytics tab ────────────────────────────────────────────────────────────

function AnalyticsTab({ analytics }) {
  const total = analytics?.totalVisits ?? 0

  const funnelRows = [
    { label: 'Total visits',       value: analytics?.totalVisits ?? 0, color: '#6B2FA0', emoji: '👀' },
    { label: 'Stayed 20+ seconds', value: analytics?.stayed20s   ?? 0, color: '#8B5CF6', emoji: '⏱️' },
    { label: 'Stayed 1+ minute',   value: analytics?.stayed60s   ?? 0, color: '#6366F1', emoji: '🔥' },
    { label: 'Scrolled halfway',   value: analytics?.scrolled50  ?? 0, color: '#3B82F6', emoji: '📜' },
    { label: 'Scrolled full page', value: analytics?.scrolled100 ?? 0, color: '#0EA5E9', emoji: '⭐' },
  ]

  const statCards = [
    { label: 'Engagement Rate', value: `${analytics?.engagementRate ?? 0}%`, sub: 'stayed 20+ sec',    good: (analytics?.engagementRate ?? 0) > 40 },
    { label: 'Deep Read Rate',  value: `${analytics?.deepScrollRate ?? 0}%`, sub: 'scrolled full page', good: (analytics?.deepScrollRate ?? 0) > 20 },
    { label: '1-min Retained',  value: analytics?.stayed60s ?? 0,            sub: 'unique sessions',    good: (analytics?.stayed60s ?? 0) > 0 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#0C0118', margin: 0 }}>
            Website Analytics
          </h2>
          <p style={{ fontSize: '13px', color: '#9CA3AF', marginTop: '4px', marginBottom: 0 }}>
            Visitors from QR scan · Last 24 hours
          </p>
        </div>
        <span style={{
          fontSize: '12px', fontWeight: 600, color: '#16A34A',
          background: '#DCFCE7', padding: '5px 12px', borderRadius: '20px',
        }}>
          ● Live tracking active
        </span>
      </div>

      {/* Funnel */}
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '1.5rem' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1.25rem' }}>
          Engagement Funnel
        </div>
        {funnelRows.map((row) => {
          const pct = total > 0 ? Math.round((row.value / total) * 100) : 0
          return (
            <div key={row.label} style={{ marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#374151', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{row.emoji}</span>{row.label}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0C0118' }}>
                  {row.value} <span style={{ fontWeight: 400, color: '#9CA3AF' }}>({pct}%)</span>
                </span>
              </div>
              <div style={{ height: '8px', background: '#F3F4F6', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: row.color, borderRadius: '99px',
                  width: `${pct}%`, transition: 'width 700ms ease',
                }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {statCards.map((card) => (
          <div key={card.label} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.25rem', fontWeight: 700, color: card.good ? '#0C0118' : '#D1D5DB', lineHeight: 1 }}>
              {card.value}
            </div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>{card.sub}</div>
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginTop: '6px' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {(!analytics || total === 0) && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📡</div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Waiting for visitors…</div>
          <div style={{ fontSize: '12px', marginTop: '4px' }}>Share the QR code to start tracking</div>
        </div>
      )}
    </div>
  )
}

// ── Dashboard shell ───────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview',   Icon: IconOverview   },
  { id: 'orders',     label: 'Orders',     Icon: IconOrders     },
  { id: 'surveys',    label: 'Surveys',    Icon: IconSurveys    },
  { id: 'emails',     label: 'Emails',     Icon: IconEmails     },
  { id: 'analytics',  label: 'Analytics',  Icon: IconAnalytics  },
]

const TAB_TITLES = { overview: 'Overview', orders: 'Orders', surveys: 'Surveys', emails: 'Emails', analytics: 'Analytics' }

// ── Add Lead modal ────────────────────────────────────────────────────────────

function AddLeadModal({ onClose, onSaved }) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole]   = useState('Student')
  const [saving, setSaving] = useState(false)

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      await supabase.from('expo_leads').insert({
        first_name: name.split(' ')[0] || name,
        full_name: name,
        email,
        type: role === 'Student' ? 'student' : 'investor',
        role,
        created_at: new Date().toISOString(),
      })
    } catch (_) { /* silent — save locally regardless */ }
    onSaved({ email, source: role, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) })
    setSaving(false)
    onClose()
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    padding: '10px 14px', fontSize: '14px',
    border: '1.5px solid #E5E7EB', borderRadius: '10px',
    outline: 'none', background: '#FAFAFA', color: '#0C0118',
    transition: 'border-color 150ms, box-shadow 150ms',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}>
      <div style={{ background: '#fff', borderRadius: '20px', padding: '1.75rem', width: '100%', maxWidth: '380px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#0C0118', margin: 0 }}>Add Expo Contact</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '4px', display: 'flex' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Jane Smith" style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#6B2FA0'; e.target.style.boxShadow = '0 0 0 3px rgba(107,47,160,0.1)' }}
              onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="jane@ut.edu" style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#6B2FA0'; e.target.style.boxShadow = '0 0 0 3px rgba(107,47,160,0.1)' }}
              onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.boxShadow = 'none' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              {['Student', 'Investor', 'Partner', 'Faculty'].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#6B7280', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving} style={{ flex: 1, padding: '10px', background: '#6B2FA0', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Skeleton loaders ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid #F3F4F6', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <div className="animate-pulse" style={{ background: '#E5E7EB', borderRadius: '8px', height: '44px', width: '64px', marginBottom: '12px' }} />
      <div className="animate-pulse" style={{ background: '#E5E7EB', borderRadius: '6px', height: '12px', width: '80%' }} />
    </div>
  )
}

function SkeletonRow() {
  return (
    <tr>
      {[100, 140, 110, 80, 60, 70, 55].map((w, i) => (
        <td key={i} style={{ padding: '14px 16px' }}>
          <div className="animate-pulse" style={{ background: '#F3F4F6', borderRadius: '6px', height: '12px', width: `${w}px` }} />
        </td>
      ))}
    </tr>
  )
}

// ── Dashboard shell ───────────────────────────────────────────────────────────

function DashboardView({ onLogout }) {
  const [tab, setTab]           = useState('overview')
  const [fading, setFading]     = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData]         = useState({ orders: [], surveys: [], emails: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [secondsSince, setSecondsSince] = useState(0)
  const [showAddLead, setShowAddLead]   = useState(false)
  const [activeUsers, setActiveUsers]   = useState(0)
  const [analytics, setAnalytics]       = useState(null)

  async function fetchAnalytics() {
    try {
      const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      const { data: events, error } = await supabase
        .from('analytics_events')
        .select('session_id, event_type, created_at')
        .gte('created_at', since)
      if (error) throw error
      const allEvents = events || []
      const uniqueSessions = new Set(allEvents.map(e => e.session_id))
      const totalVisits = uniqueSessions.size
      const sessionsWithEvent = (eventType) => {
        const sessions = new Set(
          allEvents.filter(e => e.event_type === eventType).map(e => e.session_id)
        )
        return sessions.size
      }
      const stayed20s   = sessionsWithEvent('time_20s')
      const stayed60s   = sessionsWithEvent('time_60s')
      const scrolled100 = sessionsWithEvent('scroll_100')
      const scrolled75  = sessionsWithEvent('scroll_75')
      const scrolled50  = sessionsWithEvent('scroll_50')
      setAnalytics({
        totalVisits,
        stayed20s,
        stayed60s,
        scrolled50,
        scrolled75,
        scrolled100,
        engagementRate: totalVisits > 0 ? Math.round((stayed20s / totalVisits) * 100) : 0,
        deepScrollRate: totalVisits > 0 ? Math.round((scrolled100 / totalVisits) * 100) : 0,
      })
    } catch {
      setAnalytics(null)
    }
  }

  async function fetchActiveUsers() {
    try {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString()
      const { data: rows, error } = await supabase
        .from('analytics_events')
        .select('session_id')
        .eq('event_type', 'heartbeat')
        .gte('created_at', twoMinutesAgo)
      if (error) throw error
      const unique = new Set((rows || []).map((r) => r.session_id))
      setActiveUsers(unique.size)
    } catch {
      setActiveUsers(0)
    }
  }

  async function fetchDashboardData() {
    setIsLoading(true)
    fetchActiveUsers()
    fetchAnalytics()
    try {
      const [ordersResult, leadsResult] = await Promise.all([
        supabase.from('expo_orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50),
        supabase.from('expo_leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100),
      ])

      if (ordersResult.error) console.error('Orders fetch error:', ordersResult.error)
      if (leadsResult.error)  console.error('Leads fetch error:',  leadsResult.error)

      const orders = ordersResult.data || []
      const leads  = leadsResult.data  || []

      const fmt = (ts) => new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

      const transformedOrders = orders.map((o) => ({
        id: o.order_number || 'CC-???',
        student: o.lead_email || 'student@ut.edu',
        restaurant: o.restaurant || '—',
        items: o.item_name || '—',
        total: '—',
        status: (o.status || 'CONFIRMED').toUpperCase(),
        time: fmt(o.created_at),
        raw_created_at: o.created_at,
      }))

      const transformedEmails = leads.map((l) => ({
        email: l.email,
        name: l.first_name || l.name || 'Unknown',
        source: l.type === 'student' ? 'Student' : (l.type || 'Registration'),
        time: fmt(l.created_at),
        raw_created_at: l.created_at,
      }))

      const transformedSurveys = leads
        .filter((l) => l.q1_answer || l.q2_answer || l.q3_answer)
        .map((l) => ({
          email: l.email,
          year: l.q1_answer || 'N/A',
          frustration: l.q2_answer || 'N/A',
          wouldUse: l.q3_answer || 'N/A',
          orderNumber: l.order_number || null,
          time: fmt(l.created_at),
          raw_created_at: l.created_at,
        }))

      setData({
        orders:  transformedOrders,
        surveys: transformedSurveys,
        emails:  transformedEmails,
      })
      setSecondsSince(0)
    } catch (err) {
      console.error('Dashboard fetch error (unexpected):', err)
    }
    setIsLoading(false)
  }

  // Auto-refresh every 30s + active-users every 15s + per-second ticker
  useEffect(() => {
    fetchDashboardData()
    const refreshInterval = setInterval(fetchDashboardData, 30000)
    const liveInterval    = setInterval(fetchActiveUsers, 15000)
    const tickerInterval  = setInterval(() => setSecondsSince((s) => s + 1), 1000)
    return () => { clearInterval(refreshInterval); clearInterval(liveInterval); clearInterval(tickerInterval) }
  }, [])

  function switchTab(id) {
    if (id === tab) return
    setFading(true)
    setTimeout(() => { setTab(id); setFading(false) }, 120)
  }

  function handleLeadSaved(newEntry) {
    setData((prev) => ({ ...prev, emails: [newEntry, ...prev.emails] }))
  }

  const updatedLabel = secondsSince < 5 ? 'Just updated' : `Updated ${secondsSince}s ago`

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F9FAFB', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: '224px', flexShrink: 0,
        background: '#0C0118',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }}
        className="hidden md:flex"
      >
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <img src="/logo.jpeg" alt="CampusCrave" style={{ height: '32px', objectFit: 'contain' }} />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0.75rem 0' }}>
          {NAV_ITEMS.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                onClick={() => switchTab(id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '11px 20px',
                  background: active ? 'rgba(107,47,160,0.25)' : 'transparent',
                  borderLeft: active ? '2px solid #8B5CF6' : '2px solid transparent',
                  border: 'none',
                  color: active ? '#fff' : '#6B7280',
                  fontSize: '13px', fontWeight: active ? 600 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 150ms, color 150ms',
                }}
                onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#D1D5DB' } }}
                onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280' } }}
              >
                <span style={{ opacity: active ? 1 : 0.6 }}><Icon /></span>
                {label}
              </button>
            )
          })}
        </nav>

        {/* Bottom badge */}
        <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 500, letterSpacing: '0.04em' }}>
            EXPO DAY 2026
          </div>
          <div style={{ fontSize: '11px', color: '#374151', marginTop: '2px' }}>University of Tampa</div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div style={{ flex: 1, marginLeft: 0, display: 'flex', flexDirection: 'column' }} className="md:ml-56">

        {/* ── Header ── */}
        <header style={{
          height: '60px', background: '#fff',
          borderBottom: '1px solid #F3F4F6',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 1.75rem',
          position: 'sticky', top: 0, zIndex: 30,
        }}>
          {/* Left: hamburger (mobile) + title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className="flex md:hidden"
              onClick={() => setSidebarOpen((v) => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280', padding: '4px', display: 'flex' }}
              aria-label="Toggle sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#0C0118', margin: 0 }}>
              {TAB_TITLES[tab]}
            </h1>
          </div>

          {/* Right: live indicator + timestamp + refresh + logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* LIVE badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <span className="animate-pulse" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151' }}>Live Feed</span>
            </div>

            {/* Timestamp */}
            <span style={{ fontSize: '12px', color: '#9CA3AF' }} className="hidden sm:block">
              {updatedLabel}
            </span>

            {/* Manual refresh */}
            <button
              onClick={fetchDashboardData}
              title="Refresh data"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', padding: '6px', borderRadius: '8px', display: 'flex', transition: 'color 150ms, background 150ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#F3F4F6' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent' }}
            >
              <svg className={isLoading ? 'animate-spin' : ''} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '13px', color: '#9CA3AF', fontWeight: 500,
                padding: '6px 10px', borderRadius: '8px',
                transition: 'color 150ms, background 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#EF4444'; e.currentTarget.style.background = '#FEF2F2' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; e.currentTarget.style.background = 'transparent' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside style={{
              position: 'fixed', top: 0, left: 0, bottom: 0, width: '224px',
              background: '#0C0118', zIndex: 50,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ padding: '1.5rem 1.25rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src="/logo.jpeg" alt="CampusCrave" style={{ height: '32px', objectFit: 'contain' }} />
                <button onClick={() => setSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', padding: '4px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
              <nav style={{ flex: 1, padding: '0.75rem 0' }}>
                {NAV_ITEMS.map(({ id, label, Icon }) => {
                  const active = tab === id
                  return (
                    <button key={id} onClick={() => { switchTab(id); setSidebarOpen(false) }}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                        padding: '11px 20px', background: active ? 'rgba(107,47,160,0.25)' : 'transparent',
                        borderLeft: active ? '2px solid #8B5CF6' : '2px solid transparent',
                        border: 'none', color: active ? '#fff' : '#6B7280',
                        fontSize: '13px', fontWeight: active ? 600 : 400, cursor: 'pointer', textAlign: 'left',
                      }}>
                      <span style={{ opacity: active ? 1 : 0.6 }}><Icon /></span>{label}
                    </button>
                  )
                })}
              </nav>
              <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '11px', color: '#4B5563', fontWeight: 500 }}>EXPO DAY 2026</div>
              </div>
            </aside>
          </>
        )}

        {/* ── Content ── */}
        <main style={{ flex: 1, padding: '1.75rem', maxWidth: '960px', width: '100%', margin: '0 auto' }}>
          {/* Overview action bar */}
          {tab === 'overview' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button
                onClick={() => setShowAddLead(true)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '9px 16px', background: '#0C0118', color: '#fff',
                  border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'background 150ms',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#6B2FA0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#0C0118'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Contact
              </button>
            </div>
          )}

          <div style={{ opacity: fading ? 0 : 1, transition: 'opacity 120ms ease' }}>
            {tab === 'overview' && (isLoading
              ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>{[1,2,3,4].map((k) => <SkeletonCard key={k} />)}</div>
              : <OverviewTab data={data} activeUsers={activeUsers} analytics={analytics} />
            )}
            {tab === 'orders' && (isLoading
              ? <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #F3F4F6' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}><tbody>{[1,2,3].map((k) => <SkeletonRow key={k} />)}</tbody></table></div>
              : <OrdersTab orders={data.orders} />
            )}
            {tab === 'surveys'   && <SurveysTab surveys={data.surveys} />}
            {tab === 'emails'    && <EmailsTab emails={data.emails} />}
            {tab === 'analytics' && <AnalyticsTab analytics={analytics} />}
          </div>
        </main>
      </div>

      {/* Add Lead modal */}
      {showAddLead && (
        <AddLeadModal
          onClose={() => setShowAddLead(false)}
          onSaved={handleLeadSaved}
        />
      )}
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
