import { supabase } from './supabase'

// Genera o recupera session ID único por visita
function getSessionId() {
  let sid = sessionStorage.getItem('cc_session_id')
  if (!sid) {
    sid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    sessionStorage.setItem('cc_session_id', sid)
  }
  return sid
}

async function track(eventType, metadata = {}) {
  try {
    await supabase.from('analytics_events').insert({
      session_id: getSessionId(),
      event_type: eventType,
      page: window.location.pathname,
      metadata
    })
  } catch (err) {
    // Silencioso — nunca romper el website por analytics
    console.debug('Analytics track error (non-critical):', err)
  }
}

export function initAnalytics() {
  getSessionId()

  // Evitar doble-tracking en el mismo session
  if (sessionStorage.getItem('cc_tracked_pageview')) return
  sessionStorage.setItem('cc_tracked_pageview', 'true')

  // 1. PAGE VIEW inmediato
  track('page_view')

  // 2. HEARTBEAT cada 30 segundos (para "viewing now")
  const heartbeat = setInterval(() => track('heartbeat'), 30000)
  // Primer heartbeat inmediato
  track('heartbeat')

  // 3. TIME BEACONS
  const timer20s = setTimeout(() => track('time_20s'), 20000)
  const timer60s = setTimeout(() => track('time_60s'), 60000)

  // 4. SCROLL DEPTH tracking
  const scrollMilestones = { 25: false, 50: false, 75: false, 100: false }

  function handleScroll() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    if (docHeight <= 0) return

    const scrollPercent = Math.round((scrollTop / docHeight) * 100)

    if (!scrollMilestones[25] && scrollPercent >= 25) {
      scrollMilestones[25] = true
      track('scroll_25')
    }
    if (!scrollMilestones[50] && scrollPercent >= 50) {
      scrollMilestones[50] = true
      track('scroll_50')
    }
    if (!scrollMilestones[75] && scrollPercent >= 75) {
      scrollMilestones[75] = true
      track('scroll_75')
    }
    if (!scrollMilestones[100] && scrollPercent >= 99) {
      scrollMilestones[100] = true
      track('scroll_100')
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Cleanup al cerrar/navegar
  function cleanup() {
    clearInterval(heartbeat)
    clearTimeout(timer20s)
    clearTimeout(timer60s)
    window.removeEventListener('scroll', handleScroll)
  }

  window.addEventListener('beforeunload', cleanup)

  return cleanup
}
