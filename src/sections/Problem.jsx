import SectionLabel from '../components/SectionLabel'

const problems = [
  {
    icon: '💸',
    stat: '$3,200+',
    title: 'Mandatory Meal Plan',
    desc: 'Per semester, locked to on-campus dining halls. Spartan Dollars, meal swipes, and UT Dollars cannot be used at off-campus restaurants.',
  },
  {
    icon: '🍕',
    stat: '57%',
    title: 'Eat Off-Campus 3x/Week',
    desc: 'Students consistently purchase food at local restaurants using personal funds — on top of their prepaid meal plan. This is the double-spend dynamic.',
  },
  {
    icon: '🏠',
    stat: '54%',
    title: 'No Meal Plan At All',
    desc: 'Over 6,000 students live off-campus with zero connection to the university dining ecosystem. Their entire food spend is invisible to dining operators.',
  },
]

export default function Problem() {
  return (
    <section id="problem">
      <div className="section-inner">
        <div className="reveal">
          <SectionLabel>// The Problem</SectionLabel>
          <div className="section-title">
            Students pay twice.<br />Dining operators earn nothing.
          </div>
          <p className="section-desc">
            Parents pay thousands for mandatory meal plans. Students still spend out of pocket at
            off-campus restaurants. That spending generates zero revenue for the university dining
            ecosystem.
          </p>
        </div>

        <div className="problem-grid">
          {problems.map((item) => (
            <div key={item.title} className="problem-card reveal">
              <div className="problem-icon">{item.icon}</div>
              <span className="stat-highlight">{item.stat}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
