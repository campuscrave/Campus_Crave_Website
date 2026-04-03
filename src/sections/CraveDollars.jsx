import FadeIn from '../components/FadeIn'
import SectionLabel from '../components/SectionLabel'

const benefits = [
  'Increase meal plan utilization and perceived value',
  'Expand dining options without capital investment',
  'Real-time reporting and transaction oversight',
  'PCI-compliant payment infrastructure',
  'White-label option for institutional branding',
  'Zero integration risk — works alongside existing systems',
]

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9l3.5 3.5L14 6" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9h10" />
    <path d="M10 5l4 4-4 4" />
  </svg>
)

export default function CraveDollars() {
  return (
    <section id="universities" className="bg-brand-dark py-24 md:py-28 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* Left column */}
        <div>
          <FadeIn>
            <SectionLabel light>For Universities</SectionLabel>
            <h2
              className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.12] mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
            >
              Make your meal plan worth more.
            </h2>
            <p className="text-white/70 font-body text-[16px] leading-[1.65] max-w-[460px] mb-10">
              Campus Crave gives dining services a modern platform to extend meal plan value off
              campus — without replacing existing infrastructure.
            </p>
            <a
              href="mailto:hello@campuscrave.com"
              className="inline-flex items-center gap-2.5 bg-white text-brand-dark px-6 py-3 rounded-[10px] font-body text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              Partner with us
              <ArrowIcon />
            </a>
          </FadeIn>
        </div>

        {/* Right column — benefits */}
        <div className="flex flex-col gap-3">
          {benefits.map((benefit, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="flex items-start gap-4 bg-white/[0.04] rounded-xl border border-white/[0.08] py-4 px-5">
                <div className="w-8 h-8 rounded-lg bg-white/[0.08] flex items-center justify-center flex-shrink-0 mt-0.5 text-purple-300">
                  <CheckIcon />
                </div>
                <span className="text-white/80 font-body text-[15px] leading-[1.55]">
                  {benefit}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
