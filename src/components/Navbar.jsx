import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <a href="#" className="nav-logo">
        <img src="/logo.jpeg" alt="Campus Crave" />
        <span>Campus Crave</span>
      </a>

      <div className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
        <a href="#problem" onClick={closeMenu}>Problem</a>
        <a href="#how-it-works" onClick={closeMenu}>How It Works</a>
        <a href="#crave-dollars" onClick={closeMenu}>Crave Dollars</a>
        <a href="#partners" onClick={closeMenu}>Partners</a>
        <a href="#founders" onClick={closeMenu}>Team</a>
        <a href="#vision" onClick={closeMenu}>Vision</a>
        <a href="#cta" className="nav-cta" onClick={closeMenu}>Get Early Access</a>
      </div>

      <button
        className={`nav-toggle${menuOpen ? ' active' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  )
}
