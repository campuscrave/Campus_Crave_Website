const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9h10" />
    <path d="M10 5l4 4-4 4" />
  </svg>
)

const styles = {
  primary:
    'inline-flex items-center gap-2.5 bg-brand-purple text-white px-7 py-3.5 rounded-[12px] font-body text-[15px] font-semibold shadow-[0_4px_16px_rgba(107,47,160,0.35)] hover:shadow-[0_8px_28px_rgba(107,47,160,0.5)] hover:-translate-y-0.5 transition-all',
  secondary:
    'inline-flex items-center gap-2.5 bg-white text-gray-600 px-7 py-3.5 rounded-[12px] font-body text-[15px] font-semibold border border-gray-200 hover:border-brand-purple-muted hover:text-brand-purple transition-all',
}

export default function Button({ href, variant = 'primary', showArrow = false, children, ...props }) {
  return (
    <a href={href} className={styles[variant] || styles.primary} {...props}>
      {children}
      {showArrow && <ArrowIcon />}
    </a>
  )
}
