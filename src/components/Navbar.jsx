import { useState, useEffect } from 'react'

const links = [
  { label: 'Problem', href: '#problem' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Universities', href: '#universities' },
  { label: 'Partners', href: '#restaurants' },
  { label: 'Team', href: '#team' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAFAF8]/[0.92] backdrop-blur-xl border-b border-[#E5E2DF] shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <img src="/logo.jpeg" alt="Campus Crave" className="h-9 rounded-lg" />
            <span className="font-display font-bold text-xl text-gray-900 tracking-tight">
              Campus Crave
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-body font-medium text-gray-500 hover:text-brand-purple px-3 py-2 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://mail.google.com/mail/?view=cm&to=hello@campus-crave.com&su=Early%20Access%20Request%20-%20CampusCrave&body=Hi%20CampusCrave%20team%2C%20I'd%20like%20early%20access%20to%20the%20platform."
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 bg-brand-purple text-white px-5 py-2.5 rounded-[10px] font-body text-sm font-semibold shadow-[0_2px_12px_rgba(107,47,160,0.3)] hover:shadow-[0_4px_20px_rgba(107,47,160,0.45)] hover:-translate-y-px transition-all"
            >
              Get Early Access
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-40 md:hidden overflow-y-auto">
          <div className="flex flex-col px-6 py-6 gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-base font-body font-medium text-gray-700 hover:text-brand-purple py-3 px-4 rounded-xl hover:bg-brand-purple-faint transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://mail.google.com/mail/?view=cm&to=hello@campus-crave.com&su=Early%20Access%20Request%20-%20CampusCrave&body=Hi%20CampusCrave%20team%2C%20I'd%20like%20early%20access%20to%20the%20platform."
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-4 bg-brand-purple text-white text-center py-3 rounded-xl font-body text-sm font-semibold"
            >
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </>
  )
}
