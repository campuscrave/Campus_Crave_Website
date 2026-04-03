import FadeIn from '../components/FadeIn'

export default function CTA() {
  return (
    <section id="cta" className="bg-brand-dark py-24 md:py-32 px-6 md:px-8 text-center">
      <div className="max-w-[720px] mx-auto">
        <FadeIn>
          <h2
            className="font-display font-extrabold text-white tracking-[-0.03em] leading-[1.12] mb-5"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            Ready to rethink campus dining?
          </h2>
          <p className="font-body text-[16px] text-white/60 leading-[1.65] max-w-[560px] mx-auto mb-12">
            Whether you're a university administrator, a dining services operator, or a local
            restaurant — we'd like to talk.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="mailto:hello@campuscrave.com"
              className="inline-flex items-center gap-2.5 bg-white text-brand-dark px-7 py-3.5 rounded-[12px] font-body text-[15px] font-semibold hover:bg-gray-100 transition-colors shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
            >
              Get Early Access
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
              href="mailto:hello@campuscrave.com"
              className="inline-flex items-center gap-2 bg-transparent text-white/90 px-7 py-3.5 rounded-[12px] font-body text-[15px] font-semibold border border-white/20 hover:border-white/40 hover:bg-white/[0.05] transition-all"
            >
              Partnership Inquiries
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
