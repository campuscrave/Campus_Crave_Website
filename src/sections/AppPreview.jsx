import SectionLabel from '../components/SectionLabel'

function AppScreen({ time, title, children }) {
  return (
    <div className="app-screen reveal">
      <div className="app-screen-bar">
        <span className="time">{time}</span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="app-screen-title">{title}</div>
      {children}
    </div>
  )
}

function AppItem({ emoji, bg, name, sub, price }) {
  return (
    <div className="app-item">
      <div className="app-item-thumb" style={{ background: bg }}>{emoji}</div>
      <div className="app-item-info">
        <h4>{name}</h4>
        <span>{sub}</span>
      </div>
      {price && <span className="app-item-price">{price}</span>}
    </div>
  )
}

export default function AppPreview() {
  return (
    <section id="app">
      <div className="section-inner">
        <div className="reveal">
          <SectionLabel>// The App</SectionLabel>
          <div className="section-title">
            Built for how students<br />actually order food.
          </div>
          <p className="section-desc" style={{ margin: '0 auto 0', textAlign: 'center' }}>
            Browse curated campus restaurants, customize your order, pay with Crave Dollars, and
            track your food in real time.
          </p>
        </div>

        <div className="app-mockup-container">
          <AppScreen time="9:41" title="Near Campus">
            <AppItem emoji="🍋" bg="rgba(34,197,94,0.12)" name="Green Lemon" sub="Mexican · 1.2 mi · 15 min" />
            <AppItem emoji="🍕" bg="rgba(249,115,22,0.12)" name="Jay Luigi" sub="Pizza · 1.0 mi · 12 min" />
            <AppItem emoji="🫓" bg="rgba(107,47,160,0.12)" name="Water + Flour" sub="Italian · 1.1 mi · 18 min" />
            <AppItem emoji="🌮" bg="rgba(234,88,12,0.12)" name="Taco Dirty" sub="Tex-Mex · 0.8 mi · 10 min" />
          </AppScreen>

          <AppScreen time="9:41" title="Your Order">
            <AppItem emoji="🍋" bg="rgba(34,197,94,0.12)" name="Chicken Tacos (3)" sub="Pico, sour cream, guac" price="$14.50" />
            <AppItem emoji="🥤" bg="rgba(34,197,94,0.12)" name="Horchata" sub="Large" price="$4.00" />
            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(107,47,160,0.08)', borderRadius: '12px', border: '1px solid rgba(107,47,160,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: 'var(--text-dim)' }}>Subtotal</span>
                <span>$18.50</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text-dim)' }}>Service Fee</span>
                <span>$3.33</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, paddingTop: '12px', borderTop: '1px solid #E9E4F2' }}>
                <span>Total</span>
                <span style={{ color: 'var(--purple-glow)' }}>$21.83</span>
              </div>
              <div style={{ marginTop: '14px', background: 'var(--purple)', color: 'white', textAlign: 'center', padding: '12px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                Pay with Crave Dollars
              </div>
            </div>
          </AppScreen>

          <AppScreen time="9:47" title="Order Status">
            <div style={{ textAlign: 'center', padding: '24px 0 16px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>👨‍🍳</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>Preparing Your Order</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Green Lemon · Est. 12 min</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px', padding: '0 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>✓</div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Order Confirmed</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>9:42 AM</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', animation: 'pulse-dot 2s infinite' }}>⏳</div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--purple-glow)' }}>Being Prepared</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>In progress...</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.4 }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#E9E4F2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>📦</div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500 }}>Ready for Pickup</div>
                </div>
              </div>
            </div>
          </AppScreen>
        </div>
      </div>
    </section>
  )
}
