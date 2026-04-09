import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

const features = [
  {
    icon: '💳',
    title: 'Spartan Dollars, off campus',
    sub: 'Use your existing meal plan balance at CRG partner restaurants.',
  },
  {
    icon: '🔄',
    title: 'Running low? Top up instantly',
    sub: 'Recharge your account directly through the app — no campus office visit required.',
  },
  {
    icon: '📊',
    title: 'Every dollar tracked',
    sub: 'Real-time balance updates. Know exactly what you have before you order.',
  },
];

export default function IDShowcase() {
  return (
    <section
      className="py-24"
      style={{
        background: 'linear-gradient(135deg, #0C0118 0%, #1a0533 50%, #0C0118 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.05); }
        }
      `}</style>

      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(147,51,234,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content wrapper */}
      <div
        className="max-w-6xl mx-auto px-6"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Desktop — row layout */}
        <div className="hidden lg:flex items-center gap-16">
          {/* LEFT — Video card */}
          <FadeIn>
            <div style={{ flex: '0 0 50%', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                {/* Glow behind card */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '-20px',
                    background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)',
                    borderRadius: '24px',
                    filter: 'blur(20px)',
                    animation: 'glowPulse 3s ease-in-out infinite',
                  }}
                />
                {/* Video container */}
                <div
                  style={{
                    width: '480px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: `
                      0 0 0 1px rgba(147,51,234,0.3),
                      0 32px 80px rgba(0,0,0,0.7),
                      0 0 60px rgba(147,51,234,0.2)
                    `,
                  }}
                >
                  <video
                    src="/videos/ID_Floating_Transition.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: 'inherit',
                    }}
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT — Text content */}
          <FadeIn delay={0.3}>
            <div style={{ flex: '0 0 50%' }}>
              <SectionLabel light>THE KEY TO CAMPUS</SectionLabel>

              <h2
                className="font-bold text-white mt-4"
                style={{
                  fontFamily: 'Outfit',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  lineHeight: 1.2,
                }}
              >
                Unlock the full potential of your student&nbsp;ID.
              </h2>

              <p
                className="mt-4"
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '18px',
                  maxWidth: '440px',
                  lineHeight: 1.6,
                }}
              >
                Your student ID already holds your meal plan balance.
                CampusCrave connects it to every restaurant around campus —
                so the money you already have works everywhere you eat.
              </p>

              {/* Feature rows */}
              <div style={{ marginTop: '32px' }}>
                {features.map((f) => (
                  <div
                    key={f.title}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(107,33,168,0.3)',
                        border: '1px solid rgba(147,51,234,0.4)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'Plus Jakarta Sans',
                          fontSize: '15px',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      >
                        {f.title}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Plus Jakarta Sans',
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.6)',
                          marginTop: '2px',
                          lineHeight: 1.5,
                        }}
                      >
                        {f.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Mobile — stacked layout */}
        <div className="flex lg:hidden flex-col items-center">
          {/* Video card */}
          <FadeIn>
            <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '360px' }}>
              {/* Glow behind card */}
              <div
                style={{
                  position: 'absolute',
                  inset: '-20px',
                  background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, transparent 70%)',
                  borderRadius: '24px',
                  filter: 'blur(20px)',
                  animation: 'glowPulse 3s ease-in-out infinite',
                }}
              />
              {/* Video container */}
              <div
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: `
                    0 0 0 1px rgba(147,51,234,0.3),
                    0 32px 80px rgba(0,0,0,0.7),
                    0 0 60px rgba(147,51,234,0.2)
                  `,
                }}
              >
                <video
                  src="/videos/ID_Floating_Transition.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderRadius: 'inherit',
                  }}
                />
              </div>
            </div>
          </FadeIn>

          {/* Text content */}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: '40px', textAlign: 'center' }}>
              <SectionLabel light>THE KEY TO CAMPUS</SectionLabel>

              <h2
                className="font-bold text-white mt-4"
                style={{
                  fontFamily: 'Outfit',
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  lineHeight: 1.2,
                }}
              >
                Unlock the full potential of your student&nbsp;ID.
              </h2>

              <p
                className="mt-4 mx-auto"
                style={{
                  fontFamily: 'Plus Jakarta Sans',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '16px',
                  maxWidth: '440px',
                  lineHeight: 1.6,
                }}
              >
                Your student ID already holds your meal plan balance.
                CampusCrave connects it to every restaurant around campus —
                so the money you already have works everywhere you eat.
              </p>

              {/* Feature rows — left aligned on mobile too */}
              <div style={{ marginTop: '28px', textAlign: 'left', maxWidth: '400px', margin: '28px auto 0' }}>
                {features.map((f) => (
                  <div
                    key={f.title}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(107,33,168,0.3)',
                        border: '1px solid rgba(147,51,234,0.4)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        flexShrink: 0,
                      }}
                    >
                      {f.icon}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: 'Plus Jakarta Sans',
                          fontSize: '15px',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      >
                        {f.title}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Plus Jakarta Sans',
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.6)',
                          marginTop: '2px',
                          lineHeight: 1.5,
                        }}
                      >
                        {f.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
