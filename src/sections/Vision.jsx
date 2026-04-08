const phases = [
  {
    number: '01',
    status: 'Active',
    statusColor: '#4ADE80',
    statusBg: 'rgba(74,222,128,0.15)',
    title: 'UT Tampa Pilot',
    items: ['Pickup ordering', '6 CRG restaurants', 'Dining Dollar integration', 'Venture Expo demo'],
    timeline: 'Spring 2026',
    active: true,
  },
  {
    number: '02',
    status: 'Next',
    statusColor: '#FBBF24',
    statusBg: 'rgba(251,191,36,0.15)',
    title: 'Multi-Campus Expansion',
    items: ['Delivery layer launch', 'Multi-campus rollout', 'Push notifications', 'Expanded restaurant network'],
    timeline: 'Q3 2026',
    active: false,
  },
  {
    number: '03',
    status: 'Planned',
    statusColor: '#60A5FA',
    statusBg: 'rgba(96,165,250,0.15)',
    title: 'National Rollout',
    items: ['National university rollout', 'B2B dining partnerships', 'Standardized dining integrations', 'University admin portals'],
    timeline: '2027',
    active: false,
  },
  {
    number: '04',
    status: 'Vision',
    statusColor: '#8B5CF6',
    statusBg: 'rgba(139,92,246,0.15)',
    title: 'Campus Commerce',
    items: ['Textbooks & merchandise', 'Campus services', 'Student-to-student transfers', 'Multi-university network'],
    timeline: 'Beyond',
    active: false,
  },
]

export default function Vision() {
  return (
    <section id="vision" className="py-24" style={{ background: '#FAFAF8', overflow: 'hidden' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="section-label">Roadmap</div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#0C0118' }}>
          From one campus to every campus.
        </h2>
        <p style={{ color: '#6B7280', marginTop: '0.75rem' }}>
          We're starting at the University of Tampa. Here's where we go from here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="glass-card p-6"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                ...(phase.active && {
                  borderColor: '#6B21A8',
                  boxShadow: '0 0 30px rgba(107,33,168,0.2)',
                }),
              }}
            >
              <span
                className="gradient-text"
                style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.5rem', fontWeight: 800, lineHeight: 1 }}
              >
                {phase.number}
              </span>

              <span style={{
                display: 'inline-flex', marginTop: '0.5rem',
                padding: '0.25rem 0.75rem', borderRadius: 20,
                fontSize: 11, fontWeight: 600,
                background: phase.statusBg, color: phase.statusColor,
                alignSelf: 'flex-start',
              }}>
                {phase.status}
              </span>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0C0118', marginTop: '1rem' }}>
                {phase.title}
              </h3>

              <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {phase.items.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 13, color: '#6B7280' }}>
                    <span style={{
                      width: 6, height: 6, borderRadius: '50%', background: '#6B21A8',
                      flexShrink: 0, marginTop: '0.375rem',
                    }} />
                    {item}
                  </li>
                ))}
              </ul>

              <div style={{
                marginTop: 'auto', paddingTop: '1rem',
                fontSize: 12, color: '#6B7280',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                {phase.timeline}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
