export default function Hero() {
  return (
    <section
      id="hero"
      style={{ minHeight: '100vh', background: '#ffffff', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background radial — top center */}
      <div style={{
        position: 'absolute', width: 600, height: 600, top: -100,
        left: '50%', transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(107,33,168,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Background radial — bottom left */}
      <div style={{
        position: 'absolute', width: 400, height: 400, bottom: -80, left: -80,
        background: 'radial-gradient(circle, rgba(107,33,168,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '8rem 1.5rem 5rem',
        display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center',
      }}>
        {/* ── TEXT CONTENT ── */}
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          {/* Status pill */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(107,33,168,0.08)', border: '1px solid rgba(107,33,168,0.2)',
              borderRadius: 20, padding: '0.5rem 1rem', fontSize: 13,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%', background: '#4ADE80',
                flexShrink: 0, animation: 'pulse-soft 2s ease-in-out infinite',
              }} />
              <span style={{ color: '#6B21A8' }}>🔴 Live Pilot · University of Tampa</span>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800, color: '#0C0118', lineHeight: 1.1, marginTop: '1.25rem',
          }}>
            Order from local restaurants with your meal plan.<br />
            <span className="gradient-text">Zero hassle.</span>
          </h1>

          {/* Subheadline */}
          <p style={{
            textAlign: 'center', maxWidth: '560px', margin: '1rem auto 0',
            fontSize: '1.1rem', color: '#6B7280', lineHeight: 1.6,
          }}>
            Students double-spend — paying for a meal plan, then paying again at restaurants. CampusCrave fixes that. Use your campus balance anywhere. Zero double-spend.
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.75rem', justifyContent: 'center' }}>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', color: '#6B21A8', borderRadius: 12,
                padding: '1rem 2rem', fontWeight: 600, fontSize: '1rem',
                border: '1.5px solid rgba(107,33,168,0.3)', cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(107,33,168,0.6)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107,33,168,0.3)'}
            >
              See How It Works
            </button>
          </div>

          {/* Trust metrics */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: '2rem', justifyContent: 'center' }}>
            {[
              '5 CRG restaurant partners',
              'Spring 2026 launch',
              '$0 student fees at launch',
            ].map(text => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="rgba(107,33,168,0.1)" />
                  <path d="M5 8l2 2 4-4" stroke="#6B21A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 14, color: '#6B7280' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
