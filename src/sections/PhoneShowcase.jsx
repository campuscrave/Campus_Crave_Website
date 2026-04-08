import { useState, useRef } from 'react';
import FadeIn from '../components/FadeIn';
import SectionLabel from '../components/SectionLabel';

const phones = [
  {
    video: '/videos/home_scroll.mp4',
    rotate: '-6deg',
    offset: '24px',
    delay: 0,
    title: 'Browse restaurants',
    subtitle: 'Open Now, Student Deals, All Restaurants',
    size: 'sm',
  },
  {
    video: '/videos/swipe_order.mp4',
    rotate: '0deg',
    offset: '0px',
    delay: 0.8,
    title: 'Slide to order ✦',
    subtitle: 'Dining Dollars, Crave Dollars, or card',
    size: 'lg',
  },
  {
    video: '/videos/order_status.mp4',
    rotate: '6deg',
    offset: '24px',
    delay: 1.6,
    title: 'Track your order',
    subtitle: 'Live countdown. Step-by-step status.',
    size: 'sm',
  },
];

const phoneStyle = (rotate, offset, delay, size) => ({
  width: size === 'lg' ? '240px' : '220px',
  height: size === 'lg' ? '480px' : '440px',
  background: '#1A1A2E',
  border: '2.5px solid rgba(255,255,255,0.12)',
  borderRadius: '36px',
  boxShadow: `
    0 0 0 1px rgba(107,33,168,0.3),
    0 32px 64px rgba(0,0,0,0.6),
    0 0 40px rgba(147,51,234,0.15)
  `,
  position: 'relative',
  overflow: 'hidden',
  '--phone-rotate': rotate,
  transform: `translateY(${offset}) rotate(${rotate})`,
  animation: `phoneFloat 4s ease-in-out ${delay}s infinite`,
  flexShrink: 0,
});

const mobilePhoneStyle = {
  width: '240px',
  height: '460px',
  background: '#1A1A2E',
  border: '2.5px solid rgba(255,255,255,0.12)',
  borderRadius: '36px',
  boxShadow: `
    0 0 0 1px rgba(107,33,168,0.3),
    0 32px 64px rgba(0,0,0,0.6),
    0 0 40px rgba(147,51,234,0.15)
  `,
  position: 'relative',
  overflow: 'hidden',
  '--phone-rotate': '0deg',
  animation: 'phoneFloat 4s ease-in-out infinite',
  flexShrink: 0,
};

export default function PhoneShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleScroll = (e) => {
    const index = Math.round(e.target.scrollLeft / e.target.offsetWidth);
    setActiveIndex(index);
  };

  const scrollToSlide = (index) => {
    carouselRef.current?.scrollTo({
      left: index * carouselRef.current.offsetWidth,
      behavior: 'smooth',
    });
  };

  return (
    <section
      style={{ background: '#0C0118', overflow: 'hidden', position: 'relative' }}
      className="py-24"
    >
      {/* Keyframes injected inline */}
      <style>{`
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px) rotate(var(--phone-rotate, 0deg)); }
          50%       { transform: translateY(-10px) rotate(var(--phone-rotate, 0deg)); }
        }
        .carousel-hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <FadeIn>
        <div className="flex flex-col items-center text-center px-6 mb-16">
          <SectionLabel light>THE PRODUCT</SectionLabel>
          <h2
            className="font-bold text-white mt-4"
            style={{ fontFamily: 'Outfit', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            See it in action.
          </h2>
          <p
            className="mt-3"
            style={{
              fontFamily: 'Plus Jakarta Sans',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '480px',
            }}
          >
            The full ordering experience — from browse to pickup.
          </p>
        </div>
      </FadeIn>

      {/* Desktop — 3 phones */}
      <FadeIn delay={0.2}>
        <div className="hidden md:flex items-end justify-center gap-6 px-6">
          {phones.map((p) => (
            <div key={p.video} className="flex flex-col items-center">
              <div style={phoneStyle(p.rotate, p.offset, p.delay, p.size)}>
                {/* Notch */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '20px',
                    background: '#0C0118',
                    borderRadius: '10px',
                    zIndex: 10,
                  }}
                />
                {/* Video */}
                <video
                  src={p.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Home indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '2px',
                  }}
                />
              </div>
              {/* Label */}
              <div className="mt-5 text-center" style={{ maxWidth: p.size === 'lg' ? '240px' : '220px' }}>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px', fontWeight: 600, color: 'white' }}>
                  {p.title}
                </p>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  {p.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* Mobile — swipeable carousel */}
      <div className="flex md:hidden flex-col">
        {/* Carousel track */}
        <div
          ref={carouselRef}
          className="carousel-hide-scrollbar"
          onScroll={handleScroll}
          style={{
            width: '100%',
            overflowX: 'scroll',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            display: 'flex',
            paddingBottom: '24px',
          }}
        >
          {phones.map((p) => (
            <div
              key={p.video}
              style={{
                minWidth: '100vw',
                scrollSnapAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 24px',
              }}
            >
              <div style={mobilePhoneStyle}>
                {/* Notch */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '20px',
                    background: '#0C0118',
                    borderRadius: '10px',
                    zIndex: 10,
                  }}
                />
                {/* Video */}
                <video
                  src={p.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Home indicator */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '60px',
                    height: '4px',
                    background: 'rgba(255,255,255,0.3)',
                    borderRadius: '2px',
                  }}
                />
              </div>
              {/* Label */}
              <div style={{ marginTop: '20px', textAlign: 'center', maxWidth: '260px' }}>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '15px', fontWeight: 600, color: 'white' }}>
                  {p.title}
                </p>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                  {p.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '4px' }}>
          {phones.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              style={{
                height: '8px',
                width: activeIndex === i ? '24px' : '8px',
                borderRadius: activeIndex === i ? '4px' : '50%',
                background: activeIndex === i ? '#9333EA' : 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 300ms ease, background 300ms ease, border-radius 300ms ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom strip — 4th screen */}
      <FadeIn delay={0.4}>
        <div className="flex justify-center mt-12 px-6">
          <div
            style={{
              background: 'rgba(107,33,168,0.15)',
              border: '1px solid rgba(147,51,234,0.3)',
              borderRadius: '16px',
              padding: '20px 32px',
              maxWidth: '480px',
              width: '100%',
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div style={{ flex: 1, textAlign: 'center' }} className="md:text-left">
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '15px', fontWeight: 600, color: 'white' }}>
                  Order ready — show at the counter
                </p>
                <p style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
                  Your order code appears instantly. Walk up and show it.
                </p>
              </div>
              {/* Mini phone */}
              <div
                style={{
                  width: '80px', height: '140px', background: '#1A1A2E',
                  border: '2px solid rgba(255,255,255,0.12)', borderRadius: '16px',
                  position: 'relative', overflow: 'hidden', flexShrink: 0,
                }}
              >
                <video
                  src="/videos/order_ready.mp4"
                  autoPlay loop muted playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
