import SectionLabel from '../components/SectionLabel'

const founders = [
  {
    initials: 'JP',
    name: 'Juan Pablo Pérez',
    role: 'CEO & Product',
    school: 'Computer Science + Economics · D3 Soccer',
    bio: 'Tried to order food with Dining Dollars at a local restaurant. Couldn\'t. Started building the solution that night. Leads product, technology, and institutional strategy.',
  },
  {
    initials: 'MG',
    name: 'Matías Gil',
    role: 'COO & Operations',
    school: 'Cybersecurity + Entrepreneurship · University of Tampa',
    bio: 'Was manually delivering food to students using friends\' meal plan IDs. Saw the demand firsthand. Leads restaurant partnerships, campus operations, and the Sodexo relationship.',
  },
  {
    initials: 'FJ',
    name: 'Felipe Jaramillo',
    role: 'CFO & Strategy',
    school: 'Financial Engineering · Duke University',
    bio: 'Built the financial model and unit economics that make Campus Crave viable for every stakeholder. Leads investor relations, financial planning, and multi-campus expansion strategy.',
  },
]

export default function Founders() {
  return (
    <section id="founders">
      <div className="section-inner">
        <div className="reveal">
          <SectionLabel>// The Team</SectionLabel>
          <div className="section-title">
            Built by students who<br />lived the problem.
          </div>
          <p className="section-desc">
            Three founders. Three Colombian students at American universities. One shared frustration:
            why can't we use our dining balance to eat where we actually want?
          </p>
        </div>

        <div className="founders-grid">
          {founders.map((f) => (
            <div key={f.name} className="founder-card reveal">
              <div className="founder-avatar">{f.initials}</div>
              <h3>{f.name}</h3>
              <div className="role">{f.role}</div>
              <div className="school">{f.school}</div>
              <p>{f.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
