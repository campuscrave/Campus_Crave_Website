export default function CTA() {
  return (
    <section id="cta" className="py-24" style={{ background: '#111827', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(107,33,168,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="mx-auto px-6 text-center" style={{ maxWidth: 800, position: 'relative' }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Get Started</div>

        <h2 style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, marginTop: '0.5rem',
        }}>
          <span style={{ color: 'white' }}>Ready to rethink</span>
          <br />
          <span className="gradient-text">campus dining?</span>
        </h2>

        <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginTop: '1.25rem', maxWidth: 500, margin: '1.25rem auto 0' }}>
          Join students and partners building the future of campus food at the University of Tampa.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          <button
            style={{
              background: '#6B21A8', color: 'white',
              padding: '1rem 2rem', borderRadius: 12,
              fontWeight: 600, fontSize: '1rem',
              border: 'none', cursor: 'pointer', transition: 'background 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#5B1A9F' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#6B21A8' }}
            onClick={() => {
              if (window.openExpoModal) { window.openExpoModal() }
              else { window.location.href = 'mailto:hello@campuscrave.com?subject=Student Early Access' }
            }}
          >
            Get Early Access
          </button>

          <button
            style={{
              background: 'transparent',
              border: '1.5px solid rgba(107,33,168,0.5)',
              color: '#8B5CF6',
              padding: '1rem 2rem', borderRadius: 12,
              fontWeight: 600, fontSize: '1rem',
              cursor: 'pointer', transition: 'all 200ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(107,33,168,0.1)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            onClick={() => { window.location.href = 'mailto:hello@campuscrave.com?subject=Partnership Inquiry — CampusCrave' }}
          >
            Partner with Us
          </button>
        </div>

        <p style={{ marginTop: '2rem', fontSize: 12, color: '#6B7280' }}>
          University of Tampa pilot · Spring 2026 · hello@campuscrave.com
        </p>
      </div>
    </section>
  )
}
