import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'

const team = [
  {
    initials: 'JP',
    name: 'Juan Pablo',
    role: 'CEO / Sales',
    desc: 'Institutional partnerships, Sodexo strategy, university acquisition.',
    primary: true,
  },
  {
    initials: 'MG',
    name: 'Matías Gil',
    role: 'COO / Operations',
    desc: 'Restaurant onboarding, delivery ops, quality control.',
    primary: false,
  },
  {
    initials: 'FJ',
    name: 'Felipe Jaramillo',
    role: 'CTO / Product',
    desc: 'Platform architecture, app development, technical integrations.',
    primary: false,
  },
]

export default function Founders() {
  return (
    <section id="team" className="bg-white py-24 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <SectionLabel>The Team</SectionLabel>
          <h2
            className="font-display font-extrabold text-gray-900 tracking-[-0.03em] leading-[1.12] mb-5 max-w-[560px]"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Built by founders who know campus operations.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {team.map((person, i) => (
            <FadeIn key={person.name} delay={i * 0.06}>
              <div className="bg-surface-warm rounded-2xl border border-gray-200 p-8 text-center h-full">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 ${
                    person.primary
                      ? 'bg-brand-purple text-white'
                      : 'bg-brand-purple-muted text-brand-purple'
                  }`}
                >
                  <span className="font-display font-bold text-lg">{person.initials}</span>
                </div>
                <h3 className="font-display font-bold text-[19px] text-gray-900 mb-1">
                  {person.name}
                </h3>
                <p className="font-body text-[13px] font-bold uppercase tracking-[0.08em] text-brand-purple mb-4">
                  {person.role}
                </p>
                <p className="font-body text-[15px] text-gray-500 leading-[1.65]">
                  {person.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
