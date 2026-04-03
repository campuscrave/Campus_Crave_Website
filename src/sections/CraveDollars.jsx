import SectionLabel from '../components/SectionLabel'

const features = [
  {
    icon: '⚡',
    title: 'Instant Reload',
    desc: 'Top up your balance anytime with a debit or credit card. No waiting, no forms, no bursar office.',
  },
  {
    icon: '🔒',
    title: 'Separate from Meal Plan',
    desc: 'Crave Dollars are a distinct currency. Spartan Dollars and meal swipes are completely unaffected.',
  },
  {
    icon: '📊',
    title: 'Track Your Spending',
    desc: 'See where your money goes. Order history, spending analytics, and budget tools built in.',
  },
  {
    icon: '🎓',
    title: 'Campus-Endorsed',
    desc: 'Every restaurant on the platform is curated and approved. This is not a random delivery app.',
  },
]

export default function CraveDollars() {
  return (
    <section id="crave-dollars">
      <div className="crave-glow"></div>
      <div className="section-inner">
        <div className="crave-grid">
          <div>
            <div className="reveal">
              <SectionLabel>// Crave Dollars</SectionLabel>
              <div className="section-title">
                A new currency for<br />campus commerce.
              </div>
              <p className="section-desc" style={{ marginBottom: '36px' }}>
                Crave Dollars are a rechargeable balance that works at every restaurant on the
                platform. Not a meal plan replacement — a meal plan expansion.
              </p>
            </div>

            <div className="crave-features">
              {features.map((feat) => (
                <div key={feat.title} className="crave-feat reveal">
                  <div className="crave-feat-icon">{feat.icon}</div>
                  <div>
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="crave-visual">
              <div className="crave-card">
                <div className="crave-card-label">Campus Crave Wallet</div>
                <div className="crave-card-name">Crave Dollars</div>
                <div className="crave-card-balance-label">Available Balance</div>
                <div className="crave-card-balance">$247.50</div>
                <div className="crave-card-row">
                  <span>University of Tampa</span>
                  <span>Fall 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
