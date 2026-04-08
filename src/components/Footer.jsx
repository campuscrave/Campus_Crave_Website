const footerLinks = [
  { label: 'Problem', href: '#problem' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Universities', href: '#universities' },
  { label: 'Partners', href: '#restaurants' },
  { label: 'Team', href: '#team' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/[0.06] py-14 px-6 md:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
        {/* Brand */}
        <div>
          <a href="#" className="flex items-center gap-2.5 no-underline mb-4">
            <img src="/logo.jpeg" alt="Campus Crave" className="h-8 rounded-lg" />
            <span className="font-display font-bold text-white/90 text-lg tracking-tight">
              Campus Crave
            </span>
          </a>
          <p className="font-body text-[14px] text-white/30 leading-[1.6] max-w-[260px]">
            Campus dining infrastructure for the next generation.
          </p>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-2.5 md:items-center">
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-[14px] text-white/40 hover:text-white/70 transition-colors no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="md:text-right">
          <p className="font-body text-[13px] text-white/30 leading-[1.6]">
            &copy; 2026 CampusCrave Inc.<br />
            All rights reserved.
          </p>
          <p className="font-body text-[13px] text-white/20 mt-2">
            Tampa, Florida
          </p>
        </div>
      </div>
    </footer>
  )
}
