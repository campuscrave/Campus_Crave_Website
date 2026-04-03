import { useState, useRef, useEffect } from "react";

const FAKE_RESPONSES = [
  "Hey! I can help you find the best spots on campus. What are you craving today?",
  "The Taco Station at the Student Union is super popular right now — 4.8 stars and a 10-min wait. Want me to pre-order?",
  "Based on your history, you usually go for something spicy on Thursdays. Panda Bowl has a new Szechuan option!",
  "Your dining balance is $42.30. You've got plenty for today — want some recommendations under $10?",
  "Sushi Bento just restocked their salmon rolls. They usually sell out by noon. Want a heads up next time?",
  "The quad food trucks are open until 3pm today. Best window for lunch is 12:15 — beat the rush!",
  "I found 3 places with your favorite — spicy ramen. Closest one is 4 min away. Want directions?",
];

let responseIndex = 0;

function getNextResponse() {
  const msg = FAKE_RESPONSES[responseIndex % FAKE_RESPONSES.length];
  responseIndex++;
  return msg;
}

export default function CraveAI() {
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hey! I'm Crave AI — your campus dining assistant. What are you craving today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const tooltipTimer = useRef(null);
  const messagesEnd = useRef(null);
  const inputRef = useRef(null);

  // Auto-show tooltip once on mount
  useEffect(() => {
    const t = setTimeout(() => {
      if (!open) setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  function handleMouseEnter() {
    if (open) return;
    clearTimeout(tooltipTimer.current);
    setShowTooltip(true);
  }

  function handleMouseLeave() {
    tooltipTimer.current = setTimeout(() => setShowTooltip(false), 300);
  }

  function togglePanel() {
    setShowTooltip(false);
    setOpen((v) => !v);
  }

  function sendMessage() {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: getNextResponse() },
      ]);
    }, 1000 + Math.random() * 800);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── TOOLTIP ── */}
      <div
        className={`crave-ai-tooltip ${showTooltip && !open ? "show" : ""}`}
        onMouseEnter={() => clearTimeout(tooltipTimer.current)}
        onMouseLeave={handleMouseLeave}
      >
        <span className="crave-ai-tooltip-label">✦ Crave AI</span>
        <p>Meet Crave AI — your campus dining assistant</p>
      </div>

      {/* ── CHAT PANEL ── */}
      <div className={`crave-ai-panel ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="crave-ai-header">
          <div className="crave-ai-header-info">
            <div className="crave-ai-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a2 2 0 012 2v1a7 7 0 017 7 7 7 0 01-7 7H8a4 4 0 01-4-4v-3a7 7 0 017-7V4a2 2 0 012-2z" strokeLinejoin="round" />
                <circle cx="9" cy="13" r="1" fill="white" stroke="none" />
                <circle cx="15" cy="13" r="1" fill="white" stroke="none" />
              </svg>
            </div>
            <div>
              <div className="crave-ai-name">Crave AI</div>
              <div className="crave-ai-status">
                <span className="crave-ai-dot" />
                Online
              </div>
            </div>
          </div>
          <button className="crave-ai-close" onClick={togglePanel} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="crave-ai-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`crave-ai-msg crave-ai-msg--${msg.role}`}>
              {msg.role === "ai" && (
                <div className="crave-ai-msg-avatar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a2 2 0 012 2v1a7 7 0 017 7 7 7 0 01-7 7H8a4 4 0 01-4-4v-3a7 7 0 017-7V4a2 2 0 012-2z" strokeLinejoin="round" />
                    <circle cx="9" cy="13" r="1" fill="white" stroke="none" />
                    <circle cx="15" cy="13" r="1" fill="white" stroke="none" />
                  </svg>
                </div>
              )}
              <div className="crave-ai-bubble">{msg.text}</div>
            </div>
          ))}
          {typing && (
            <div className="crave-ai-msg crave-ai-msg--ai">
              <div className="crave-ai-msg-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a2 2 0 012 2v1a7 7 0 017 7 7 7 0 01-7 7H8a4 4 0 01-4-4v-3a7 7 0 017-7V4a2 2 0 012-2z" strokeLinejoin="round" />
                  <circle cx="9" cy="13" r="1" fill="white" stroke="none" />
                  <circle cx="15" cy="13" r="1" fill="white" stroke="none" />
                </svg>
              </div>
              <div className="crave-ai-bubble crave-ai-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <div className="crave-ai-input-row">
          <input
            ref={inputRef}
            className="crave-ai-input"
            type="text"
            placeholder="Ask about food, balance, hours..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="crave-ai-send"
            onClick={sendMessage}
            disabled={!input.trim()}
            aria-label="Send"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── FLOAT BUTTON ── */}
      <button
        className={`crave-ai-float ${open ? "active" : ""}`}
        onClick={togglePanel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="Open Crave AI"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a2 2 0 012 2v1a7 7 0 017 7 7 7 0 01-7 7H8a4 4 0 01-4-4v-3a7 7 0 017-7V4a2 2 0 012-2z" strokeLinejoin="round" />
            <circle cx="9" cy="13" r="1" fill="white" stroke="none" />
            <circle cx="15" cy="13" r="1" fill="white" stroke="none" />
          </svg>
        )}
      </button>

      <style>{`
        /* ── FLOAT BUTTON ── */
        .crave-ai-float {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #6B2FA0, #8B4FC8);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 1px solid rgba(168,85,247,0.35);
          box-shadow: 0 8px 32px rgba(107,47,160,0.45), 0 0 0 0 rgba(168,85,247,0.4);
          transition: transform 0.25s, box-shadow 0.25s;
          animation: craveGlow 3s ease-in-out infinite;
        }
        .crave-ai-float:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 40px rgba(107,47,160,0.6), 0 0 24px rgba(168,85,247,0.3);
        }
        .crave-ai-float.active {
          animation: none;
          background: linear-gradient(135deg, #4A1F70, #6B2FA0);
        }
        .crave-ai-float svg { width: 22px; height: 22px; }

        @keyframes craveGlow {
          0%, 100% { box-shadow: 0 8px 32px rgba(107,47,160,0.45), 0 0 0 0 rgba(168,85,247,0.4); }
          50%       { box-shadow: 0 8px 32px rgba(107,47,160,0.45), 0 0 20px 6px rgba(168,85,247,0.2); }
        }

        /* ── TOOLTIP ── */
        .crave-ai-tooltip {
          position: fixed;
          bottom: 90px;
          right: 24px;
          z-index: 999;
          background: #12121A;
          border: 1px solid #1E1E2A;
          border-radius: 14px;
          padding: 14px 18px;
          max-width: 250px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.25s, transform 0.25s;
          pointer-events: none;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
        }
        .crave-ai-tooltip.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .crave-ai-tooltip-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #A855F7;
          margin-bottom: 6px;
          text-transform: uppercase;
        }
        .crave-ai-tooltip p { font-size: 0.82rem; color: #8888A0; line-height: 1.5; margin: 0; }

        /* ── PANEL ── */
        .crave-ai-panel {
          position: fixed;
          bottom: 90px;
          right: 24px;
          z-index: 998;
          width: 360px;
          height: 500px;
          background: #12121A;
          border: 1px solid #1E1E2A;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(168,85,247,0.08);
          opacity: 0;
          transform: translateY(16px) scale(0.97);
          pointer-events: none;
          transition: opacity 0.3s, transform 0.3s;
          transform-origin: bottom right;
        }
        .crave-ai-panel.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        /* Header */
        .crave-ai-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          border-bottom: 1px solid #1E1E2A;
          background: linear-gradient(135deg, rgba(107,47,160,0.15), rgba(139,79,200,0.08));
          flex-shrink: 0;
        }
        .crave-ai-header-info { display: flex; align-items: center; gap: 12px; }
        .crave-ai-avatar {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #6B2FA0, #8B4FC8);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(168,85,247,0.3);
        }
        .crave-ai-avatar svg { width: 18px; height: 18px; stroke: white; }
        .crave-ai-name { font-size: 0.9rem; font-weight: 700; color: #EEEEF0; letter-spacing: -0.01em; }
        .crave-ai-status { display: flex; align-items: center; gap: 5px; font-size: 0.72rem; color: #8888A0; margin-top: 2px; }
        .crave-ai-dot {
          width: 6px; height: 6px;
          background: #22C55E;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 6px rgba(34,197,94,0.6);
        }
        .crave-ai-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          border-radius: 8px;
          color: #5A5A72;
          transition: color 0.2s, background 0.2s;
          line-height: 0;
        }
        .crave-ai-close:hover { color: #EEEEF0; background: rgba(255,255,255,0.06); }
        .crave-ai-close svg { width: 16px; height: 16px; }

        /* Messages */
        .crave-ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: #3D1A5E #12121A;
        }
        .crave-ai-messages::-webkit-scrollbar { width: 4px; }
        .crave-ai-messages::-webkit-scrollbar-thumb { background: #3D1A5E; border-radius: 2px; }

        .crave-ai-msg { display: flex; align-items: flex-end; gap: 8px; }
        .crave-ai-msg--user { flex-direction: row-reverse; }

        .crave-ai-msg-avatar {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #6B2FA0, #8B4FC8);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .crave-ai-msg-avatar svg { width: 14px; height: 14px; stroke: white; }

        .crave-ai-bubble {
          max-width: 78%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 0.84rem;
          line-height: 1.55;
          word-break: break-word;
        }
        .crave-ai-msg--ai .crave-ai-bubble {
          background: #16161F;
          color: #EEEEF0;
          border: 1px solid #1E1E2A;
          border-bottom-left-radius: 4px;
        }
        .crave-ai-msg--user .crave-ai-bubble {
          background: linear-gradient(135deg, #6B2FA0, #8B4FC8);
          color: white;
          border-bottom-right-radius: 4px;
        }

        /* Typing dots */
        .crave-ai-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
        }
        .crave-ai-typing span {
          width: 6px; height: 6px;
          background: #5A5A72;
          border-radius: 50%;
          display: inline-block;
          animation: craveTyping 1.2s ease-in-out infinite;
        }
        .crave-ai-typing span:nth-child(2) { animation-delay: 0.2s; }
        .crave-ai-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes craveTyping {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }

        /* Input */
        .crave-ai-input-row {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-top: 1px solid #1E1E2A;
          background: #0E0E16;
          flex-shrink: 0;
        }
        .crave-ai-input {
          flex: 1;
          background: #16161F;
          border: 1px solid #1E1E2A;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.84rem;
          color: #EEEEF0;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .crave-ai-input::placeholder { color: #5A5A72; }
        .crave-ai-input:focus {
          border-color: rgba(168,85,247,0.5);
          box-shadow: 0 0 0 3px rgba(107,47,160,0.15);
        }
        .crave-ai-send {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #6B2FA0, #8B4FC8);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s;
        }
        .crave-ai-send:disabled { opacity: 0.35; cursor: not-allowed; }
        .crave-ai-send:not(:disabled):hover { transform: scale(1.05); }
        .crave-ai-send svg { width: 16px; height: 16px; stroke: white; }

        @media (max-width: 480px) {
          .crave-ai-panel { width: calc(100vw - 32px); right: 16px; bottom: 84px; }
          .crave-ai-float { right: 16px; bottom: 16px; }
          .crave-ai-tooltip { right: 16px; }
        }
      `}</style>
    </>
  );
}
