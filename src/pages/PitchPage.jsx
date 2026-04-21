import { useEffect, useMemo, useRef, useState } from 'react'
import './pitch.css'

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
    id: 'locos-nachos',
    name: 'Locos Nachos',
    desc: 'Seasoned chips, queso blanco, guacamole, jalapeño, cilantro, sour cream, pico de gallo, black bean purée.',
    price: 10.00,
    tag: "CHEF'S PICK",
    img: 'https://static.wixstatic.com/media/c3bfad_8574ab0000134bfb976634c3325cca85~mv2.jpg',
    featured: true,
  },
  {
    id: 'chicken-brussels',
    name: 'Chicken & Brussels',
    desc: 'Grilled chicken, crispy brussels, shredded carrot, grilled onion, bacon bits, lime caesar, cotija.',
    price: 17.00,
    img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=85',
  },
  {
    id: 'guacamole',
    name: 'Guacamole',
    desc: 'Fresh made to order, gluten free.',
    price: 12.00,
    img: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=800&q=85',
  },
  {
    id: 'trio-dip',
    name: 'Trio Dip',
    desc: 'Guacamole, queso blanco, lime salsa. Served with fresh tortilla chips.',
    price: 14.00,
    img: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=800&q=85',
  },
]

const COVER_IMG = 'https://static.wixstatic.com/media/c3bfad_7dad66631dd54b77ae4d3357ea51c655~mv2.jpg'
const REST_HERO_IMG = 'https://static.wixstatic.com/media/c3bfad_238ad7d0591d4bdcb65a6fdec3d02b2b~mv2.jpg'

const TIMER_SECONDS = 360
const TIMER_CIRC = 2 * Math.PI * 110 // ≈ 691

export default function PitchPage() {
  const [page, setPage] = useState('splash')
  const [cart, setCart] = useState([]) // [{id, qty}]
  const [remain, setRemain] = useState(TIMER_SECONDS)
  const [clock, setClock] = useState(() => formatClock())
  const [menuTab, setMenuTab] = useState('Signature')
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

  // Phone tilt parallax
  useEffect(() => {
    const right = rightRef.current
    const phone = phoneRef.current
    if (!right || !phone) return
    const onMove = (e) => {
      const r = right.getBoundingClientRect()
      const x = ((e.clientX - r.left) / r.width) - 0.5
      const y = ((e.clientY - r.top) / r.height) - 0.5
      phone.style.transform =
        `rotateY(${-12 + x * 10}deg) rotateX(${4 - y * 8}deg) rotateZ(${-1.5 + x * 2}deg)`
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
        { id: 'locos-nachos', qty: 1 },
        { id: 'chicken-brussels', qty: 1 },
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
          <div className="nav">
            <a>Product</a><a>Pilot</a><a>Team</a><a>Ask</a>
          </div>
          <div className="meta">
            <div className="live"><span className="dot" />LIVE DEMO</div>
            <div>UNIVERSITY OF TAMPA · FALL 2026 PILOT</div>
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
          {/* LEFT */}
          <div className="left">
            <div className="eyebrow">
              <span className="tag">★</span> PITCH · INTERACTIVE DEMO
            </div>
            <h1 className="display">
              Campus dining,<br />finally <em>on tap.</em>
            </h1>
            <p className="lede">
              <strong>CampusCrave</strong> lets students use their meal plan at local
              restaurants. Order, track pickup, and skip the line — all in one flow.
              Built for campus life. Launching at the University of Tampa.
            </p>

            <div className="cta-row">
              <button className="btn-primary" onClick={() => goto('login')}>
                Launch Interactive Demo
                <span className="arr">↗</span>
              </button>
              <span className="btn-ghost">
                or press <span className="kb">SPACE</span> to advance
              </span>
            </div>

            <div className="status-rail">
              <div className="srow">
                <span className="d g" />Pilot · <b>&nbsp;University of Tampa — Fall 2026</b>
              </div>
              <div className="srow">
                <span className="d" />One checkout · <b>&nbsp;Dining Dollars + Crave Dollars</b>
              </div>
              <div className="srow">
                <span className="d y" />Pickup-first · <b>&nbsp;zero delivery fees for students</b>
              </div>
            </div>
          </div>

          {/* RIGHT — PHONE */}
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
                          Search tacos, bowls, margaritas...
                        </div>

                        <div className="hero-card">
                          <div className="lbl">★ STUDENT DEAL · GREEN LEMON</div>
                          <div className="tt">5% off, <em>every order.</em></div>
                          <div className="pill">Tap to apply →</div>
                        </div>

                        <div className="cats">
                          <div className="cat on">🔥 All</div>
                          <div className="cat">🌮 Tacos</div>
                          <div className="cat">🥗 Bowls</div>
                          <div className="cat">🍔 Burgers</div>
                          <div className="cat">☕ Coffee</div>
                          <div className="cat">🍨 Ice</div>
                        </div>

                        <div className="section-h">
                          <h3>Open near you</h3>
                          <div className="all">SEE ALL →</div>
                        </div>

                        <div className="rest-card" onClick={() => goto('rest')}>
                          <div className="pic" style={{ backgroundImage: `url("${COVER_IMG}")` }}>
                            <div className="badge"><span className="live-dot" />OPEN · 10–20 MIN</div>
                            <div className="fav">
                              <svg className="ico" viewBox="0 0 16 16" fill="#fff"><path d="M8 14S2 10 2 5.5 5 1 8 3.5 14 1 14 5.5 8 14 8 14z" /></svg>
                            </div>
                          </div>
                          <div className="info">
                            <div className="rname">
                              <h4>Green Lemon</h4>
                              <div className="star">★ 4.8 · 2,340</div>
                            </div>
                            <div className="meta-line">
                              <span>Tacos · Fiesta Bowls · Margaritas</span>
                              <span className="dot">·</span>
                              <span>$$</span>
                              <span className="dot">·</span>
                              <span>1.2 mi</span>
                            </div>
                            <div className="tags"><span>MOST POPULAR</span><span>5% STUDENT DEAL</span><span>CRAVE $</span></div>
                          </div>
                        </div>

                        <div className="rest-card secondary">
                          <div className="pic">
                            <div className="badge" style={{ background: 'rgba(120,120,120,.5)' }}>OPENS 5:30PM</div>
                          </div>
                          <div className="info">
                            <div className="rname"><h4>SkyBar Rooftop</h4><div className="star">★ 4.6 · 812</div></div>
                            <div className="meta-line"><span>Burgers · American</span><span className="dot">·</span><span>$$</span></div>
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
                          <h2>Green <em>Lemon</em></h2>
                          <div className="tagline">
                            Mexican restaurant and margarita bar in South Tampa.
                            Street tacos, fiesta bowls, and the strongest margaritas in SoHo.
                          </div>
                          <div className="rest-stats">
                            <div className="rs"><span className="i">★</span><b>4.8</b><span>(2,340)</span></div>
                            <div className="rs"><span className="i">⏱</span><b>10–20</b><span>min</span></div>
                            <div className="rs"><span className="i">◉</span><b>1.2</b><span>mi away</span></div>
                          </div>
                        </div>
                        <div className="menu-tabs">
                          {['Signature', 'Fiesta Bowls', 'Chips & Dips', 'Tacos', 'Margaritas'].map((t) => (
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
                          <b>Pickup · Green Lemon</b>
                          South Tampa · 1.2 mi from campus
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
                      <button className="place" onClick={() => goto('track')}>
                        <span>Place order · Pay with Dining Dollars</span>
                        <span className="arr">→</span>
                      </button>
                      <div className="eta">PICKUP ETA · <b>6 MIN</b> · GREEN LEMON COUNTER</div>
                    </div>

                    {/* 6 TRACK */}
                    <div className={`page track ${page === 'track' ? 'active' : ''}`}>
                      <div className="ord">ORDER · #CC-2487</div>
                      <h2>Your order is <em>being prepared.</em></h2>
                      <div className="sub">Green Lemon kitchen is on it.<br />You'll get a ping when it's ready to pick up.</div>

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
                        <div className="ph">GL</div>
                        <div className="info2">
                          <div className="ln1">Green Lemon · South Tampa</div>
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
                        Head to the <b>Green Lemon</b> counter and show this PIN
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

        {/* DOCK */}
        <div className="pitchdock">
          {[
            ['splash', 'Splash'],
            ['login', 'Login'],
            ['home', 'Home'],
            ['rest', 'Restaurant'],
            ['cart', 'Cart'],
            ['track', 'Tracking'],
            ['ready', 'Ready'],
          ].map(([key, label], i) => (
            <button
              key={key}
              className={`ph ${page === key ? 'active' : ''}`}
              onClick={() => goto(key)}
            >
              <span className="idx">{i + 1}</span>{label}
            </button>
          ))}
          <div className="sep" />
          <button className="rst" onClick={reset}><span>↻</span>Reset</button>
        </div>

        <div className="left-bot">
          <span>v1.0 · Pitch Build</span>
          <span className="ln" />
          <span>University of Tampa · Pilot</span>
          <span className="ln" />
          <span><b>F</b>&nbsp;&nbsp;fullscreen</span>
        </div>

        <div className="sig">
          CAMPUSCRAVE · INC<br />
          <b>PITCH · LIVE</b>
        </div>
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
