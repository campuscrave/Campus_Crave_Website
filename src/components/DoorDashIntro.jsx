import { useState, useEffect, useCallback } from 'react'

const DD_RED = '#FF3008'

export default function DoorDashIntro({ onComplete }) {
  // 'intro' → 'rejected' → 'fading' → (unmounted via onComplete)
  const [phase, setPhase] = useState('intro')

  const advance = useCallback(() => {
    if (phase !== 'intro') return
    setPhase('rejected')
    setTimeout(() => {
      setPhase('fading')
      setTimeout(onComplete, 650)
    }, 1300)
  }, [phase, onComplete])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space') {
        e.preventDefault()
        advance()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  return (
    <>
      <style>{`
        @keyframes ddXPop {
          0%   { transform: scale(0.4); opacity: 0; }
          70%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        @keyframes ddXSlideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Full-screen overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: '#F5F4F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.65s ease',
          opacity: phase === 'fading' ? 0 : 1,
          pointerEvents: phase === 'fading' ? 'none' : 'auto',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Sign-in card */}
        <div
          style={{
            background: '#fff',
            borderRadius: '14px',
            padding: '48px 40px 40px',
            width: '100%',
            maxWidth: '420px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <img
              src="/Doordash-Logo-PNG.png"
              alt="DoorDash"
              style={{ height: '38px', objectFit: 'contain' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextSibling.style.display = 'block'
              }}
            />
            {/* Fallback text logo if image is missing */}
            <span
              style={{
                display: 'none',
                fontSize: '28px',
                fontWeight: '900',
                color: DD_RED,
                letterSpacing: '-1px',
              }}
            >
              DoorDash
            </span>
          </div>

          <h2
            style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#1a1a1a',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Sign in to DoorDash
          </h2>

          <div style={{ marginBottom: '14px' }}>
            <input
              type="email"
              placeholder="Email"
              readOnly
              tabIndex={-1}
              style={{
                width: '100%',
                padding: '13px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                background: '#fafafa',
                boxSizing: 'border-box',
                outline: 'none',
                color: '#555',
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <input
              type="password"
              placeholder="Password"
              readOnly
              tabIndex={-1}
              style={{
                width: '100%',
                padding: '13px 16px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '15px',
                background: '#fafafa',
                boxSizing: 'border-box',
                outline: 'none',
                color: '#555',
              }}
            />
          </div>

          <button
            tabIndex={-1}
            style={{
              width: '100%',
              padding: '14px',
              background: DD_RED,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'default',
              letterSpacing: '0.2px',
            }}
          >
            Sign In
          </button>

          <p
            style={{
              textAlign: 'center',
              marginTop: '18px',
              fontSize: '13px',
              color: '#aaa',
            }}
          >
            Press <strong>Space</strong> to continue
          </p>

          {/* Red X overlay — appears on 'rejected' phase */}
          {phase === 'rejected' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '14px',
                background: 'rgba(220, 30, 10, 0.94)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'ddXPop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
              }}
            >
              <span
                style={{
                  fontSize: '100px',
                  color: '#fff',
                  fontWeight: '900',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                ✕
              </span>
              <p
                style={{
                  color: '#fff',
                  fontSize: '19px',
                  fontWeight: '700',
                  marginTop: '14px',
                  animation: 'ddXSlideIn 0.3s 0.15s ease both',
                  userSelect: 'none',
                }}
              >
                Not with campus dollars.
              </p>
            </div>
          )}
        </div>

        {/* Discreet skip button */}
        <button
          onClick={advance}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'transparent',
            border: '1px solid #ccc',
            borderRadius: '6px',
            padding: '7px 13px',
            fontSize: '12px',
            color: '#aaa',
            cursor: 'pointer',
            letterSpacing: '0.2px',
          }}
        >
          Skip to CampusCrave
        </button>
      </div>
    </>
  )
}
