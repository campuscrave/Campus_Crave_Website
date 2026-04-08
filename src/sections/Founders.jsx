const team = [
  { initials: 'JP', name: 'Juan Pablo',      role: 'CEO', university: 'Knox College',          bio: 'CS & Econometrics double major. Building the platform end to end.' },
  { initials: 'MG', name: 'Matias Gil',       role: 'COO', university: 'University of Tampa',   bio: 'Cyber Security & Entrepreneurship double major. Wiring the institutions.' },
  { initials: 'FJ', name: 'Felipe Jaramillo', role: 'CFO', university: 'Duke University',        bio: 'Financial Engineering at Duke. Making the numbers work.' },
]

export default function Founders() {
  return (
    <section id="team" className="py-20" style={{ background: '#ffffff' }}>
      <div className="mx-auto px-6 text-center" style={{ maxWidth: 900 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>The Team</div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#0C0118' }}>
          Built by students, for students.
        </h2>
        <p style={{ color: '#6B7280', marginTop: '0.75rem' }}>
          We experienced the campus dining problem firsthand at the University of Tampa.
          CampusCrave is our answer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {team.map(({ initials, name, role, university, bio }) => (
            <div key={name} className="glass-card p-8 flex flex-col items-center text-center">
              {/* TODO: Replace with photo — <img src={`/founders/${name.toLowerCase().replace(' ', '-')}.jpg`} className="w-full h-full object-cover rounded-full" /> */}
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4C1D95, #7C3AED)',
                border: '2px solid rgba(139,92,246,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
              }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>{initials}</span>
              </div>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0C0118', marginTop: '1.25rem' }}>{name}</p>
              <p style={{ fontSize: 13, color: '#8B5CF6', fontWeight: 500, marginTop: '0.25rem' }}>{role}</p>
              <p style={{ fontSize: 12, color: '#6B7280', marginTop: '0.25rem' }}>{university}</p>
              <p style={{ fontSize: 13, color: '#6B7280', marginTop: '0.75rem', lineHeight: 1.6 }}>{bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
