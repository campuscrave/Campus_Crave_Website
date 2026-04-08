import { supabase } from './supabase.js'

const LS_LEADS  = 'cc_expo_leads'
const LS_ORDERS = 'cc_expo_orders'
const LS_STOCK  = 'cc_expo_stock'
const LS_EMAILS = 'cc_registered_emails'

const lsGet = (key) => JSON.parse(localStorage.getItem(key)) || []
const lsSet = (key, val) => localStorage.setItem(key, JSON.stringify(val))
const genId = () => Math.random().toString(36).slice(2, 11)

export async function checkEmailExists(email) {
  if (supabase) {
    const { data } = await supabase
      .from('expo_leads')
      .select('id')
      .eq('email', email)
      .limit(1)
    return !!(data && data.length > 0)
  }
  return lsGet(LS_EMAILS).includes(email.toLowerCase())
}

export async function createLead({ type, firstName, fullName, email, role, q1, q2, q3 }) {
  if (!email) return { success: false, error: 'missing_email' }
  const exists = await checkEmailExists(email)
  if (exists) return { success: false, error: 'duplicate' }

  if (supabase) {
    const { data, error } = await supabase
      .from('expo_leads')
      .insert({
        type,
        first_name: firstName,
        full_name: fullName,
        email,
        role,
        q1_answer: q1,
        q2_answer: q2,
        q3_answer: q3,
      })
      .select('id')
      .single()
    if (error) return { success: false, error: error.message }
    return { success: true, leadId: data.id }
  }

  const id = genId()
  const leads = lsGet(LS_LEADS)
  leads.push({ id, type, first_name: firstName, full_name: fullName, email, role, q1_answer: q1, q2_answer: q2, q3_answer: q3, created_at: new Date().toISOString() })
  lsSet(LS_LEADS, leads)
  const emails = lsGet(LS_EMAILS)
  emails.push(email.toLowerCase())
  lsSet(LS_EMAILS, emails)
  return { success: true, leadId: id }
}

export async function getStockLevels() {
  if (supabase) {
    const { data } = await supabase
      .from('expo_stock')
      .select('item_name, remaining_stock, is_active')
      .order('item_name')
    return data || []
  }
  const stock = lsGet(LS_STOCK)
  if (stock.length === 0) {
    return [
      { item_name: 'Chicken Tenders', remaining_stock: 40, is_active: true },
      { item_name: 'The Classic Wrap', remaining_stock: 40, is_active: true },
    ]
  }
  return stock
}

export async function createOrder({ leadId, leadEmail, itemName, restaurant }) {
  if (supabase) {
    const { data: rpcData, error: rpcError } = await supabase.rpc('decrement_stock', { item: itemName })
    if (rpcError) return { success: false, error: rpcError.message }
    if (rpcData === -1) return { success: false, error: 'sold_out' }

    const { data: orderData, error: orderError } = await supabase
      .from('expo_orders')
      .insert({ lead_id: leadId, lead_email: leadEmail, item_name: itemName, restaurant })
      .select('order_number')
      .single()
    if (orderError) return { success: false, error: orderError.message }

    await supabase
      .from('expo_leads')
      .update({ order_placed: true })
      .eq('id', leadId)

    return { success: true, orderNumber: orderData.order_number }
  }

  const stock = lsGet(LS_STOCK)
  let saved = stock
  if (saved.length === 0) {
    saved = [
      { item_name: 'Chicken Tenders', remaining_stock: 40, is_active: true },
      { item_name: 'The Classic Wrap', remaining_stock: 40, is_active: true },
    ]
  }
  const idx = saved.findIndex((s) => s.item_name === itemName)
  if (idx === -1 || saved[idx].remaining_stock <= 0) return { success: false, error: 'sold_out' }
  saved[idx].remaining_stock -= 1
  lsSet(LS_STOCK, saved)

  const orders = lsGet(LS_ORDERS)
  const orderNumber = orders.length + 1001
  orders.push({ id: genId(), lead_id: leadId, lead_email: leadEmail, item_name: itemName, restaurant, order_number: orderNumber, status: 'pending', created_at: new Date().toISOString() })
  lsSet(LS_ORDERS, orders)
  return { success: true, orderNumber }
}

export async function getOrderCount() {
  if (supabase) {
    const { count } = await supabase
      .from('expo_orders')
      .select('*', { count: 'exact', head: true })
    return count || 0
  }
  return lsGet(LS_ORDERS).length
}

export function subscribeToOrderCount(callback) {
  if (supabase) {
    const channel = supabase
      .channel('expo_orders_inserts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'expo_orders' }, async () => {
        const count = await getOrderCount()
        callback(count)
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }

  const timer = setInterval(async () => {
    const count = await getOrderCount()
    callback(count)
  }, 5000)
  return () => clearInterval(timer)
}

export async function updateOrderStatus(orderId, status) {
  if (supabase) {
    const { error } = await supabase
      .from('expo_orders')
      .update({ status })
      .eq('id', orderId)
    return { success: !error }
  }
  const orders = lsGet(LS_ORDERS)
  const idx = orders.findIndex((o) => o.id === orderId)
  if (idx !== -1) {
    orders[idx].status = status
    lsSet(LS_ORDERS, orders)
  }
  return { success: true }
}

export async function getAllLeads(password) {
  if (password !== import.meta.env.VITE_ADMIN_PASSWORD) throw new Error('unauthorized')
  if (supabase) {
    const { data } = await supabase
      .from('expo_leads')
      .select('*')
      .order('created_at', { ascending: false })
    return data || []
  }
  return lsGet(LS_LEADS)
}

export async function getAllOrders(password) {
  if (password !== import.meta.env.VITE_ADMIN_PASSWORD) throw new Error('unauthorized')
  if (supabase) {
    const { data } = await supabase
      .from('expo_orders')
      .select('*, expo_leads(first_name, email)')
      .order('created_at', { ascending: false })
    return data || []
  }
  return lsGet(LS_ORDERS)
}

// Expose globally so components can call window.__db.fn()
if (typeof window !== 'undefined') {
  window.__db = {
    checkEmailExists,
    createLead,
    getStockLevels,
    createOrder,
    getOrderCount,
    subscribeToOrderCount,
    updateOrderStatus,
    getAllLeads,
    getAllOrders,
  }
}
