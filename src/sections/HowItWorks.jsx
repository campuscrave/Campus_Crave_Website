export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20" style={{ background: '#FAFAF8' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center">
          <span className="section-label">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3" style={{ color: '#0C0118' }}>
            From craving to pickup in 3 taps.
          </h2>
          <p className="mt-4 text-base" style={{ color: '#6B7280' }}>
            No new account. No extra fees. Just campus food, finally unified.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 relative">
          {/* Connector line md+ */}
          <div
            className="hidden md:block absolute pointer-events-none"
            style={{
              top: 80,
              left: '25%',
              width: '50%',
              height: 1,
              background: 'linear-gradient(to right, transparent, rgba(107,33,168,0.4), transparent)',
            }}
          />

          {/* Step 1 — Browse */}
          <div className="flex flex-col items-center text-center">
            <span
              className="gradient-text"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}
            >
              01
            </span>
            <div
              className="flex items-center justify-center mt-4"
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'rgba(107,33,168,0.1)',
                border: '1px solid rgba(107,33,168,0.2)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <circle cx="12" cy="17" r="1" fill="#8B5CF6" stroke="none" />
                <line x1="9" y1="7" x2="15" y2="7" />
                <line x1="9" y1="10" x2="15" y2="10" />
              </svg>
            </div>
            <h3 className="mt-4 font-bold" style={{ fontSize: '1.25rem', color: '#0C0118' }}>Browse</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              See every CRG restaurant near UT campus. Filter by category, hours, or availability. Real menus, real prices.
            </p>
          </div>

          {/* Step 2 — Pay Your Way */}
          <div className="flex flex-col items-center text-center">
            <span
              className="gradient-text"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}
            >
              02
            </span>
            <div
              className="flex items-center justify-center mt-4"
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'rgba(251,191,36,0.1)',
                border: '1px solid rgba(251,191,36,0.2)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FBB924" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-4 0v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <h3 className="mt-4 font-bold" style={{ fontSize: '1.25rem', color: '#0C0118' }}>Pay Your Way</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              Pay with your campus Dining Dollars, meal plan balance, or linked card — no new account needed.
            </p>
          </div>

          {/* Step 3 — Pick Up */}
          <div className="flex flex-col items-center text-center">
            <span
              className="gradient-text"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}
            >
              03
            </span>
            <div
              className="flex items-center justify-center mt-4"
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'rgba(74,222,128,0.1)',
                border: '1px solid rgba(74,222,128,0.2)',
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <h3 className="mt-4 font-bold" style={{ fontSize: '1.25rem', color: '#0C0118' }}>Pick Up</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: '#6B7280' }}>
              Pick up your order from the restaurant — zero wait, zero delivery fee, zero hassle.
            </p>
            <span
              className="mt-3 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: 'rgba(74,222,128,0.12)',
                color: '#4ADE80',
                border: '1px solid rgba(74,222,128,0.25)',
              }}
            >
              ⚡ Ready in minutes
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
