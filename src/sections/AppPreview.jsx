const cards = [
  {
    emoji: '💰',
    bg: 'rgba(74,222,128,0.12)',
    title: 'Zero Upfront Cost',
    desc: 'No setup fees, no monthly subscription. CampusCrave earns a small commission per order — you only pay when you make money.',
  },
  {
    emoji: '📊',
    bg: 'rgba(107,33,168,0.12)',
    title: 'Live Order Dashboard',
    desc: 'Every order appears instantly on your screen. Manage status, mark as ready, and see analytics — all in a clean web dashboard.',
  },
  {
    emoji: '🎓',
    bg: 'rgba(251,191,36,0.12)',
    title: 'Campus-Native Audience',
    desc: 'Reach students who live 0.3 to 1.4 miles from your location. These aren\'t random app users — they\'re your neighborhood.',
  },
  {
    emoji: '📋',
    bg: 'rgba(59,130,246,0.12)',
    title: 'Simple Menu Management',
    desc: 'Update prices, toggle items off, add new categories — all without calling anyone. Changes go live in seconds.',
  },
]

export default function AppPreview() {
  return (
    <section id="restaurants" className="py-20" style={{ background: '#ffffff' }}>
      <div className="mx-auto px-6" style={{ maxWidth: 1200 }}>
        <div className="text-center">
          <span className="section-label">For Restaurants</span>
          <h2 className="mt-3 font-bold" style={{ fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.12, color: '#0C0118' }}>
            Your restaurant, on every student&apos;s phone.
          </h2>
          <p className="mt-4 text-base leading-relaxed mx-auto" style={{ color: '#6B7280', maxWidth: 560 }}>
            Join the CampusCrave network. Zero upfront cost, zero complexity. Your menu on a campus-native platform that students actually use.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {cards.map(({ emoji, bg, title, desc }) => (
            <div key={title} className="glass-card p-6 flex flex-col">
              <div
                className="flex items-center justify-center rounded-full mb-4"
                style={{ width: 52, height: 52, background: bg, fontSize: 24 }}
              >
                {emoji}
              </div>
              <h3 className="font-bold mb-2" style={{ fontSize: '1.05rem', color: '#0C0118' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6B7280' }}>{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p style={{ color: '#6B7280', fontSize: 14 }}>Own a restaurant near UT Tampa?</p>
          <button
            className="mt-2 font-semibold bg-transparent border-none"
            style={{ color: '#8B5CF6', cursor: 'pointer', textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
            onClick={() => { window.location.href = 'mailto:hello@campuscrave.com?subject=Restaurant Partnership' }}
          >
            Let&apos;s talk →
          </button>
          <p className="mt-3 text-xs" style={{ color: '#6B7280' }}>
            Currently accepting applications from CRG and independent restaurants within 1.4mi of campus
          </p>
        </div>
      </div>
    </section>
  )
}
