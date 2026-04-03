import FadeIn from '../components/FadeIn'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center pt-[140px] pb-20 px-6 md:px-8 bg-white overflow-hidden"
    >
      {/* Subtle radial gradient — barely visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% -10%, #F5F3FF 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[800px]">
        {/* Status pill */}
        <FadeIn>
          <div className="inline-flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-5 py-2 mb-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]" />
            <span className="text-sm font-body text-gray-600 font-medium">
              Launching at University of Tampa
            </span>
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.06}>
          <h1
            className="font-display font-extrabold tracking-[-0.035em] leading-[1.02] text-gray-900 mb-6"
            style={{ fontSize: 'clamp(40px, 6vw, 76px)' }}
          >
            Your meal plan,
            <br />
            <span className="text-brand-purple">off campus.</span>
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.1}>
          <p className="font-body text-gray-500 leading-[1.65] max-w-[560px] mx-auto mb-14 text-[17px]">
            Campus Crave connects university students with local restaurants through a
            campus-endorsed platform. One app. One balance. Every craving.
          </p>
        </FadeIn>

        {/* Buttons */}
        <FadeIn delay={0.16}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#cta"
              className="inline-flex items-center gap-2.5 bg-brand-purple text-white px-7 py-3.5 rounded-[12px] font-body text-[15px] font-semibold shadow-[0_4px_16px_rgba(107,47,160,0.35)] hover:shadow-[0_8px_28px_rgba(107,47,160,0.5)] hover:-translate-y-0.5 transition-all"
            >
              Request Early Access
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 9h10" />
                <path d="M10 5l4 4-4 4" />
              </svg>
            </a>
            <a
              href="#universities"
              className="inline-flex items-center gap-2 bg-white text-brand-purple px-7 py-3.5 rounded-[12px] font-body text-[15px] font-semibold border border-gray-200 hover:border-brand-purple-muted hover:bg-brand-purple-faint transition-all"
            >
              University Partners
            </a>
          </div>
        </FadeIn>

        {/* Trust metrics */}
        <FadeIn delay={0.22}>
          <div className="flex items-center justify-center gap-12 md:gap-16 flex-wrap mt-20">
            {[
              { value: '6', label: 'CRG pilot restaurants' },
              { value: '1.4mi', label: 'campus radius' },
              { value: '$0', label: 'student delivery fees at launch' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-extrabold text-[28px] text-gray-900 tracking-[-0.03em] leading-none mb-1.5">
                  {stat.value}
                </div>
                <div className="font-body text-[13px] text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
