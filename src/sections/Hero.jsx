import { useEffect, useRef } from 'react'
import Button from '../components/Button'

export default function Hero() {
  const particlesRef = useRef(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      p.style.left = Math.random() * 100 + '%'
      p.style.animationDelay = Math.random() * 8 + 's'
      p.style.animationDuration = 6 + Math.random() * 6 + 's'
      container.appendChild(p)
    }
    return () => { container.innerHTML = '' }
  }, [])

  return (
    <section className="hero" id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="particles" ref={particlesRef}></div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="dot"></span>
          Launching at University of Tampa
        </div>

        <h1>
          Your meal plan.<br />
          <span className="grad">Everywhere you eat.</span>
        </h1>

        <p>
          Campus Crave is the off-campus dining marketplace that lets students order from local
          restaurants through a campus-endorsed platform. One app. One balance. Every craving.
        </p>

        <div className="hero-actions">
          <Button href="#cta" variant="primary" showArrow>
            Join the Waitlist
          </Button>
          <Button href="#partners" variant="secondary">
            Partner With Us
          </Button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num"><span className="highlight">96</span>%</div>
            <div className="label">Eat off-campus weekly</div>
          </div>
          <div className="hero-stat">
            <div className="num"><span className="highlight">95</span>%</div>
            <div className="label">Want CampusCrave</div>
          </div>
          <div className="hero-stat">
            <div className="num"><span className="highlight">$0</span></div>
            <div className="label">Revenue to dining ops today</div>
          </div>
        </div>
      </div>
    </section>
  )
}
