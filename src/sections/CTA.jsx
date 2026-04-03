import SectionLabel from '../components/SectionLabel'
import Button from '../components/Button'

export default function CTA() {
  return (
    <section id="cta">
      <div className="cta-bg"></div>
      <div className="cta-content">
        <div className="reveal">
          <SectionLabel>// Join Us</SectionLabel>
          <h2>
            Ready to rethink<br />
            <span style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #e9d5ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              campus dining?
            </span>
          </h2>
          <p>
            Whether you're a student, a restaurant, a dining operator, or a university — there's
            a place for you in the Campus Crave ecosystem.
          </p>
          <div className="cta-actions">
            <Button href="mailto:hello@campuscrave.com" variant="primary" showArrow>
              Get In Touch
            </Button>
            <Button href="#partners" variant="secondary">
              Partnership Info
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
