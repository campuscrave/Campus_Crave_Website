const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M3 8h10m0 0L9 4m4 4L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function Button({ href, variant = 'primary', showArrow = false, children, ...props }) {
  return (
    <a href={href} className={`btn-${variant}`} {...props}>
      {children}
      {showArrow && <ArrowIcon />}
    </a>
  )
}
