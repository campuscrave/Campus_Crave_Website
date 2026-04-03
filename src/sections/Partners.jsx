import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'

const restaurants = [
  { name: 'Green Lemon', cuisine: 'Mexican' },
  { name: 'Jay Luigi', cuisine: 'Italian' },
  { name: 'Water + Flour', cuisine: 'Pizza & Pasta' },
  { name: 'Taco Dirty', cuisine: 'Tacos & Street Food' },
  { name: 'Daily Eats', cuisine: 'American' },
  { name: 'Sweet Soul', cuisine: 'Southern & BBQ' },
]

export default function Partners() {
  return (
    <section id="pilot" className="bg-surface-warm py-24 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <SectionLabel>Pilot Launch</SectionLabel>
          <h2
            className="font-display font-extrabold text-gray-900 tracking-[-0.03em] leading-[1.12] mb-5"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Starting at University of Tampa.
          </h2>
          <p className="font-body text-[16px] text-gray-500 leading-[1.65] max-w-[520px] mb-12">
            Launching with 6 Ciccio Restaurant Group locations within a 1.4-mile campus radius.
            Pickup-first, with delivery coming in Phase 2.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {restaurants.map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.04}>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:-translate-y-0.5 transition-transform cursor-default">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-purple-faint to-brand-purple-muted flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-xl text-brand-purple">
                    {r.name[0]}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[15px] text-gray-900 mb-1">
                  {r.name}
                </h3>
                <p className="font-body text-[13px] text-gray-400">{r.cuisine}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
