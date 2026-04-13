const team = [
  { name: 'Matias Gil',       role: 'CEO', university: 'University of Tampa', bio: 'Leads strategy, partnerships, and on-the-ground operations.' },
  { name: 'Juan Pablo',       role: 'CTO', university: 'Knox College',        bio: 'Leads product architecture, platform development, and technical execution.' },
  { name: 'Felipe Jaramillo', role: 'CFO', university: 'Duke University',     bio: 'Leads financial strategy, modeling, and investor relations.' },
]

function Avatar({ name }) {
  if (name === 'Juan Pablo') {
    return (
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #6B21A8', margin: '0 auto 16px', boxShadow: '0 0 0 4px rgba(107,33,168,0.15)' }}>
        <img src="/JuanPablo.jpeg" alt="Juan Pablo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
      </div>
    )
  }
  if (name === 'Matias Gil') {
    return (
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #6B21A8', margin: '0 auto 16px', boxShadow: '0 0 0 4px rgba(107,33,168,0.15)' }}>
        <img src="/Matias.jpeg" alt="Matias Gil" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }} />
      </div>
    )
  }
  // Felipe
  return (
    <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #6B21A8', margin: '0 auto 16px', boxShadow: '0 0 0 4px rgba(107,33,168,0.15)' }}>
      <img src="/Felipe.jpeg" alt="Felipe Jaramillo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
    </div>
  )
}

export default function Founders() {
  return (
    <section id="team" className="py-20" style={{ background: '#ffffff' }}>
      <div className="mx-auto px-6 text-center" style={{ maxWidth: 900 }}>
        <div className="section-label" style={{ justifyContent: 'center' }}>The Team</div>
        <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#0C0118' }}>
          Built by students, for students.
        </h2>
        <p style={{ color: '#6B7280', marginTop: '0.75rem' }}>
          We experienced the campus dining problem firsthand.
          CampusCrave is our answer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {team.map(({ name, role, university, bio }) => (
            <div key={name} className="glass-card p-8 flex flex-col items-center text-center">
              <Avatar name={name} />
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0C0118' }}>{name}</p>
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