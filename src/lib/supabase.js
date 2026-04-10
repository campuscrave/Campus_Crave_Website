/*
  RUN THIS IN SUPABASE SQL EDITOR:

  -- Expo leads table
  CREATE TABLE IF NOT EXISTS expo_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Identity
    first_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    audience_type TEXT NOT NULL CHECK (audience_type IN ('student','professor','investor')),

    -- Student fields
    year_in_school TEXT,
    campus_dining_frustration TEXT,
    willingness_to_pay TEXT,

    -- Professor fields
    department TEXT,
    meeting_frequency TEXT,
    dining_credits_interest TEXT,

    -- Investor/visitor fields
    connection_to_campus TEXT,
    spending_awareness TEXT,
    sector TEXT,
    prepaid_plan_interest TEXT,

    -- Order
    food_item_id TEXT,
    food_item_name TEXT,
    order_number TEXT UNIQUE,
    order_claimed BOOLEAN DEFAULT FALSE
  );

  -- Food stock table
  CREATE TABLE IF NOT EXISTS expo_stock (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL DEFAULT 90,
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Seed stock
  INSERT INTO expo_stock (id, name, stock) VALUES
    ('pizza', 'Stella Margherita Pizza', 90),
    ('wrap', 'CRG Signature Wraps', 90)
  ON CONFLICT (id) DO NOTHING;

  -- Enable Row Level Security
  ALTER TABLE expo_leads ENABLE ROW LEVEL SECURITY;
  ALTER TABLE expo_stock ENABLE ROW LEVEL SECURITY;

  -- Allow anonymous inserts (expo users are not logged in)
  CREATE POLICY "Allow anon insert leads" ON expo_leads
    FOR INSERT TO anon WITH CHECK (true);

  CREATE POLICY "Allow anon read stock" ON expo_stock
    FOR SELECT TO anon USING (true);

  CREATE POLICY "Allow anon update stock" ON expo_stock
    FOR UPDATE TO anon USING (true);
*/

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function submitExpoLead(leadData) {
  const { data, error } = await supabase
    .from('expo_leads')
    .insert([leadData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getStock() {
  const { data, error } = await supabase
    .from('expo_stock')
    .select('*');
  if (error) throw error;
  return data;
}

export async function decrementStock(itemId) {
  const { error } = await supabase.rpc('decrement_stock', { item_id: itemId });
  if (error) {
    // Fallback: manual decrement
    const { data: current } = await supabase
      .from('expo_stock')
      .select('stock')
      .eq('id', itemId)
      .single();

    if (current && current.stock > 0) {
      await supabase
        .from('expo_stock')
        .update({ stock: current.stock - 1, updated_at: new Date().toISOString() })
        .eq('id', itemId);
    }
  }
}

export function generateOrderNumber(index) {
  return 'CC-' + String(index).padStart(3, '0');
}
