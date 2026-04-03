export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="nav-logo" style={{ marginBottom: '4px' }}>
            <img src="/logo.jpeg" alt="Campus Crave" style={{ height: '32px', borderRadius: '8px' }} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)' }}>
              Campus Crave
            </span>
          </a>
          <p>Reinventing campus dining. One university at a time.</p>
        </div>

        <div className="footer-col">
          <h4>Product</h4>
          <a href="#how-it-works">How It Works</a>
          <a href="#crave-dollars">Crave Dollars</a>
          <a href="#app">The App</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#founders">Team</a>
          <a href="#vision">Vision</a>
          <a href="#partners">Partners</a>
        </div>

        <div className="footer-col">
          <h4>Connect</h4>
          <a href="mailto:hello@campuscrave.com">hello@campuscrave.com</a>
          <a href="#">LinkedIn</a>
          <a href="#">Instagram</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 CampusCrave Corp. All rights reserved.</span>
        <span>Tampa, FL · Built by students, for students.</span>
      </div>
    </footer>
  )
}
