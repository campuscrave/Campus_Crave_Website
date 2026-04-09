-- =============================================
-- CampusCrave Expo Database Schema
-- Run this entire file in Supabase SQL Editor
-- =============================================

-- TABLE 1: Expo leads (students + visitors who scan the QR)
CREATE TABLE IF NOT EXISTS expo_leads (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    timestamptz DEFAULT now() NOT NULL,
  type          text NOT NULL CHECK (type IN ('student', 'visitor', 'professor', 'investor')),
  first_name    text,
  full_name     text,
  email         text NOT NULL,
  role          text,
  q1_answer     text,
  q2_answer     text,
  q3_answer     text,
  order_placed  boolean DEFAULT false,
  CONSTRAINT expo_leads_email_unique UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS idx_expo_leads_email      ON expo_leads(email);
CREATE INDEX IF NOT EXISTS idx_expo_leads_type       ON expo_leads(type);
CREATE INDEX IF NOT EXISTS idx_expo_leads_created_at ON expo_leads(created_at DESC);

-- TABLE 2: Expo orders
CREATE TABLE IF NOT EXISTS expo_orders (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    timestamptz DEFAULT now() NOT NULL,
  order_number  int GENERATED ALWAYS AS IDENTITY,
  lead_id       uuid REFERENCES expo_leads(id) ON DELETE SET NULL,
  lead_email    text NOT NULL,
  item_name     text NOT NULL,
  restaurant    text NOT NULL,
  status        text DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'ready', 'picked_up')),
  is_free       boolean DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_expo_orders_status     ON expo_orders(status);
CREATE INDEX IF NOT EXISTS idx_expo_orders_created_at ON expo_orders(created_at DESC);

-- TABLE 3: Food stock (one row per item)
CREATE TABLE IF NOT EXISTS expo_stock (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  item_name       text NOT NULL UNIQUE,
  restaurant      text NOT NULL,
  total_stock     int NOT NULL DEFAULT 40,
  remaining_stock int NOT NULL DEFAULT 40 CHECK (remaining_stock >= 0),
  is_active       boolean DEFAULT true
);

-- TABLE 4: Admin sessions (simple token-based, no external auth needed)
CREATE TABLE IF NOT EXISTS expo_admin_log (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  timestamptz DEFAULT now(),
  event       text NOT NULL,
  metadata    jsonb
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
ALTER TABLE expo_leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE expo_orders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE expo_stock        ENABLE ROW LEVEL SECURITY;
ALTER TABLE expo_admin_log    ENABLE ROW LEVEL SECURITY;

-- expo_leads policies
CREATE POLICY "anon_insert_leads"  ON expo_leads FOR INSERT  TO anon WITH CHECK (true);
CREATE POLICY "anon_select_leads"  ON expo_leads FOR SELECT  TO anon USING (true);
CREATE POLICY "anon_update_leads"  ON expo_leads FOR UPDATE  TO anon USING (true);
CREATE POLICY "auth_update_leads"  ON expo_leads FOR UPDATE  TO authenticated USING (true);

-- expo_orders policies
CREATE POLICY "anon_insert_orders" ON expo_orders FOR INSERT  TO anon WITH CHECK (true);
CREATE POLICY "anon_select_orders" ON expo_orders FOR SELECT  TO anon USING (true);
CREATE POLICY "auth_update_orders" ON expo_orders FOR UPDATE  TO authenticated USING (true);

-- expo_stock policies
CREATE POLICY "anon_read_stock"    ON expo_stock FOR SELECT  TO anon USING (true);
CREATE POLICY "auth_update_stock"  ON expo_stock FOR UPDATE  TO authenticated USING (true);

-- admin_log policies
CREATE POLICY "auth_insert_log"    ON expo_admin_log FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "auth_select_log"    ON expo_admin_log FOR SELECT TO authenticated USING (true);

-- =============================================
-- ATOMIC STOCK DECREMENT FUNCTION
-- Prevents race conditions when multiple users
-- order at the same time
-- =============================================
CREATE OR REPLACE FUNCTION decrement_stock(p_item_name text)
RETURNS int
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_remaining int;
BEGIN
  UPDATE expo_stock
  SET    remaining_stock = remaining_stock - 1
  WHERE  item_name = p_item_name
    AND  remaining_stock > 0
    AND  is_active = true
  RETURNING remaining_stock INTO v_remaining;

  IF v_remaining IS NULL THEN
    RETURN -1;  -- sold out or not found
  END IF;

  RETURN v_remaining;
END;
$$;

-- =============================================
-- SEED DATA
-- =============================================
INSERT INTO expo_stock (item_name, restaurant, total_stock, remaining_stock)
VALUES
  ('Chicken Tenders', 'Green Lemon', 40, 40),
  ('The Classic Wrap', 'Green Lemon', 40, 40)
ON CONFLICT (item_name) DO NOTHING;

-- =============================================
-- REALTIME (enable for live counter)
-- =============================================
-- Run these in Supabase Dashboard > Database > Replication:
-- ALTER PUBLICATION supabase_realtime ADD TABLE expo_orders;
-- ALTER PUBLICATION supabase_realtime ADD TABLE expo_stock;
-- (Can't be done in SQL editor, must be done via Dashboard)
