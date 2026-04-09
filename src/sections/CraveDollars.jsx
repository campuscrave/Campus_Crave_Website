const benefits = [
  'Zero breakage revenue risk — students spend, not forfeit',
  'Seamless Dining Dollar integration via existing POS',
  'University-endorsed and student-data compliant',
  'Real-time spending analytics dashboard',
  '60-day pilot program — no long-term commitment',
  'Zero upfront cost to the university',
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8l3 3 7-6" />
  </svg>
)

const stats = [
  { value: '60 days', label: 'to pilot launch', color: '#8B5CF6' },
  { value: '$0', label: 'upfront cost to university', color: '#4ADE80' },
  { value: '5', label: 'CRG restaurants at launch', color: '#8B5CF6' },
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
              Your dining dollars,<br />
              <span className="gradient-text">finally off-campus.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: '#9CA3AF', maxWidth: 460 }}>
              CampusCrave is designed to integrate with your existing meal plan infrastructure. No breakage revenue lost. No data risk. Just happier students.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0">
                    <CheckIcon />
                  </span>
                  <span style={{ fontSize: 14, color: '#D1D5DB' }}>{benefit}</span>
                </div>
              ))}
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
