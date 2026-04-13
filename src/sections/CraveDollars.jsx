const benefits = [
  { title: 'Capture the off-campus market', desc: 'Students spend an average of $2,800/year on off-campus food despite having a meal plan. That\'s untapped revenue.' },
  { title: 'Zero cannibalization', desc: 'CampusCrave doesn\'t replace dining hall visits. It captures spending that was already leaving campus.' },
  { title: 'One centralized platform for every U.S. university', desc: 'From UT Tampa to Duke to Knox — one integration, every campus. The infrastructure scales nationally.' },
  { title: 'White-label ready', desc: 'Launch as "Spartan Dollars" at UT Tampa. "Wildcat Wallet" at Knox. Your brand, our rails.' },
  { title: 'Real-time balance sync', desc: 'Students see live dining dollar balances in the app. No surprises. No declined orders.' },
  { title: 'PCI-compliant. Zero integration risk.', desc: 'Works alongside existing Sodexo, Transact, or CBORD systems. No rip-and-replace required.' },
]


const stats = [
  { value: 'TBD', label: 'pilot launch date', color: '#8B5CF6' },
  { value: '$0', label: 'upfront cost to university', color: '#4ADE80' },
  { value: '5', label: 'restaurants at launch', color: '#8B5CF6' },
  { value: '1,400+', label: 'students in campus radius', color: '#FBB924' },
]

export default function CraveDollars() {
  return (
    <section
      id="universities"
      className="py-24"
      style={{ width: '100%', background: '#111827' }}
    >
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left column */}
          <div>
            <span className="section-label" style={{ color: '#8B5CF6' }}>For Universities</span>
            <h2 className="mt-3 font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.12 }}>
              The double-spend problem.<br />
              <span className="gradient-text">Finally solved.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#9CA3AF', maxWidth: 460 }}>
              Students pay for a meal plan. Then pay again at restaurants. CampusCrave routes that second spend through the campus dining system — adding revenue without displacing a single dining hall swipe.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {benefits.map(({ title, desc }, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0" style={{ color: '#8B5CF6', fontSize: 14, fontWeight: 700 }}>✦</span>
                  <div style={{ wordWrap: 'break-word', overflowWrap: 'break-word', maxWidth: '100%' }}>
                    <span style={{ fontSize: 14, color: '#F9FAFB', fontWeight: 600 }}>{title}</span>
                    <span style={{ fontSize: 13, color: '#9CA3AF' }}> — {desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Market opportunity */}
            <div className="mt-12">
              <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>
                The market opportunity
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { number: '$142B', label: 'Total U.S. college food market', sub: 'Annual off-campus food spend by 19.9M university students' },
                  { number: '$38B',  label: 'Meal plan addressable market',   sub: 'Students with active meal plans who still spend off-campus' },
                  { number: '$2.1B', label: '5-year serviceable market',      sub: 'Top 200 U.S. universities with Sodexo/Aramark/Transact dining' },
                ].map(({ number, label, sub }) => (
                  <div
                    key={number}
                    className="w-full"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(147,51,234,0.3)',
                      borderRadius: 14,
                      padding: 24,
                    }}
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>{number}</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 14, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{label}</div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>{sub}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, textAlign: 'center', marginTop: 16 }}>
                Market estimates based on NCES enrollment data, NRA college dining reports, and Technomic 2024 campus dining survey.
              </p>
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&to=partners@campus-crave.com&su=University%20Partnership%20Inquiry%20-%20CampusCrave&body=Hi%20CampusCrave%20team%2C%20I'm%20interested%20in%20bringing%20CampusCrave%20to%20our%20university."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 px-6 py-3 font-semibold transition-colors"
              style={{
                borderRadius: 10,
                border: '1px solid rgba(107,33,168,0.5)',
                color: '#8B5CF6',
                background: 'transparent',
                cursor: 'pointer',
                display: 'inline-block',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(107,33,168,0.1)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              Schedule a Partnership Call
            </a>
          </div>

          {/* Right column — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ value, label, color }) => (
              <div key={label} className="glass-card p-6">
                <div className="font-bold" style={{ fontSize: '2rem', color }}>{value}</div>
                <div className="mt-1 text-sm" style={{ color: '#9CA3AF' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
