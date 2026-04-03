import SectionLabel from '../components/SectionLabel'

const steps = [
  {
    title: 'Download & Verify',
    desc: 'Sign up with your university email. Your .edu address confirms your student status and campus affiliation.',
  },
  {
    title: 'Load Crave Dollars',
    desc: 'Add funds to your Crave Dollar balance via debit or credit card. Plans start at $200 per semester with no minimums after that.',
  },
  {
    title: 'Browse & Order',
    desc: 'Explore curated restaurants near campus. See menus, customize your order, and checkout with your Crave Dollar balance.',
  },
  {
    title: 'Pick Up & Enjoy',
    desc: 'Your order goes straight to the restaurant kitchen. Walk over, grab your food, skip the line. Delivery coming in Phase 2.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="section-inner">
        <div className="reveal">
          <SectionLabel>// How It Works</SectionLabel>
          <div className="section-title">
            Simple for students.<br />Seamless for partners.
          </div>
          <p className="section-desc">
            Four steps from download to your first off-campus order. No dining dollar integration
            required — we built our own payment layer.
          </p>
        </div>

        <div className="steps">
          {steps.map((step) => (
            <div key={step.title} className="step reveal">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
