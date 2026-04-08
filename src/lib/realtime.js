export async function initRealtime() {
  if (typeof window === 'undefined') return
  try {
    const { getOrderCount, subscribeToOrderCount, getStockLevels } = await import('./database.js')
    const count = await getOrderCount()
    window.__orderCount = count
    document.dispatchEvent(new CustomEvent('cc:order_count', { detail: { count } }))
    window.__stockCache = await getStockLevels()
    const unsub = subscribeToOrderCount((newCount) => {
      window.__orderCount = newCount
      document.dispatchEvent(new CustomEvent('cc:order_count', { detail: { count: newCount } }))
    })
    window.__realtimeUnsub = unsub
  } catch (e) {
    console.warn('CampusCrave realtime init skipped:', e.message)
  }
}

export default initRealtime
