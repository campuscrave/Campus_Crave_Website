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

const DISHES = [
  {
    id: 'choc-chip-cookies',
    name: 'Chocolate Chip Cookies',
    desc: 'Warm, freshly baked. Crisp edges, gooey center. Four to a bag.',
    price: 2.50,
    tag: "CAMPUS FAVORITE",
    img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=85',
    featured: true,
  },
  {
    id: 'brownies',
    name: 'Brownies',
    desc: 'Rich dark chocolate, fudgy center, crinkled top. Baked in-house every morning.',
    price: 3.50,
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=85',
  },
  {
    id: 'bottled-water',
    name: 'Bottled Water',
    desc: 'Chilled 16.9 oz spring water. Grab and go between classes.',
    price: 1.75,
    img: 'https://images.unsplash.com/photo-1560847468-5eef0b55c2bc?w=800&q=85',
  },
]

const COVER_IMG = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=85'
const REST_HERO_IMG = 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&q=85'

const TIMER_SECONDS = 360
const TIMER_CIRC = 2 * Math.PI * 110 // ≈ 691

export default function PitchPage() {
  const [page, setPage] = useState('splash')
  const [cart, setCart] = useState([]) // [{id, qty}]
  const [remain, setRemain] = useState(TIMER_SECONDS)
  const [clock, setClock] = useState(() => formatClock())
  const [menuTab, setMenuTab] = useState('Popular')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const phoneRef = useRef(null)
  const rightRef = useRef(null)
  const timerIntervalRef = useRef(null)

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

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault()
        const i = PAGES.indexOf(page)
        goto(PAGES[Math.min(PAGES.length - 1, i + 1)])
      } else if (e.key === 'ArrowLeft') {
        const i = PAGES.indexOf(page)
        goto(PAGES[Math.max(0, i - 1)])
      } else if (e.key === 'r' || e.key === 'R') {
        reset()
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown + auto-advance
  useEffect(() => {
    if (page !== 'track') {
      stopTimer()
      return
    }
    setRemain(TIMER_SECONDS)
    timerIntervalRef.current = setInterval(() => {
      setRemain((r) => {
        if (r <= 1) {
          stopTimer()
          setTimeout(() => setPage('ready'), 400)
          return 0
        }
        return r - 1
      })
    }, 1000)
    return stopTimer
  }, [page])

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

  function goto(name) {
    if (name === page) return
    setPage(name)
  }

  function reset() {
    setCart([])
    setPage('splash')
  }

  function addToCart(id) {
    setCart((prev) => {
      const hit = prev.find((i) => i.id === id)
      if (hit) return prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { id, qty: 1 }]
    })
  }

  function setQty(id, delta) {
    setCart((prev) => prev
      .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter((i) => i.qty > 0))
  }

  // Auto-seed cart when landing on cart page with empty cart so demo always flows
  useEffect(() => {
    if (page === 'cart' && cart.length === 0) {
      setCart([
        { id: 'choc-chip-cookies', qty: 4 },
        { id: 'brownies', qty: 3 },
        { id: 'bottled-water', qty: 1 },
      ])
    }
  }, [page]) // eslint-disable-line react-hooks/exhaustive-deps

  const cartDetailed = useMemo(() =>
    cart.map((c) => ({ ...c, dish: DISHES.find((d) => d.id === c.id) })).filter((c) => c.dish)
  , [cart])

  const subtotal = cartDetailed.reduce((s, c) => s + c.dish.price * c.qty, 0)
  const tax = subtotal * 0.08 // project rule: 8% tax at checkout
  const studentDeal = subtotal > 0 ? -subtotal * 0.05 : 0 // Green Lemon real "5% Student Deal" per seed
  const total = Math.max(0, subtotal + tax + studentDeal)

  const cartCount = cartDetailed.reduce((s, c) => s + c.qty, 0)

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

                        <div className="rest-card" onClick={() => goto('rest')}>
                          <div className="pic" style={{ backgroundImage: `url("${COVER_IMG}")` }}>
                            <div className="badge"><span className="live-dot" />OPEN · 5–10 MIN</div>
                            <div className="fav">
                              <svg className="ico" viewBox="0 0 16 16" fill="#fff"><path d="M8 14S2 10 2 5.5 5 1 8 3.5 14 1 14 5.5 8 14 8 14z" /></svg>
                            </div>
                          </div>
                          <div className="info">
                            <div className="rname">
                              <h4>Campus Crave Café</h4>
                              <div className="star">★ 4.9 · 1,284</div>
                            </div>
                            <div className="meta-line">
                              <span>Bakery · Coffee · Snacks</span>
                              <span className="dot">·</span>
                              <span>$</span>
                              <span className="dot">·</span>
                              <span>On campus</span>
                            </div>
                            <div className="tags"><span>MOST POPULAR</span><span>5% STUDENT DEAL</span><span>CRAVE $</span></div>
                          </div>
                        </div>

                        <div className="rest-card secondary">
                          <div className="pic">
                            <div className="badge" style={{ background: 'rgba(120,120,120,.5)' }}>OPEN · 10–20 MIN</div>
                          </div>
                          <div className="info">
                            <div className="rname"><h4>Green Lemon</h4><div className="star">★ 4.8 · 2,340</div></div>
                            <div className="meta-line"><span>Tacos · Fiesta Bowls</span><span className="dot">·</span><span>$$</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="tabbar">
                        <div className="ti on"><svg className="ico" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1l7 6v8h-5v-5H6v5H1V7z" /></svg></div>
                        <div className="ti"><svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="7" cy="7" r="4.5" /><path d="M10.5 10.5L14 14" /></svg></div>
                        <div className="ti"><svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 5h12l-1 9H3z" /><path d="M5 5V4a3 3 0 1 1 6 0v1" /></svg></div>
                        <div className="ti"><svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="5" r="3" /><path d="M2 14c0-3 3-5 6-5s6 2 6 5" /></svg></div>
                      </div>
                    </div>

                    {/* 4 RESTAURANT */}
                    <div className={`page rest ${page === 'rest' ? 'active' : ''}`}>
                      <div className="rest-scroll">
                        <div
                          className="cover photo"
                          style={{ '--cover-img': `url("${REST_HERO_IMG}")` }}
                        >
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
                            The student-run café on campus. Fresh bakery,
                            hot coffee, and grab-and-go snacks between classes.
                          </div>
                          <div className="rest-stats">
                            <div className="rs"><span className="i">★</span><b>4.9</b><span>(1,284)</span></div>
                            <div className="rs"><span className="i">⏱</span><b>5–10</b><span>min</span></div>
                            <div className="rs"><span className="i">◉</span><b>On</b><span>campus</span></div>
                          </div>
                        </div>
                        <div className="menu-tabs">
                          {['Popular', 'Bakery', 'Coffee', 'Snacks', 'Drinks'].map((t) => (
                            <div
                              key={t}
                              className={`mt ${menuTab === t ? 'on' : ''}`}
                              onClick={() => setMenuTab(t)}
                            >{t}</div>
                          ))}
                        </div>
                        <div className="menu">
                          {DISHES.map((d) => (
                            <Dish
                              key={d.id}
                              dish={d}
                              inCart={!!cart.find((c) => c.id === d.id)}
                              onAdd={() => addToCart(d.id)}
                            />
                          ))}
                        </div>
                      </div>

                      {cartCount > 0 && (
                        <div className="cart-bar" onClick={() => goto('cart')}>
                          <div className="cl">
                            <div className="n">{cartCount}</div>
                            {cartCount === 1
                              ? `Cart · ${cartDetailed[0]?.dish.name ?? ''}`
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
                          <b>Pickup · Campus Crave Café</b>
                          On campus · ready in ~6 min
                        </div>
                      </div>
                      {cartDetailed.map((c) => (
                        <div className="cartitem" key={c.id}>
                          <div className="ct" style={{ backgroundImage: `url("${c.dish.img}")` }} />
                          <div className="cm">
                            <h5>{c.dish.name}</h5>
                            <div className="p">${c.dish.price.toFixed(2)}</div>
                          </div>
                          <div className="qt">
                            <div className="q" onClick={() => setQty(c.id, -1)}>−</div>
                            <div className="n">{c.qty}</div>
                            <div className="q" onClick={() => setQty(c.id, +1)}>+</div>
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
                      <div className="slide-wrap">
                        <SwipeButton
                          label="Slide to order · Dining Dollars"
                          onSuccess={() => goto('track')}
                        />
                      </div>
                      <div className="eta">PICKUP ETA · <b>6 MIN</b> · CAMPUS CRAVE CAFÉ COUNTER</div>
                    </div>

                    {/* 6 TRACK */}
                    <div className={`page track ${page === 'track' ? 'active' : ''}`}>
                      <div className="ord">ORDER · #CC-2487</div>
                      <h2>Your order is <em>being prepared.</em></h2>
                      <div className="sub">Campus Crave Café is on it.<br />You'll get a ping when it's ready to pick up.</div>

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
                          <div className="eta2">● KITCHEN LIVE</div>
                        </div>
                      </div>

                      <div className="steps">
                        <div className="s done"><div className="d">✓</div><div className="t">Placed</div></div>
                        <div className="s active"><div className="d">●</div><div className="t">Cooking</div></div>
                        <div className="s"><div className="d">3</div><div className="t">Ready</div></div>
                        <div className="s"><div className="d">4</div><div className="t">Picked up</div></div>
                      </div>

                      <div className="courier">
                        <div className="ph">CC</div>
                        <div className="info2">
                          <div className="ln1">Campus Crave Café · On Campus</div>
                          <div className="ln2">Kitchen · prepping your order</div>
                        </div>
                        <div className="ic">
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3.5 2.5l2 1 1 3-2 1c1 2 2 3 4 4l1-2 3 1 1 2c-.5 1.5-2 2-3 2-5 0-9-4-9-9 0-1 .5-2.5 2-3z" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* 7 READY */}
                    <div className={`page success ${page === 'ready' ? 'active' : ''}`}>
                      <div className="check">
                        <svg viewBox="0 0 60 60" fill="none" stroke="#0a0318" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 31l9 9 19-21" />
                        </svg>
                      </div>
                      <div className="lbl2">READY FOR PICKUP</div>
                      <h2>Your order is <em>ready.</em></h2>
                      <div className="msg">
                        Head to the <b>Campus Crave Café</b> counter and show this PIN
                        to the team. Thanks, Matías.
                      </div>
                      <div className="pcard">
                        <div className="pin">
                          <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 15s5-4 5-9a5 5 0 0 0-10 0c0 5 5 9 5 9z" /><circle cx="8" cy="6" r="2" /></svg>
                        </div>
                        <div className="pt">
                          <div className="a">Pickup PIN</div>
                          <div className="b">4 · 8 · 2 · 7</div>
                        </div>
                      </div>
                      <button className="again" onClick={reset}>
                        Restart demo
                        <svg className="ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 8a5 5 0 1 0 1-3M3 3v3h3" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Reset — only external control */}
        <button className="reset-corner" onClick={reset} title="Reset demo (R)">
          <span>↻</span> Reset
        </button>

        <div className="sig">Campus Crave Corp.</div>
      </div>
    </div>
  )
}

function Dish({ dish, inCart, onAdd }) {
  return (
    <div className={`dish ${dish.featured ? 'hot' : ''}`}>
      <div className="thumb" style={{ backgroundImage: `url("${dish.img}")` }} />
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
        <div className="desc">{dish.desc}</div>
        <div className="row">
          <div className="price">${dish.price.toFixed(2)}</div>
          <div
            className={`add ${inCart ? 'added' : ''}`}
            onClick={(e) => { e.stopPropagation(); onAdd() }}
          >
            {inCart ? '✓' : '+'}
          </div>
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
