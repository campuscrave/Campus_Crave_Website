import { useRef, useState, useEffect } from 'react';

const THUMB_SIZE = 52;
const THUMB_OFFSET = 4;

export default function SwipeButton({ onSuccess, label, disabled }) {
  const containerRef = useRef(null);
  const thumbRef = useRef(null);
  const fillRef = useRef(null);
  const containerWidth = useRef(0);

  const isDragging = useRef(false);
  const startX = useRef(0);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
  if (containerRef.current) {
    containerWidth.current = containerRef.current.getBoundingClientRect().width;
    if (fillRef.current && containerWidth.current > 0) {
      fillRef.current.style.width = ((52 + 4) / containerWidth.current * 100) + '%'
    }
  }
}, []);

  const getMaxLeft = () => containerWidth.current - THUMB_SIZE - THUMB_OFFSET;

  const setFillWidth = (left) => {
    if (fillRef.current) {
      const pct = ((left + THUMB_SIZE) / containerWidth.current) * 100;
      fillRef.current.style.width = pct + '%';
    }
  };

  const handlePointerDown = (e) => {
    if (disabled || isSuccess) return;
    isDragging.current = true;
    startX.current = e.clientX;
    if (thumbRef.current) {
      thumbRef.current.style.transition = 'none';
      thumbRef.current.style.cursor = 'grabbing';
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current || isSuccess) return;

    const delta = e.clientX - startX.current;
    const rawLeft = delta + THUMB_OFFSET;
    const maxLeft = getMaxLeft();
    const newLeft = Math.max(THUMB_OFFSET, Math.min(rawLeft, maxLeft));

    if (thumbRef.current) {
      thumbRef.current.style.left = newLeft + 'px';
    }
    setFillWidth(newLeft);

    if (newLeft >= maxLeft * 0.85) {
      triggerSuccess(maxLeft);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (isSuccess) return;

    // Snap back
    setIsResetting(true);
    if (thumbRef.current) {
      thumbRef.current.style.transition = 'left 300ms ease';
      thumbRef.current.style.left = THUMB_OFFSET + 'px';
      thumbRef.current.style.cursor = 'grab';
    }
    if (fillRef.current) {
      fillRef.current.style.transition = 'width 300ms ease';
      fillRef.current.style.width = ((THUMB_OFFSET + THUMB_SIZE) / containerWidth.current * 100) + '%';
    }
    setTimeout(() => {
      setIsResetting(false);
      if (thumbRef.current) thumbRef.current.style.transition = 'none';
      if (fillRef.current) fillRef.current.style.transition = 'none';
    }, 300);
  };

  const triggerSuccess = (maxLeft) => {
    isDragging.current = false;
    setIsSuccess(true);

    // Snap thumb to far right
    if (thumbRef.current) {
      thumbRef.current.style.transition = 'left 150ms ease, background 150ms ease';
      thumbRef.current.style.left = maxLeft + 'px';
      thumbRef.current.style.background = '#16A34A';
      thumbRef.current.style.cursor = 'default';
    }
    if (fillRef.current) {
      fillRef.current.style.transition = 'width 150ms ease';
      fillRef.current.style.width = '100%';
    }

    // Flash container
    if (containerRef.current) {
      containerRef.current.style.transition = 'background 200ms ease';
      containerRef.current.style.background = 'rgba(34,197,94,0.2)';
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.background = '';
        }
      }, 200);
    }

    // Haptic
    if (navigator.vibrate) {
      navigator.vibrate([50, 30, 100]);
    }

    setTimeout(() => {
      onSuccess?.();
    }, 300);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        width: '100%',
        height: '60px',
        background: '#1F2937',
        borderRadius: '30px',
        overflow: 'hidden',
        position: 'relative',
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'not-allowed' : 'default',
        userSelect: 'none',
        touchAction: 'none',
      }}
    >
      {/* Fill bar */}
      <div
        ref={fillRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: ((THUMB_OFFSET + THUMB_SIZE) / 300 * 100) + '%',
          background: 'rgba(107,33,168,0.25)',
          borderRadius: '30px',
          pointerEvents: 'none',
        }}
      />

      {/* Label */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isSuccess ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '14px',
          fontWeight: 500,
          pointerEvents: 'none',
          transition: 'color 200ms ease',
        }}
      >
        {isSuccess ? 'Order placed!' : (label || 'Slide to place your order →')}
      </span>

      {/* Thumb */}
      <div
        ref={thumbRef}
        style={{
          position: 'absolute',
          top: `${THUMB_OFFSET}px`,
          left: `${THUMB_OFFSET}px`,
          width: `${THUMB_SIZE}px`,
          height: `${THUMB_SIZE}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6B21A8, #8B5CF6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          flexShrink: 0,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          zIndex: 1,
        }}
      >
        {isSuccess ? (
          // Checkmark icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          // Right arrow icon
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        )}
      </div>
    </div>
  );
}
