import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'

const problems = [
  {
    title: 'Wasted meal plans',
    desc: 'Students prepay thousands for dining dollars they can only spend at a handful of on-campus locations.',
  },
  {
    title: 'No off-campus access',
    desc: "Local restaurants can't accept dining dollars. Students pay out of pocket on top of what they already paid for their meal plan.",
  },
  {
    title: 'No platform exists',
    desc: "DoorDash and Uber Eats don't integrate with campus payment systems. There's no bridge between meal plans and local restaurants.",
  },
]

export default function Problem() {
  return (
    <section id="problem" className="bg-white py-24 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <SectionLabel>The Problem</SectionLabel>
          <h2
            className="font-display font-extrabold text-gray-900 tracking-[-0.03em] leading-[1.12] mb-5 max-w-[600px]"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Students are locked into campus dining they don't want.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {problems.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="bg-surface-warm rounded-2xl border border-gray-200 p-8 hover:border-brand-purple-muted transition-colors h-full">
                <h3 className="font-display font-bold text-[19px] text-gray-900 mb-3 tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="font-body text-[15px] text-gray-500 leading-[1.65]">
                  {item.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
