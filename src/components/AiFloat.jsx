import { useState, useEffect, useRef } from 'react'

export default function AiFloat() {
  const [showTooltip, setShowTooltip] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 3000)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current)
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(false), 300)
  }

  return (
    <>
      <div
        className="ai-float"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg viewBox="0 0 24 24">
          <path
            d="M12 2a2 2 0 012 2v1a7 7 0 017 7v0a7 7 0 01-7 7H8a4 4 0 01-4-4v-3a7 7 0 017-7h0V4a2 2 0 012-2z"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="13" r="1" fill="white" />
          <circle cx="15" cy="13" r="1" fill="white" />
        </svg>
      </div>

      <div
        className={`ai-tooltip${showTooltip ? ' show' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h4>Meet Crave AI</h4>
        <p>Your campus dining assistant. Ask about restaurants, check your balance, or get personalized recommendations.</p>
        <div className="coming">Coming Soon</div>
      </div>
    </>
  )
}
