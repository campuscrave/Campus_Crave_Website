import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'

const UsersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="9" r="3.5" />
    <path d="M3 23c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    <circle cx="20" cy="10" r="2.5" />
    <path d="M20 16c3.3 0 6 2.7 6 6" />
  </svg>
)

const ChartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 24V4" />
    <path d="M4 24h20" />
    <path d="M8 17l4-5 4 3 6-7" />
  </svg>
)

const WalletIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="22" height="16" rx="2" />
    <path d="M3 11h22" />
    <circle cx="19" cy="17" r="1.5" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 3L4 7v6c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12V7L14 3z" />
    <path d="M10 14l3 3 5-5" />
  </svg>
)

const cards = [
  {
    Icon: UsersIcon,
    title: 'Reach every student',
    desc: 'Access the entire student body through a single campus-endorsed platform.',
  },
  {
    Icon: ChartIcon,
    title: 'Real-time dashboard',
    desc: 'Track orders, revenue, and peak hours with live analytics and reporting.',
  },
  {
    Icon: WalletIcon,
    title: 'Reliable payments',
    desc: 'Get paid on a consistent schedule through our PCI-compliant payment system.',
  },
  {
    Icon: ShieldIcon,
    title: 'Zero hardware',
    desc: 'No tablets, no terminals. Orders come through your existing systems.',
  },
]

export default function AppPreview() {
  return (
    <section id="restaurants" className="bg-white py-24 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <SectionLabel>For Restaurant Partners</SectionLabel>
          <h2
            className="font-display font-extrabold text-gray-900 tracking-[-0.03em] leading-[1.12] mb-5 max-w-[520px]"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Your restaurant. Their meal plan.
          </h2>
          <p className="font-body text-[16px] text-gray-500 leading-[1.65] max-w-[520px] mb-12">
            Join a campus-endorsed marketplace and reach thousands of hungry students — with lower
            commissions than major delivery apps.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.06}>
              <div className="bg-surface-warm rounded-2xl border border-gray-200 p-8 hover:border-brand-purple-muted transition-colors h-full">
                <div className="w-[52px] h-[52px] rounded-xl bg-brand-purple-faint flex items-center justify-center text-brand-purple mb-5">
                  <card.Icon />
                </div>
                <h3 className="font-display font-bold text-[18px] text-gray-900 mb-2.5 tracking-[-0.02em]">
                  {card.title}
                </h3>
                <p className="font-body text-[15px] text-gray-500 leading-[1.65]">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
