const restaurants = [
  { initials: 'GL',  name: 'Green Lemon',        bg: '#4C1D95', label: 'CRG Partner' },
  { initials: 'JL',  name: 'Jay Luigi',           bg: '#6B21A8', label: 'CRG Partner' },
  { initials: 'TD',  name: 'Taco Dirty',          bg: '#5B21B6', label: 'CRG Partner' },
  { initials: 'SB',  name: 'Starbucks',           bg: '#7C3AED', label: 'On-Campus' },
  { initials: 'SF',  name: 'Spartan Food Court',  bg: '#6D28D9', label: 'CRG Partner' },
  { initials: 'CRG', name: 'CRG Group',           bg: '#8B5CF6', label: 'Powered by CRG' },
]

export default function Partners() {
  return (
    <section id="partners" className="py-20" style={{ background: '#FAFAF8' }}>
      <div className="mx-auto px-6 text-center" style={{ maxWidth: 1200 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>Pilot Partners</div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#0C0118' }}>
          Launching with 5 CRG restaurants.
        </h2>
        <p style={{ color: '#6B7280', maxWidth: 600, margin: '0.75rem auto 0', fontSize: '1rem' }}>
          The Ciccio Restaurant Group runs Tampa's most beloved campus-area dining spots.
          CampusCrave launches exclusively with CRG — built on trust and proximity.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {restaurants.map(({ initials, name, bg, label }) => (
            <div key={name} className="glass-card p-4 flex flex-col items-center text-center">
              <div style={{
                width: 48, height: 48, borderRadius: '50%', background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{initials}</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0C0118', marginTop: '0.75rem' }}>{name}</p>
              <span style={{
                fontSize: 10, color: '#8B5CF6',
                background: 'rgba(107,33,168,0.15)', borderRadius: 10,
                padding: '0.125rem 0.5rem', marginTop: '0.25rem', display: 'inline-block',
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '2.5rem', fontSize: 12, color: '#9CA3AF', textAlign: 'center', fontStyle: 'italic' }}>
          Pilot launch at University of Tampa · Operated by Ciccio Restaurant Group (CRG)
        </p>
      </div>
    </section>
  )
}