import SectionLabel from '../components/SectionLabel'

const partners = [
  {
    tag: 'tag-sodexo',
    tagLabel: 'Dining Operators',
    title: 'Revenue From Invisible Spend',
    desc: 'Students already eat off-campus. Every transaction through Campus Crave generates a revenue share for dining operators — with zero food cost, zero labor, and zero operational overhead.',
    metric: '$1.05',
    metricSub: '/ order',
  },
  {
    tag: 'tag-restaurant',
    tagLabel: 'Restaurants',
    title: '11,500 Students. One App.',
    desc: 'Get direct access to the entire student body through a curated platform with lower commissions than major delivery apps. No exclusivity required — Campus Crave is purely additive.',
    metric: '12%',
    metricSub: 'commission',
  },
  {
    tag: 'tag-university',
    tagLabel: 'Universities',
    title: 'Student Satisfaction, Measured',
    desc: 'Offer students the off-campus dining access they demand — through a controlled, campus-endorsed channel with full visibility into ordering data and dining behavior analytics.',
    metric: '95%',
    metricSub: 'want this',
  },
]

export default function Partners() {
  return (
    <section id="partners">
      <div className="section-inner">
        <div className="reveal">
          <SectionLabel>// For Partners</SectionLabel>
          <div className="section-title">
            Everyone wins.<br />That's the model.
          </div>
          <p className="section-desc">
            Campus Crave is additive — not competitive. We create new revenue for dining operators
            and new demand for local restaurants.
          </p>
        </div>

        <div className="partner-value">
          {partners.map((p) => (
            <div key={p.title} className="partner-card reveal">
              <span className={`tag ${p.tag}`}>{p.tagLabel}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="metric">
                {p.metric}{' '}
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                  {p.metricSub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
