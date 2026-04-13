const cards = [
  {
    emoji: '🏛️',
    iconBg: 'rgba(16,185,129,0.1)',
    stat: '$6.6B',
    statColor: '#10B981',
    borderColor: 'rgba(16,185,129,0.15)',
    label: 'Total Addressable Market in U.S. campus dining & food spend',
    title: 'Meal plans need to travel further',
    desc: "Students' dining dollars are trapped inside campus walls. Expanding their reach to off-campus restaurants doesn't replace existing spending — it multiplies what a meal plan can do.",
  },
  {
    emoji: '💳',
    iconBg: 'rgba(245,158,11,0.1)',
    stat: '$340',
    statColor: '#FBBF24',
    borderColor: 'rgba(245,158,11,0.2)',
    label: 'average extra spent on delivery apps per semester',
    title: 'Off-campus spend is fragmented',
    desc: 'Students split food purchases across Uber Eats, DoorDash, and dozens of local apps. Every dollar spent externally is invisible to the university — a missed opportunity to add real value.',
  },
  {
    emoji: '📱',
    iconBg: 'rgba(107,33,168,0.15)',
    stat: '0',
    statColor: '#8B5CF6',
    borderColor: 'rgba(107,33,168,0.2)',
    label: 'apps that integrate campus meal plans with off-campus ordering',
    title: 'One platform. Every dollar.',
    desc: 'CampusCrave brings every student food transaction — on-campus and off — into a single, university-connected platform. Students get convenience. Universities get full visibility.',
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
          Meal plans were built for one campus. Students eat everywhere.
        </h2>
        <p style={{ color: '#6B7280', maxWidth: 560, marginTop: '0.75rem', lineHeight: 1.6 }}>
          Hundreds of dollars in student food spending leave campus every semester — scattered across
          delivery apps, invisible to universities, and disconnected from dining plans. CampusCrave
          centralizes every food dollar, on-campus and off, into one platform.
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
