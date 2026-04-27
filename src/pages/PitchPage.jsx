import { useEffect, useMemo, useRef, useState } from 'react'
import './pitch.css'
import SwipeButton from '../components/SwipeButton'

/**
 * /pitch — CampusCrave interactive investor demo.
 *
 * Desktop-first. Left column is pitch copy, right column is a floating
 * phone that walks through: Splash → Login → Home → Restaurant →
 * Cart → Tracking (6-min timer) → Ready.
 *
 * Copy/data is grounded in the real codebase:
 *   - Restaurant: Green Lemon (see backend/prisma/seed.ts)
 *   - Menu items: Locos Nachos, Chicken & Brussels Fiesta Bowl,
 *     Guacamole, Trio Dip (all from the real Green Lemon seed)
 *   - University: University of Tampa (src/config/demo.ts)
 *   - Dining Dollars / Crave Dollars payment rails (real product)
 *   - Pickup flow (matches real app: PickupReadyScreen + OrderStatusScreen)
 */

const PAGES = ['splash', 'login', 'home', 'rest', 'cart', 'track', 'ready']

// Restaurants — mirrors the Expo Merchant model:
//   { id, name, description, cuisine?, location?, rating?, eta?, imageUrl: string | null }
// Demo data only; no backend dependency.
const RESTAURANTS = [
  {
    id: 'campus-crave-cafe',
    name: 'Campus Crave Café',
    description: 'Fresh-baked brownies, cookies, and cold drinks on campus.',
    cuisine: 'Bakery · Drinks',
    location: 'On campus',
    rating: 4.9,
    reviews: 1284,
    eta: '5–10 MIN',
    priceLevel: '$',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85&auto=format&fit=crop',
    tags: ['MOST POPULAR', '5% STUDENT DEAL', 'SPARTAN $'],
    fallbackBg: 'linear-gradient(135deg,#fef3c7 0%,#fbbf24 55%,#f59e0b 100%)',
    available: true,
  },
  {
    id: 'spartan-grill',
    name: 'Spartan Grill',
    description: 'Smashed burgers, loaded wraps, and crispy fries. Grilled to order.',
    cuisine: 'Burgers · Wraps',
    location: 'Plant B',
    rating: 4.7,
    reviews: 892,
    eta: '10–15 MIN',
    priceLevel: '$$',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=85&auto=format&fit=crop',
    tags: ['DINING DOLLARS', 'SPARTAN $'],
    fallbackBg: 'linear-gradient(135deg,#fff7ed 0%,#fed7aa 55%,#fb923c 100%)',
    comingSoonMsg: 'Spartan Grill is launching this semester — stay tuned!',
  },
  {
    id: 'minaret-market',
    name: 'Minaret Market',
    description: 'Drinks, snacks, school supplies, and essentials — all on campus.',
    cuisine: 'Convenience',
    location: 'Sykes Hall',
    rating: 4.5,
    reviews: 641,
    eta: '5–8 MIN',
    priceLevel: '$',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&q=85&auto=format&fit=crop',
    tags: ['CRAVE $', 'SPARTAN $'],
    fallbackBg: 'linear-gradient(135deg,#ecfdf5 0%,#a7f3d0 55%,#10b981 100%)',
    comingSoonMsg: 'Minaret Market is coming to CampusCrave this fall!',
  },
  {
    id: 'riverwalk-smoothies',
    name: 'Riverwalk Smoothies',
    description: 'Tropical blends, protein bowls, and cold-pressed juices.',
    cuisine: 'Smoothies · Bowls',
    location: 'Riverside',
    rating: 4.8,
    reviews: 1107,
    eta: '8–12 MIN',
    priceLevel: '$$',
    imageUrl: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=1200&q=85&auto=format&fit=crop',
    tags: ['SPARTAN $', 'MEAL PLAN'],
    fallbackBg: 'linear-gradient(135deg,#eff6ff 0%,#bfdbfe 55%,#3b82f6 100%)',
    comingSoonMsg: 'Riverwalk Smoothies is launching on CampusCrave soon!',
  },
]

const ACTIVE_RESTAURANT = RESTAURANTS.find((r) => r.id === 'campus-crave-cafe')

// Menu items — mirrors the Expo MenuItem model:
//   { id, restaurantId?, name, description, price, imageUrl: string | null }
// fallbackBg/fallbackEmoji are only used if imageUrl is null or fails to load.
const DISHES = [
  {
    id: 'brownie',
    restaurantId: 'campus-crave-cafe',
    name: 'Brownie',
    description: 'Rich chocolate brownie baked fresh on campus.',
    price: 4.50,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=85&auto=format&fit=crop',
    tag: 'BESTSELLER',
    featured: true,
    category: ['Popular', 'Bakery'],
    fallbackBg: 'linear-gradient(135deg, #3b1a08 0%, #7c3a10 55%, #a0522d 100%)',
    fallbackEmoji: '🍫',
  },
  {
    id: 'choc-chip-cookies',
    restaurantId: 'campus-crave-cafe',
    name: 'Chocolate Chip Cookies',
    description: 'Warm chocolate chip cookies, soft and sweet.',
    price: 3.75,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=85&auto=format&fit=crop',
    tag: 'CAMPUS FAVORITE',
    featured: true,
    category: ['Popular', 'Bakery'],
    fallbackBg: 'linear-gradient(135deg, #7c4a1e 0%, #c47a3a 55%, #d4915a 100%)',
    fallbackEmoji: '🍪',
  },
  {
    id: 'water',
    restaurantId: 'campus-crave-cafe',
    name: 'Water',
    description: 'Cold bottled water.',
    price: 2.00,
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=85&auto=format&fit=crop',
    category: ['Popular', 'Drinks'],
    fallbackBg: 'linear-gradient(135deg, #0369a1 0%, #0ea5e9 55%, #bae6fd 100%)',
    fallbackEmoji: '💧',
  },
]

const TIMER_SECONDS = 360
const TIMER_CIRC = 2 * Math.PI * 110 // ≈ 691
const SPARTAN_BALANCE = 200

// FAIL-SAFE: investor demo pre-loaded cart. The /pitch demo initializes
// cartItems with this so the presenter can reach checkout without having
// to click any menu items. Item clicks still work — this is just a safety
// net so the live demo never stalls on an empty cart.
const DEMO_CART_ITEMS = [
  {
    id: 'brownie',
    name: 'Brownie',
    description: 'Rich chocolate brownie baked fresh on campus.',
    price: 4.50,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=85&auto=format&fit=crop',
    quantity: 5,
  },
  {
    id: 'choc-chip-cookies',
    name: 'Chocolate Chip Cookies',
    description: 'Warm chocolate chip cookies, soft and sweet.',
    price: 3.75,
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=85&auto=format&fit=crop',
    quantity: 4,
  },
  {
    id: 'water',
    name: 'Water',
    description: 'Cold bottled water.',
    price: 2.00,
    imageUrl: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=85&auto=format&fit=crop',
    quantity: 2,
  },
]

export default function PitchPage({ introVisible = false }) {
  const [page, setPage] = useState('splash')
  // Pre-loaded with DEMO_CART_ITEMS — see fail-safe note above.
  const [cartItems, setCartItems] = useState(DEMO_CART_ITEMS)
  const [remain, setRemain] = useState(TIMER_SECONDS)
  const [clock, setClock] = useState(() => formatClock())
  const [menuTab, setMenuTab] = useState('Popular')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [toast, setToast] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('spartan')
  const [targetEndTime, setTargetEndTime] = useState(null)
  const [alarmActive, setAlarmActive] = useState(false)

  const phoneRef = useRef(null)
  const rightRef = useRef(null)
  const timerIntervalRef = useRef(null)
  const toastTimerRef = useRef(null)
  const audioCtxRef = useRef(null)
  const alarmGainRef = useRef(null)
  const alarmTriggeredRef = useRef(false)

  // Fullscreen support
  useEffect(() => {
    const onFs = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.()
    } else {
      document.documentElement.requestFullscreen?.()
    }
  }

  // Lock body scroll while pitch is mounted
  useEffect(() => {
    document.body.classList.add('cc-pitch-open')
    return () => document.body.classList.remove('cc-pitch-open')
  }, [])

  // Status bar clock
  useEffect(() => {
    const id = setInterval(() => setClock(formatClock()), 30000)
    return () => clearInterval(id)
  }, [])

  // FAIL-SAFE: if the cart somehow ends up empty before the order is placed
  // (e.g. presenter accidentally decrements all items), restore the demo
  // cart so checkout never shows the empty state.
  useEffect(() => {
    if (cartItems.length === 0 && page !== 'track' && page !== 'ready') {
      setCartItems(DEMO_CART_ITEMS)
    }
  }, [cartItems.length, page])

  // Keyboard nav — suspended while the DoorDash intro overlay is visible
  // so a single SPACE doesn't simultaneously dismiss the intro AND advance
  // the demo from splash → login.
  useEffect(() => {
    if (introVisible) return
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault()
        const i = PAGES.indexOf(page)
        const next = PAGES[Math.min(PAGES.length - 1, i + 1)]
        // Cart → Track must go through handleOrderPlaced to start the timer
        if (page === 'cart' && next === 'track') {
          if (cartCount > 0) handleOrderPlaced()
        } else {
          goto(next)
        }
      } else if (e.key === 'ArrowLeft') {
        const i = PAGES.indexOf(page)
        goto(PAGES[Math.max(0, i - 1)])
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, introVisible]) // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown — wall-clock based so background tabs don't drift or pause
  useEffect(() => {
    if (page !== 'track' || !targetEndTime) {
      stopTimer()
      alarmTriggeredRef.current = false
      return
    }

    function tick() {
      const ms = targetEndTime - Date.now()
      const secs = Math.max(0, Math.ceil(ms / 1000))
      setRemain(secs)
      if (secs <= 0 && !alarmTriggeredRef.current) {
        alarmTriggeredRef.current = true
        stopTimer()
        startAlarm()
        setAlarmActive(true)
        setTimeout(() => setPage('ready'), 400)
      }
    }

    // Re-sync immediately when the tab becomes visible again
    const onVisible = () => { if (document.visibilityState === 'visible') tick() }
    const onFocus = () => tick()
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onFocus)

    tick()
    timerIntervalRef.current = setInterval(tick, 500)

    return () => {
      stopTimer()
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onFocus)
    }
  }, [page, targetEndTime]) // eslint-disable-line react-hooks/exhaustive-deps

  // Phone tilt parallax (scale kept in sync with .phone initial transform so size stays fixed)
  useEffect(() => {
    const right = rightRef.current
    const phone = phoneRef.current
    if (!right || !phone) return
    const onMove = (e) => {
      const r = right.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) - 0.5
      const y = ((e.clientY - r.top) / r.height) - 0.5
      phone.style.transform =
        `rotateY(${-12 + x * 10}deg) rotateX(${4 - y * 8}deg) rotateZ(${-1.5 + x * 2}deg) scale(var(--phone-scale, 0.78))`
    }
    const onLeave = () => { phone.style.transform = '' }
    right.addEventListener('mousemove', onMove)
    right.addEventListener('mouseleave', onLeave)
    return () => {
      right.removeEventListener('mousemove', onMove)
      right.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  function stopTimer() {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current)
      timerIntervalRef.current = null
    }
  }

  function unlockAudio() {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume()
      // Silent buffer — primes the pipeline so the later alarm is allowed
      const buf = audioCtxRef.current.createBuffer(1, 1, 22050)
      const src = audioCtxRef.current.createBufferSource()
      src.buffer = buf
      src.connect(audioCtxRef.current.destination)
      src.start()
    } catch (_) {}
  }

  function startAlarm() {
    const ctx = audioCtxRef.current
    if (!ctx) return
    try {
      if (ctx.state === 'suspended') ctx.resume()
      const master = ctx.createGain()
      master.gain.value = 0.8
      master.connect(ctx.destination)
      alarmGainRef.current = master

      // 7 groups × 3 beeps ≈ 10 s of alarm
      const beepDur = 0.18
      const beepGap = 0.10
      const groupGap = 0.85
      let t = ctx.currentTime + 0.05

      for (let g = 0; g < 7; g++) {
        for (let b = 0; b < 3; b++) {
          const osc = ctx.createOscillator()
          const env = ctx.createGain()
          osc.type = 'square'
          osc.frequency.value = b < 2 ? 880 : 1047 // A5 → C6 for urgency
          env.gain.setValueAtTime(0, t)
          env.gain.linearRampToValueAtTime(0.9, t + 0.01)
          env.gain.setValueAtTime(0.9, t + beepDur - 0.02)
          env.gain.linearRampToValueAtTime(0, t + beepDur)
          osc.connect(env)
          env.connect(master)
          osc.start(t)
          osc.stop(t + beepDur + 0.01)
          t += beepDur + beepGap
        }
        t += groupGap
      }
    } catch (_) {}
  }

  function stopAlarm() {
    try {
      if (alarmGainRef.current) {
        const now = audioCtxRef.current?.currentTime ?? 0
        alarmGainRef.current.gain.cancelScheduledValues(now)
        alarmGainRef.current.gain.setValueAtTime(0, now)
        alarmGainRef.current.disconnect()
        alarmGainRef.current = null
      }
    } catch (_) {}
    setAlarmActive(false)
  }

  function goto(name) {
    if (name === page) return
    setPage(name)
  }

  // Called by SwipeButton — must run inside the pointer-event handler so AudioContext
  // creation counts as a user gesture and isn't blocked by autoplay policy.
  function handleOrderPlaced() {
    unlockAudio()
    const end = Date.now() + TIMER_SECONDS * 1000
    setTargetEndTime(end)
    localStorage.setItem('cc_order_end', String(end))
    goto('track')
  }

  function reset() {
    stopAlarm()
    setCartItems([])
    setPage('splash')
    setPaymentMethod('spartan')
    setTargetEndTime(null)
    setRemain(TIMER_SECONDS)
    localStorage.removeItem('cc_order_end')
    alarmTriggeredRef.current = false
  }

  function showToast(msg) {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    setToast(msg)
    toastTimerRef.current = setTimeout(() => setToast(null), 2500)
  }

  // Single source of truth for cart state. Cart items carry their own
  // name/price/imageUrl so the checkout never has to look them up.
  function addToCart(item) {
    setCartItems((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      }
      return [...prev, {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl ?? null,
        quantity: 1,
      }]
    })
  }

  function incrementItem(itemId) {
    setCartItems((prev) => prev.map((c) =>
      c.id === itemId ? { ...c, quantity: c.quantity + 1 } : c
    ))
  }

  function decrementItem(itemId) {
    setCartItems((prev) => prev
      .map((c) => c.id === itemId
        ? { ...c, quantity: Math.max(0, c.quantity - 1) }
        : c)
      .filter((c) => c.quantity > 0)
    )
  }

  // eslint-disable-next-line no-unused-vars
  function removeItem(itemId) {
    setCartItems((prev) => prev.filter((c) => c.id !== itemId))
  }

  function getItemQuantity(itemId) {
    return cartItems.find((c) => c.id === itemId)?.quantity ?? 0
  }

  function getCartTotal() {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  // Enrich cart items with the matching DISH definition for thumbnail bg/emoji.
  // Display-only join — does not duplicate cart state.
  const cartDetailed = useMemo(() =>
    cartItems.map((item) => ({
      ...item,
      dish: DISHES.find((d) => d.id === item.id),
    })).filter((c) => c.dish)
  , [cartItems])

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08 // project rule: 8% tax at checkout
  const studentDeal = subtotal > 0 ? -subtotal * 0.05 : 0 // 5% Student Deal
  const total = Math.max(0, subtotal + tax + studentDeal)
  const hasFunds = total <= SPARTAN_BALANCE

  const cartCount = cartItems.reduce((s, item) => s + item.quantity, 0)

  // Timer render
  const timerText = `${Math.floor(remain / 60)}:${String(remain % 60).padStart(2, '0')}`
  const timerDash = TIMER_CIRC * (1 - remain / TIMER_SECONDS)

  return (
    <div className="cc-pitch" onDoubleClick={toggleFullscreen}>
      <div className="stage">
        <div className="beam a" />
        <div className="beam b" />

        {/* TOP CHROME */}
        <div className="topbar">
          <div className="brandmark">
            <div className="icon"><img src="/APP logo.jpeg" alt="" /></div>
            <div className="wm">CAMPUS<span>•</span>CRAVE</div>
          </div>
          <div className="meta">
            <div className="live"><span className="dot" />LIVE DEMO</div>
            <div>UNIVERSITY TAMPA</div>
            <div>FALL 2026 PILOT</div>
            <button
              className="fs-btn"
              onClick={(e) => { e.stopPropagation(); toggleFullscreen() }}
              title="Fullscreen (F / double-click)"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v4h4M6 14v-4H2M14 6h-4V2M2 10h4v4" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          {/* PHONE */}
          <div className="right" ref={rightRef}>
            <div className="phone-scene">
              <div className="glow-floor" />
              <div className="phone" ref={phoneRef}>
                <div className="screen">
                  <div className="island" />
                  <div className="statusbar">
                    <span>{clock}</span>
                    <span className="r">
                      <svg className="ico" viewBox="0 0 16 16" fill="currentColor"><path d="M1 9l2-1 2 1v3H1z" /><path d="M6 7l2-1 2 1v5H6z" /><path d="M11 5l2-1 2 1v7h-4z" /></svg>
                      <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 6.5c4-4 10-4 14 0" /><path d="M4.5 9c2.5-2.5 5.5-2.5 8 0" /><circle cx="8" cy="11.5" r="1" fill="currentColor" /></svg>
                      <svg className="ico" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1"><rect x="1" y="3" width="18" height="10" rx="2" /><rect x="3" y="5" width="14" height="6" rx="1" fill="currentColor" /><rect x="20" y="6" width="1.5" height="4" rx=".5" fill="currentColor" /></svg>
                    </span>
                  </div>

                  <div className="pages">
                    {/* 1 SPLASH */}
                    <div className={`page splash ${page === 'splash' ? 'active' : ''}`}>
                      <div className="splash-logo" onClick={() => goto('login')}>
                        <img src="/APP logo.jpeg" alt="" />
                      </div>
                      <div className="wordmark">Campus<em>Crave</em></div>
                      <div className="tap">tap logo to enter</div>
                    </div>

                    {/* 2 LOGIN */}
                    <div className={`page login ${page === 'login' ? 'active' : ''}`}>
                      <div className="crown"><img src="/APP logo.jpeg" alt="" /></div>
                      <h2>Welcome back, <em>Matías.</em></h2>
                      <p className="sub">Sign in with your University of Tampa account</p>
                      <div className="field">
                        <label>.edu email</label>
                        <div className="input">
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1.5" y="3.5" width="13" height="9" rx="1.5" /><path d="M1.5 4.5l6.5 4.5 6.5-4.5" /></svg>
                          <span className="val">matias.gil@tampa.edu</span>
                        </div>
                      </div>
                      <div className="field">
                        <label>Password</label>
                        <div className="input">
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2.5" y="7" width="11" height="7" rx="1.5" /><path d="M5 7V5a3 3 0 1 1 6 0v2" /></svg>
                          <span className="val dim">•••••••••••</span>
                        </div>
                      </div>
                      <button className="login-btn" onClick={() => goto('home')}>
                        Continue
                        <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                      </button>
                      <div className="sso">
                        <div className="s">
                          <svg className="ico" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1L1 4v4c0 3.5 3 6.5 7 7 4-.5 7-3.5 7-7V4z" /></svg>
                          UT SSO
                        </div>
                        <div className="s">
                          <svg className="ico" viewBox="0 0 16 16" fill="currentColor"><path d="M11.5 8.5c0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.2-2.2-1.2-1-.1-1.9.5-2.4.5-.5 0-1.3-.5-2.1-.5-1.1 0-2.1.6-2.7 1.6-1.1 2-.3 4.8.8 6.4.5.8 1.2 1.7 2 1.6.8 0 1.1-.5 2.1-.5s1.3.5 2.1.5 1.4-.8 2-1.6c.6-.9.8-1.7.9-1.8-.1 0-1.7-.6-1.7-2.7zM10 3.5c.5-.5.8-1.3.7-2-.7 0-1.5.4-2 1-.4.5-.8 1.3-.7 2 .8.1 1.6-.4 2-1z" /></svg>
                          Apple
                        </div>
                      </div>
                      <div className="foot">By continuing you agree to <b>Terms</b> &amp; <b>Privacy</b>.</div>
                    </div>

                    {/* 3 HOME */}
                    <div className={`page home ${page === 'home' ? 'active' : ''}`}>
                      <div className="home-scroll">
                        <div className="home-head">
                          <div>
                            <div className="hello">GOOD AFTERNOON</div>
                            <div className="name">Hey, <em>Matías</em> 👋</div>
                          </div>
                          <div className="av"><img src="/Matias.jpeg" alt="" /></div>
                        </div>
                        <div className="loc">
                          <span className="p">◉</span>
                          Pickup at
                          <b>&nbsp;University of Tampa</b>
                          <span style={{ marginLeft: 'auto', color: 'var(--violet-300)' }}>›</span>
                        </div>
                        <div className="search">
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg>
                          Search cookies, coffee, snacks...
                        </div>

                        <div className="hero-card">
                          <div className="lbl">★ STUDENT DEAL · CAMPUS CRAVE CAFÉ</div>
                          <div className="tt">5% off, <em>every order.</em></div>
                          <div className="pill">Tap to apply →</div>
                        </div>

                        <div className="cats">
                          <div className="cat on">🔥 All</div>
                          <div className="cat">🍪 Bakery</div>
                          <div className="cat">☕ Coffee</div>
                          <div className="cat">🥗 Bowls</div>
                          <div className="cat">🌮 Tacos</div>
                          <div className="cat">🍔 Burgers</div>
                        </div>

                        <div className="section-h">
                          <h3>Open near you</h3>
                          <div className="all">SEE ALL →</div>
                        </div>

                        {RESTAURANTS.map((r) => (
                          <RestaurantCard
                            key={r.id}
                            restaurant={r}
                            onClick={r.available
                              ? () => goto('rest')
                              : () => showToast(r.comingSoonMsg)}
                          />
                        ))}
                      </div>
                      <div className="tabbar">
                        <div className="ti on"><svg className="ico" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l7 6v8h-5v-5H6v5H1V7z" /></svg></div>
                        <div className="ti"><svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg></div>
                        <div className="ti"><svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 5h12l-1 9H3z" /><path d="M5 5V4a3 3 0 1 1 6 0v1" /></svg></div>
                        <div className="ti"><svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="5" r="3" /><path d="M2 14c0-3 3-5 6-5s6 2 6 5" /></svg></div>
                      </div>
                      {toast && page === 'home' && (
                        <div className="cc-toast">
                          <span>🚀</span>
                          <span>{toast}</span>
                        </div>
                      )}
                    </div>

                    {/* 4 RESTAURANT */}
                    <div className={`page rest ${page === 'rest' ? 'active' : ''}`}>
                      <div className="rest-scroll">
                        <div className="cover photo">
                          <ImageWithFallback
                            src={ACTIVE_RESTAURANT?.imageUrl}
                            alt={ACTIVE_RESTAURANT?.name}
                            fallbackBg={ACTIVE_RESTAURANT?.fallbackBg}
                          />
                          <button className="back" onClick={() => goto('home')}>
                            <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M10 3L5 8l5 5" /></svg>
                          </button>
                          <button className="share">
                            <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2v10M4 6l4-4 4 4M3 13h10" /></svg>
                          </button>
                        </div>
                        <div className="rest-head">
                          <div className="chip"><span className="d" />OPEN · PICKUP NOW</div>
                          <h2>Campus Crave <em>Café</em></h2>
                          <div className="tagline">
                            The student-run café on campus. Fresh-baked brownies,
                            cookies, and cold drinks between classes.
                          </div>
                          <div className="rest-stats">
                            <div className="rs"><span className="i">★</span><b>4.9</b><span>(1,284)</span></div>
                            <div className="rs"><span className="i">⏱</span><b>5–10</b><span>min</span></div>
                            <div className="rs"><span className="i">◉</span><b>On</b><span>campus</span></div>
                          </div>
                        </div>
                        <div className="menu-tabs">
                          {['Popular', 'Bakery', 'Drinks'].map((t) => (
                            <div
                              key={t}
                              className={`mt ${menuTab === t ? 'on' : ''}`}
                              onClick={() => setMenuTab(t)}
                            >{t}</div>
                          ))}
                        </div>
                        <div className="menu">
                          {DISHES.filter((d) => (d.category || []).includes(menuTab)).map((d) => (
                            <Dish
                              key={d.id}
                              dish={d}
                              qty={getItemQuantity(d.id)}
                              onAdd={() => addToCart(d)}
                              onIncrease={() => incrementItem(d.id)}
                              onDecrease={() => decrementItem(d.id)}
                            />
                          ))}
                        </div>
                      </div>

                      {cartCount > 0 && (
                        <div className="cart-bar" onClick={() => goto('cart')}>
                          <div className="cl">
                            <div className="n">{cartCount}</div>
                            {cartCount === 1
                              ? `Cart · ${cartItems[0]?.name ?? ''}`
                              : `Cart · ${cartCount} items`}
                          </div>
                          <div className="cr">${subtotal.toFixed(2)} <span>›</span></div>
                        </div>
                      )}
                    </div>

                    {/* 5 CART */}
                    <div className={`page cart ${page === 'cart' ? 'active' : ''}`}>
                      <div className="ch">
                        <div className="ttl">Your <em style={{ fontStyle: 'italic', color: 'var(--violet-300)' }}>order</em></div>
                        <button className="x" onClick={() => goto('rest')}>✕</button>
                      </div>
                      <div className="addr">
                        <span className="p">◉</span>
                        <div>
                          <b>Deliver to — University of Tampa</b>
                          Entrepreneurship Center · ~6 min
                        </div>
                      </div>
                      {cartDetailed.length === 0 ? (
                        <div className="cart-empty">
                          <div className="ce-icon">🛒</div>
                          <div className="ce-msg">Nothing here yet — add items from the menu.</div>
                          <button className="ce-btn" onClick={() => goto('rest')}>Browse Campus Crave Café →</button>
                        </div>
                      ) : (
                        <>
                          {cartDetailed.map((c) => (
                            <div className="cartitem" key={c.id}>
                              <div className="ct">
                                <ImageWithFallback
                                  src={c.dish.imageUrl}
                                  alt={c.name}
                                  fallbackBg={c.dish.fallbackBg}
                                  fallbackEmoji={c.dish.fallbackEmoji}
                                  emojiSize={20}
                                />
                              </div>
                              <div className="cm">
                                <h5>{c.name}</h5>
                                <div className="p">${c.price.toFixed(2)}</div>
                              </div>
                              <div className="qt">
                                <div className="q" onClick={() => decrementItem(c.id)}>−</div>
                                <div className="n">{c.quantity}</div>
                                <div className="q" onClick={() => incrementItem(c.id)}>+</div>
                              </div>
                            </div>
                          ))}
                          <div className="totals">
                            <div className="trow"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="trow">
                              <span>5% student deal <span style={{ color: '#22d3a8', fontSize: 10 }}>· APPLIED</span></span>
                              <span>-${Math.abs(studentDeal).toFixed(2)}</span>
                            </div>
                            <div className="trow"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                            <div className="trow tot"><span>Total</span><span className="v">${total.toFixed(2)}</span></div>
                          </div>
                        </>
                      )}

                      {/* Payment method selector */}
                      <div className="pay-section">
                        <div className="pay-label">Payment</div>
                        <div className="pay-opts">
                          <button
                            className={`pay-opt${paymentMethod === 'spartan' ? ' sel' : ''}`}
                            onClick={() => setPaymentMethod('spartan')}
                          >
                            <span className="pay-icon">🎓</span>
                            <span className="pay-name">Spartan Dollars</span>
                            {paymentMethod === 'spartan' && <span className="pay-check">✓</span>}
                          </button>
                          <button
                            className={`pay-opt${paymentMethod === 'card' ? ' sel' : ''}`}
                            onClick={() => setPaymentMethod('card')}
                          >
                            <span className="pay-icon">💳</span>
                            <span className="pay-name">Credit / Debit</span>
                            {paymentMethod === 'card' && <span className="pay-check">✓</span>}
                          </button>
                        </div>
                        {paymentMethod === 'spartan' && (
                          <div className="pay-balance">
                            <div className="pay-bal-row">
                              <span>Spartan Dollars Balance</span>
                              <span className="pay-bal-amt">${SPARTAN_BALANCE.toFixed(2)}</span>
                            </div>
                            {hasFunds
                              ? <div className="pay-ok">✓ Balance available</div>
                              : <div className="pay-err">Insufficient Spartan Dollars balance</div>
                            }
                          </div>
                        )}
                      </div>

                      {(() => {
                        // Order button gating — matches the spec exactly.
                        const cartTotal = getCartTotal()
                        const hasItems = cartItems.length > 0 && cartTotal > 0
                        const hasSelectedPayment = paymentMethod === 'spartan'
                        const hasEnoughBalance = SPARTAN_BALANCE >= total
                        const canPlaceOrder = hasItems && hasSelectedPayment && hasEnoughBalance
                        return (
                          <div className="slide-wrap">
                            <SwipeButton
                              label={hasItems
                                ? `Place Order · Spartan Dollars`
                                : 'Add items to place an order'}
                              onSuccess={handleOrderPlaced}
                              disabled={!canPlaceOrder}
                            />
                          </div>
                        )
                      })()}
                      <div className="eta">DELIVERY ETA · <b>6 MIN</b> · ENTREPRENEURSHIP CENTER</div>
                    </div>

                    {/* 6 TRACK */}
                    <div className={`page track ${page === 'track' ? 'active' : ''}`}>
                      <div className="ord">ORDER · #CC-2487</div>
                      <h2>Your order is <em>on its way.</em></h2>
                      <div className="sub">Order confirmed. Heading to the<br />Entrepreneurship Center.</div>

                      <div className="timer-wrap">
                        <svg className="tring" viewBox="0 0 240 240">
                          <defs>
                            <linearGradient id="cc-gg" x1="0" y1="0" x2="1" y2="1">
                              <stop offset="0%" stopColor="#c084fc" />
                              <stop offset="100%" stopColor="#6B21A8" />
                            </linearGradient>
                          </defs>
                          <circle className="tr-bg" cx="120" cy="120" r="110" />
                          <circle
                            className="tr-fg"
                            cx="120" cy="120" r="110"
                            style={{ strokeDashoffset: timerDash }}
                          />
                        </svg>
                        <div className="glow" />
                        <div className="tcore">
                          <div className="n">{timerText}</div>
                          <div className="lb">MIN · SEC</div>
                          <div className="eta2">● ORDER LIVE</div>
                        </div>
                      </div>

                      <div className="steps">
                        <div className="s done"><div className="d">✓</div><div className="t">Confirmed</div></div>
                        <div className="s active"><div className="d">●</div><div className="t">Preparing</div></div>
                        <div className="s"><div className="d">3</div><div className="t">En Route</div></div>
                        <div className="s"><div className="d">4</div><div className="t">Delivered</div></div>
                      </div>

                      <div className="courier">
                        <div className="ph">CC</div>
                        <div className="info2">
                          <div className="ln1">Courier heading to you</div>
                          <div className="ln2">Entrepreneurship Center · ETA 6 min</div>
                        </div>
                        <div className="ic">
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3.5 2.5l2 1 1 3-2 1c1 2 2 3 4 4l1-2 3 1 1 2c-.5 1.5-2 2-3 2-5 0-9-4-9-9 0-1 .5-2.5 2-3z" /></svg>
                        </div>
                      </div>
                      <div className="tab-note">Timer running — you can switch tabs.</div>
                    </div>

                    {/* 7 COMPLETE */}
                    <div className={`page success ${page === 'ready' ? 'active' : ''}`}>
                      <div className="check">
                        <svg viewBox="0 0 60 60" fill="none" stroke="#0a0318" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 31l9 9 19-21" />
                        </svg>
                      </div>
                      <div className="lbl2">ORDER COMPLETE</div>
                      <h2>Delivered to <em>Entrepreneurship Center.</em></h2>
                      <div className="msg">
                        Your order from <b>Campus Crave Café</b> has arrived.
                        Thanks for using CampusCrave, Matías.
                      </div>
                      <div className="pcard">
                        <div className="pin">
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 15s5-4 5-9a5 5 0 0 0-10 0c0 5 5 9 5 9z" /><circle cx="8" cy="6" r="2" /></svg>
                        </div>
                        <div className="pt">
                          <div className="a">Delivered to</div>
                          <div className="b">University of Tampa · Entrepreneurship Center</div>
                        </div>
                      </div>
                      <div className="pcard" style={{ marginTop: 10 }}>
                        <div className="pin" style={{ background: 'rgba(168,85,247,.15)', color: 'var(--violet-500)' }}>
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="1" y="5" width="14" height="9" rx="1.5" /><path d="M4 5V4a4 4 0 0 1 8 0v1" /><circle cx="8" cy="9.5" r="1.5" fill="currentColor" stroke="none" /></svg>
                        </div>
                        <div className="pt">
                          <div className="a">Paid with</div>
                          <div className="b">{paymentMethod === 'spartan' ? 'Spartan Dollars' : 'Credit / Debit Card'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {alarmActive && (
          <button className="stop-alarm" onClick={stopAlarm}>
            🔔 Stop Alarm
          </button>
        )}

        <div className="sig">Campus Crave Corp.</div>
      </div>
    </div>
  )
}

// Reusable remote-image renderer. Mirrors the Expo app's
// <Image source={{ uri: imageUrl }} /> pattern but for the web.
// If src is null/missing or the network image fails, renders a
// neutral gradient + optional emoji block. Never crashes.
function ImageWithFallback({ src, alt, fallbackBg, fallbackEmoji, emojiSize = 24 }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="img-fallback" style={{
        background: fallbackBg || 'linear-gradient(135deg,#2a1248,#6B21A8)',
      }}>
        {fallbackEmoji && (
          <span style={{
            fontSize: emojiSize,
            filter: 'drop-shadow(0 1px 3px rgba(0,0,0,.45))',
          }}>{fallbackEmoji}</span>
        )}
      </div>
    )
  }
  return (
    <img
      src={src}
      alt={alt || ''}
      onError={() => setFailed(true)}
      loading="lazy"
      className="remote-img"
    />
  )
}

function RestaurantCard({ restaurant, onClick }) {
  return (
    <div className="rest-card" onClick={onClick}>
      <div className="pic">
        <ImageWithFallback
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fallbackBg={restaurant.fallbackBg}
        />
        <div className="badge">
          {restaurant.available && <span className="live-dot" />}
          OPEN · {restaurant.eta}
        </div>
        {restaurant.available && (
          <div className="fav">
            <svg className="ico" viewBox="0 0 16 16" fill="#fff"><path d="M8 14S2 10 2 5.5 5 1 8 3.5 14 1 14 5.5 8 14 8 14z" /></svg>
          </div>
        )}
      </div>
      <div className="info">
        <div className="rname">
          <h4>{restaurant.name}</h4>
          <div className="star">★ {restaurant.rating} · {restaurant.reviews.toLocaleString()}</div>
        </div>
        <div className="rest-desc">{restaurant.description}</div>
        <div className="meta-line">
          <span>{restaurant.cuisine}</span>
          <span className="dot">·</span>
          <span>{restaurant.priceLevel}</span>
          <span className="dot">·</span>
          <span>{restaurant.location}</span>
        </div>
        <div className="tags">
          {restaurant.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </div>
  )
}

function Dish({ dish, qty, onAdd, onIncrease, onDecrease }) {
  // Whole row is clickable — much more reliable than the small +/− button.
  // The +/− buttons inside use stopPropagation so they don't double-fire.
  // role="button" on the row helps ensure the click target is unambiguous.
  return (
    <div
      className={`dish ${dish.featured ? 'hot' : ''}`}
      onClick={onAdd}
      role="button"
    >
      <div className="thumb">
        <ImageWithFallback
          src={dish.imageUrl}
          alt={dish.name}
          fallbackBg={dish.fallbackBg}
          fallbackEmoji={dish.fallbackEmoji}
          emojiSize={30}
        />
      </div>
      <div className="body">
        {dish.tag && (
          <div className="top">
            <span className="flame">🔥</span>
            <span style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 9.5, color: '#f59e0b', letterSpacing: '.16em',
            }}>{dish.tag}</span>
          </div>
        )}
        <h5>{dish.name}</h5>
        <div className="desc">{dish.description}</div>
        <div className="row">
          <div className="price">${dish.price.toFixed(2)}</div>
          {qty > 0 ? (
            <div className="dish-qty">
              <button
                type="button"
                className="dq-btn"
                onClick={(e) => { e.stopPropagation(); onDecrease() }}
              >−</button>
              <span className="dq-n">{qty}</span>
              <button
                type="button"
                className="dq-btn dq-add"
                onClick={(e) => { e.stopPropagation(); onIncrease() }}
              >+</button>
            </div>
          ) : (
            <button
              type="button"
              className="add"
              onClick={(e) => { e.stopPropagation(); onAdd() }}
            >+</button>
          )}
        </div>
      </div>
    </div>
  )
}

function formatClock() {
  const d = new Date()
  const h = (d.getHours() % 12) || 12
  const m = String(d.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}
