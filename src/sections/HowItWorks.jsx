import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'

const StoreIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="12" width="20" height="12" rx="2" />
    <path d="M8 12V8a6 6 0 0 1 12 0v4" />
  </svg>
)

const WalletIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="22" height="16" rx="2" />
    <path d="M3 11h22" />
    <circle cx="19" cy="17" r="1.5" />
  </svg>
)

const OrderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="4" width="18" height="20" rx="2" />
    <path d="M10 10h8" />
    <path d="M10 14h5" />
    <path d="M10 18h8" />
  </svg>
)

const steps = [
  {
    Icon: StoreIcon,
    num: '01',
    title: 'Browse local restaurants',
    desc: 'Explore curated restaurants within walking distance of campus. See menus, ratings, and real-time wait times.',
  },
  {
    Icon: WalletIcon,
    num: '02',
    title: 'Pay with your balance',
    desc: 'Check out with Crave Dollars — a rechargeable balance loaded via debit or credit card. No cash, no hassle.',
  },
  {
    Icon: OrderIcon,
    num: '03',
    title: 'Pick up or get delivery',
    desc: 'Walk over and skip the line, or get it delivered by a campus driver. Your food, your way.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface-warm py-24 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <SectionLabel>How It Works</SectionLabel>
          <h2
            className="font-display font-extrabold text-gray-900 tracking-[-0.03em] leading-[1.12] mb-5"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Three steps. Zero friction.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.06}>
              <div className="bg-white rounded-2xl border border-gray-200 p-9 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-[52px] h-[52px] rounded-xl bg-brand-purple-faint flex items-center justify-center text-brand-purple">
                    <step.Icon />
                  </div>
                  <span className="font-display font-extrabold text-[40px] text-brand-purple-muted leading-none tracking-[-0.05em]">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display font-bold text-[19px] text-gray-900 mb-3 tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="font-body text-[15px] text-gray-500 leading-[1.65]">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
