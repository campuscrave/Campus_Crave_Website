export default function SectionLabel({ children, light = false }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={`w-8 h-0.5 rounded-full ${light ? 'bg-purple-400' : 'bg-brand-purple'}`} />
      <span className={`font-body text-[13px] font-bold uppercase tracking-[0.12em] ${light ? 'text-purple-300' : 'text-brand-purple'}`}>
        {children}
      </span>
    </div>
  )
}
