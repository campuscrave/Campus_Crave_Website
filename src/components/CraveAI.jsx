import { useState, useEffect, useRef } from 'react';

// ─── Knowledge base ────────────────────────────────────────────────────────────

const KB = [
  {
    keywords: ['what is', 'campuscrave', 'what does', 'tell me about', 'explain'],
    response: "CampusCrave is a campus food ordering platform built specifically for university students. We let students use their Dining Dollars — the meal plan balance they already have — to order from off-campus restaurants. Think of us as the bridge between your meal plan and the food you actually want. 🍔",
  },
  {
    keywords: ['how does it work', 'how it works', 'how do i', 'process', 'steps'],
    response: "It's simple:\n1. Browse restaurants near campus in the app\n2. Add items to your cart\n3. Pay with your Dining Dollars, meal plan balance, or linked card\n4. Pick up your order directly from the restaurant\n\nNo delivery fees. No new accounts. Just your campus balance, finally useful off-campus. 🎓",
  },
  {
    keywords: ['dining dollars', 'meal plan', 'balance', 'flex dollars', 'campus dollars', 'crave dollars'],
    response: "Dining Dollars are the meal plan balance that universities load onto student accounts each semester. Most students spend them only in the campus cafeteria — but huge amounts go unspent and expire. CampusCrave lets you use that same balance at partner restaurants off campus. Same money, way more options. 💰",
  },
  {
    keywords: ['restaurant', 'partner', 'food', 'eat', 'menu', 'where', 'which'],
    response: "Our pilot launch at University of Tampa features 5 CRG restaurant partners:\n• Green Lemon 🌿\n• Jay Luigi 🍕\n• Taco Dirty 🌮\n• Starbucks (on-campus) ☕\n• Spartan Food Court 🏛️\n\nAll operated by Ciccio Restaurant Group (CRG), one of Tampa's top restaurant operators.",
  },
  {
    keywords: ['university of tampa', 'tampa', 'pilot', 'launch', 'ut', 'campus'],
    response: "We're currently piloting at the University of Tampa — our home campus. It's the perfect environment: a tight-knit campus, a strong CRG restaurant presence, and a student body that's been asking for exactly this. From Tampa, we expand to the next university. 🔥",
  },
  {
    keywords: ['team', 'founder', 'who built', 'who made', 'juan pablo', 'matias', 'felipe'],
    response: "CampusCrave was built by three university students:\n\n• Juan Pablo (CEO) — CS & Econometrics at Knox College. Builds the entire platform.\n• Matias Gil (COO) — Cyber Security & Entrepreneurship at UT. Runs ops and partnerships.\n• Felipe Jaramillo (CFO) — Financial Engineering at Duke. Makes the numbers work.\n\nWe experienced the campus dining problem firsthand. CampusCrave is our answer.",
  },
  {
    keywords: ['invest', 'investor', 'funding', 'raise', 'capital', 'equity', 'pitch', 'deck'],
    response: "We're building the infrastructure layer for campus commerce — starting with food, expanding to everything students buy on and around campus. If you're interested in learning more about our raise, reach out to our team at hello@campuscrave.com or visit our investor section below. 📈",
  },
  {
    keywords: ['partner with', 'join', 'restaurant owner', 'bring my', 'my restaurant', 'onboard'],
    response: "We'd love to have you on the platform! CampusCrave gives restaurants direct access to the student meal plan market — thousands of students with pre-loaded balances looking for places to spend them. Email us at hello@campuscrave.com and we'll walk you through the partnership terms. 🤝",
  },
  {
    keywords: ['university', 'college', 'institution', 'school', 'bring campuscrave', 'expand'],
    response: "We're actively looking for our next university partner after the Tampa pilot. If you're a university administrator, dining director, or student government leader — let's talk. We integrate with existing dining systems with zero disruption. Email hello@campuscrave.com 🏫",
  },
  {
    keywords: ['fee', 'cost', 'price', 'free', 'charge', 'pay', 'how much'],
    response: "For students: $0 delivery fees at launch. You just pay for the food using your existing campus balance.\n\nFor restaurants: we charge a platform service fee per transaction — similar to how other delivery platforms work, but with access to a captive student market.\n\nFor universities: institutional partnership terms — reach out for details.",
  },
  {
    keywords: ['app', 'download', 'ios', 'android', 'mobile', 'iphone', 'play store', 'app store'],
    response: "The CampusCrave app is currently in pilot testing at University of Tampa. Public launch on the App Store is planned for later in 2026. Want early access? Drop your email at our booth or reach out at hello@campuscrave.com 📱",
  },
];

const DEFAULT_RESPONSE = "Great question! I'm still learning the full CampusCrave knowledge base 😄 For anything I can't answer, reach out directly at hello@campuscrave.com — or ask a team member at the booth if you're at the Venture Expo!";

const OPENING_MESSAGE = "Hey! I'm CraveAI 👋 I'm here to answer anything about CampusCrave — how it works, our restaurant partners, the Dining Dollars integration, investment opportunities, or how to bring us to your university. What do you want to know?";

function getResponse(input) {
  const lower = input.toLowerCase();
  for (const entry of KB) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return DEFAULT_RESPONSE;
}

// ─── Typing indicator ──────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#9CA3AF',
            animation: `craveai-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Message bubble ────────────────────────────────────────────────────────────

function Bubble({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: 10,
      }}
    >
      <div
        style={{
          maxWidth: '82%',
          padding: msg.typing ? 0 : '10px 14px',
          background: isUser ? '#6B21A8' : '#F3F4F6',
          color: isUser ? '#ffffff' : '#0C0118',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          fontSize: 13.5,
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {msg.typing ? <TypingDots /> : msg.text}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function CraveAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Show opening message when chat first opens
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: 0, role: 'ai', text: OPENING_MESSAGE }]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 220);
    }
  }, [open]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || thinking) return;
    setInput('');

    const userMsg = { id: Date.now(), role: 'user', text };
    const typingMsg = { id: Date.now() + 1, role: 'ai', typing: true };

    setMessages((prev) => [...prev, userMsg, typingMsg]);
    setThinking(true);

    const delay = 800 + Math.random() * 400;
    setTimeout(() => {
      const response = getResponse(text);
      setMessages((prev) =>
        prev.map((m) => (m.typing ? { ...m, typing: false, text: response } : m))
      );
      setThinking(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        @keyframes craveai-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes craveai-pulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 24px rgba(147,51,234,0.6), 0 0 48px rgba(147,51,234,0.3); }
          50%       { transform: scale(1.08); box-shadow: 0 0 32px rgba(147,51,234,0.8), 0 0 60px rgba(147,51,234,0.4); }
        }
        @keyframes craveai-panel-in {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes craveai-tooltip-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Floating orb ── */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9998 }}>

        {/* Tooltip */}
        {showTooltip && !open && (
          <div
            style={{
              position: 'absolute',
              bottom: 68,
              right: 0,
              whiteSpace: 'nowrap',
              background: 'rgba(12,1,24,0.88)',
              color: '#ffffff',
              fontSize: 13,
              fontWeight: 600,
              padding: '6px 14px',
              borderRadius: 20,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              animation: 'craveai-tooltip-in 180ms ease-out forwards',
              pointerEvents: 'none',
            }}
          >
            Ask CraveAI ✦
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label={open ? 'Close CraveAI' : 'Open CraveAI'}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            background: open
              ? 'radial-gradient(circle at 40% 40%, #a78bfa, #6B21A8)'
              : 'conic-gradient(from 180deg, #6B21A8, #9333EA, #C084FC, #9333EA, #6B21A8)',
            boxShadow: open
              ? '0 0 24px rgba(255,255,255,0.25), 0 0 48px rgba(147,51,234,0.4)'
              : undefined,
            animation: open ? 'none' : 'craveai-pulse 2.5s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: open ? 18 : 22,
            fontWeight: 700,
            transition: 'background 300ms',
          }}
        >
          {open ? '✕' : '✦'}
        </button>
      </div>

      {/* ── Chat panel ── */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 96,
            right: 24,
            zIndex: 9997,
            width: 'min(360px, calc(100vw - 24px))',
            maxHeight: '70vh',
            height: 520,
            background: '#ffffff',
            borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
            border: '1px solid rgba(107,33,168,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transformOrigin: 'bottom right',
            animation: 'craveai-panel-in 220ms ease-out forwards',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              height: 64,
              flexShrink: 0,
              background: 'linear-gradient(135deg, #6B21A8, #9333EA)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 180deg, #6B21A8, #C084FC, #6B21A8)',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: '#ffffff',
                }}
              >
                ✦
              </div>
              <div>
                <div style={{ color: '#ffffff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  CraveAI
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>
                  ✦ Campus Intelligence
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                cursor: 'pointer',
                color: '#ffffff',
                fontSize: 14,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {messages.map((msg) => (
              <Bubble key={msg.id} msg={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              flexShrink: 0,
              borderTop: '1px solid #E5E7EB',
              background: '#ffffff',
              padding: '10px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about CampusCrave..."
              disabled={thinking}
              style={{
                flex: 1,
                border: '1.5px solid #E5E7EB',
                borderRadius: 12,
                padding: '9px 14px',
                fontSize: 13.5,
                color: '#0C0118',
                background: '#F9FAFB',
                outline: 'none',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'border-color 150ms',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#9333EA')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#E5E7EB')}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || thinking}
              style={{
                width: 38,
                height: 38,
                flexShrink: 0,
                borderRadius: '50%',
                background: input.trim() && !thinking ? '#6B21A8' : '#E5E7EB',
                border: 'none',
                cursor: input.trim() && !thinking ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 150ms',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13"
                  stroke={input.trim() && !thinking ? '#ffffff' : '#9CA3AF'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 2L15 22L11 13L2 9L22 2Z"
                  stroke={input.trim() && !thinking ? '#ffffff' : '#9CA3AF'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
