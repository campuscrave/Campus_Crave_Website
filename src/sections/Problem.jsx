const cards = [
  {
    emoji: '🏛️',
    iconBg: 'rgba(16,185,129,0.1)',
    stat: '$6.6B',
    statColor: '#10B981',
    borderColor: 'rgba(16,185,129,0.15)',
    label: 'Total Addressable Market in U.S. campus dining & food spend',
    title: 'Meal plans trapped on campus',
    desc: 'Students pay hundreds in dining dollars each semester — but those balances only work at a handful of on-campus locations. The moment they step off campus, that money is useless.',
  },
  {
    emoji: '💳',
    iconBg: 'rgba(245,158,11,0.1)',
    stat: '$340',
    statColor: '#FBBF24',
    borderColor: 'rgba(245,158,11,0.2)',
    label: 'average extra spent on delivery apps per semester',
    title: 'Off-campus spending has no home',
    desc: 'Students already spend freely at off-campus restaurants, but through fragmented apps with no connection to their university account. That spend is invisible to institutions and inconvenient for students.',
  },
  {
    emoji: '📱',
    iconBg: 'rgba(107,33,168,0.15)',
    stat: '0',
    statColor: '#8B5CF6',
    borderColor: 'rgba(107,33,168,0.2)',
    label: 'apps that integrate campus meal plans with off-campus ordering',
    title: 'No unified platform exists',
    desc: 'There is no single place where students can manage their meal plan balance, discover local restaurants, and pay — all in one flow. CampusCrave centralizes every dollar a student spends on food.',
  },
]

export default function Problem() {
  return (
    <section id="problem" style={{ padding: '5rem 0', background: '#ffffff', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div className="section-label">The Problem</div>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#0C0118',
        }}>
          Students pay for meal plans they can't use.
        </h2>
        <p style={{ color: '#6B7280', maxWidth: 560, marginTop: '0.75rem', lineHeight: 1.6 }}>
          Every semester, millions in campus dining funds go unspent — not because students don't
          want food, but because the system doesn't let them get it.
        </p>

        {/* Cards */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '1.5rem', marginTop: '3rem',
        }}
          className="md:grid-cols-3"
        >
          {cards.map(card => (
            <div
              key={card.title}
              className="glass-card"
              style={{
                padding: '1.75rem',
                borderColor: card.borderColor,
                transition: 'transform 200ms ease, box-shadow 200ms ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = ''
              }}
            >
              {/* Icon */}
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: card.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', marginBottom: '1.25rem',
              }}>
                {card.emoji}
              </div>

              {/* Stat */}
              <div style={{
                fontSize: '3rem', fontWeight: 800, color: card.statColor,
                lineHeight: 1, fontFamily: 'Outfit, sans-serif',
              }}>
                {card.stat}
              </div>

              {/* Stat label */}
              <div style={{ color: '#0C0118', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 500 }}>
                {card.label}
              </div>

              {/* Description */}
              <p style={{ color: '#6B7280', fontSize: '0.75rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
