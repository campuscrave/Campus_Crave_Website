import SectionLabel from '../components/SectionLabel'

const phases = [
  {
    phase: 'Phase 1 — Now',
    title: 'University of Tampa Pilot',
    desc: 'Pickup-only ordering with Ciccio Restaurant Group. Card payments via Crave Dollars. Prove the model with real students, real restaurants, real data.',
  },
  {
    phase: 'Phase 2 — Q3 2026',
    title: 'Delivery + Dining Dollar Integration',
    desc: 'Add student delivery drivers. Integrate with university dining dollar systems for seamless on-campus to off-campus payments. Expand restaurant network beyond CRG.',
  },
  {
    phase: 'Phase 3 — 2027',
    title: 'Multi-Campus Expansion',
    desc: 'Deploy across Florida private universities through institutional partnerships. Build the playbook for scaling campus-by-campus with dining operator endorsement.',
  },
  {
    phase: 'Phase 4 — Beyond',
    title: 'The Campus Commerce Platform',
    desc: 'Expand beyond food: campus convenience, peer-to-peer transfers, student deals marketplace, and the definitive financial layer for student life on any campus.',
  },
]

export default function Vision() {
  return (
    <section id="vision">
      <div className="vision-glow"></div>
      <div className="section-inner">
        <div className="reveal">
          <SectionLabel>// The Vision</SectionLabel>
          <div className="section-title">This is just the beginning.</div>
          <p className="section-desc">
            Campus Crave is not a delivery app. It's infrastructure for campus commerce — starting
            with food, expanding to everything students buy.
          </p>
        </div>

        <div className="vision-timeline">
          {phases.map((item) => (
            <div key={item.phase} className="vision-item reveal">
              <div className="phase">{item.phase}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
