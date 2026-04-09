import { useEffect, useState } from 'react';

const CONFETTI_COLORS = ['#FCD34D', '#A78BFA', '#34D399', '#F9FAFB', '#FB923C'];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function OrderConfirmation({ firstName, orderNumber, itemName, restaurant, onDone }) {
  const [confetti, setConfetti] = useState([]);
  const [checkVisible, setCheckVisible] = useState(false);

  useEffect(() => {
    setCheckVisible(true);

    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      left: `${randomBetween(0, 100)}%`,
      isSquare: Math.random() > 0.5,
      rotation: Math.floor(randomBetween(0, 360)),
      duration: `${randomBetween(1, 2).toFixed(2)}s`,
      delay: `${randomBetween(0, 0.8).toFixed(2)}s`,
    }));
    setConfetti(pieces);
  }, []);

  const formattedOrder = '#' + String(orderNumber);

  // Derive emoji from itemName
  const emoji = itemName && itemName.toLowerCase().includes('wrap') ? '🌯' : '🍗';

  return (
    <>
      <style>{`
        @keyframes checkIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes confettiFall {
          from { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          to   { transform: translateY(calc(100vh + 20px)) rotate(720deg); opacity: 0; }
        }
      `}</style>

      {/* Outer voucher wrapper */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>

        {/* Confetti — on top of everything */}
        {confetti.map((piece) => (
          <div
            key={piece.id}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              borderRadius: piece.isSquare ? '2px' : '50%',
              background: piece.color,
              left: piece.left,
              top: '-10px',
              pointerEvents: 'none',
              zIndex: 10,
              animation: `confettiFall ${piece.duration} ${piece.delay} ease-in forwards`,
            }}
          />
        ))}

        {/* ── SECTION 1: TOP BANNER ── */}
        <div style={{
          background: 'linear-gradient(135deg, #4C1D95, #6B21A8)',
          padding: '1.5rem',
          textAlign: 'center',
        }}>
          {/* Animated checkmark circle */}
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            animation: checkVisible ? 'checkIn 300ms ease-out forwards' : 'none',
            transform: 'scale(0)',
          }}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path
                d="M5 13L11 19L21 8"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'white', marginTop: '0.75rem' }}>
            Order Confirmed!
          </div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>
            Hey {firstName}, you're all set!
          </div>
        </div>

        {/* ── SECTION 2: VOUCHER CARD ── */}
        <div style={{
          background: 'white',
          boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.06)',
          padding: '1.25rem 1.5rem',
        }}>

          {/* Row 1 — Order number + QR decoration */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{
                fontSize: '11px',
                color: '#9CA3AF',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                Order Number
              </div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: '#0C0118',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                lineHeight: 1.1,
              }}>
                {formattedOrder}
              </div>
            </div>

            {/* Mini QR decoration */}
            <div style={{
              width: '48px',
              height: '48px',
              background: '#F3F4F6',
              borderRadius: '8px',
              border: '2px solid #E5E7EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 6px)',
                gridTemplateRows: 'repeat(3, 6px)',
                gap: '2px',
              }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '1px',
                    background: '#6B21A8',
                    opacity: [0, 2, 4, 6, 8].includes(i) ? 1 : 0.3,
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* Dashed separator */}
          <div style={{ borderTop: '2px dashed #E5E7EB', margin: '1rem 0' }} />

          {/* Row 2 — Item details */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(107,33,168,0.08)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              flexShrink: 0,
            }}>
              {emoji}
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0C0118' }}>{itemName}</div>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>{restaurant}</div>
            </div>
          </div>

          {/* Row 3 — Pickup instruction */}
          <div style={{
            marginTop: '0.875rem',
            background: 'rgba(107,33,168,0.06)',
            borderRadius: '12px',
            padding: '0.75rem 1rem',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>📍</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#0C0118' }}>
                Show this screen at the CampusCrave booth
              </div>
              <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>
                Venture Expo · University of Tampa
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 3: FOOTER ── */}
        <div style={{
          background: '#F9FAFB',
          borderTop: '1px solid #F3F4F6',
          padding: '1rem 1.5rem',
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1, fontSize: '11px', color: '#9CA3AF', lineHeight: 1.4 }}>
            Valid today only · One per student · While supplies last
          </div>
          <button
            onClick={onDone}
            style={{
              background: '#6B21A8',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 20px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 150ms',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#5B1A9F')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#6B21A8')}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
