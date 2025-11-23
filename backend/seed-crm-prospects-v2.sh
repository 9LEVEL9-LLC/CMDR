#!/bin/bash
# Seed 10 mock CRM prospects - Version 2 (simplified, no conflicts)
# Run this on Render backend shell

psql $DATABASE_URL << 'EOF'
-- First create client_notes table if it doesn't exist
CREATE TABLE IF NOT EXISTS client_notes (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  advisor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_client_notes_client ON client_notes(client_id);
CREATE INDEX IF NOT EXISTS idx_client_notes_advisor ON client_notes(advisor_id);

DO $$
DECLARE
  advisor_id INT;
  p_id INT;
BEGIN
  -- Get an advisor
  SELECT id INTO advisor_id FROM users WHERE role = 'advisor' LIMIT 1;
  
  -- Prospect 1: Introduction - Tech Startup
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'sarah@techvision.ai') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Sarah Thompson', 'sarah@techvision.ai', 'sarahtech', 'prospect123',
            'TechVision AI Solutions', 'https://techvision.ai', '(415) 555-0201', 'prospect', 'introduction')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
  END IF;
  
  -- Prospect 2: Warm - Law Firm
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'michael@rodriguezlaw.com') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Michael Rodriguez', 'michael@rodriguezlaw.com', 'michaelrod', 'prospect123',
            'Rodriguez & Partners LLP', 'https://rodriguezlaw.com', '(212) 555-0202', 'prospect', 'warm')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
    INSERT INTO client_notes (client_id, advisor_id, note, created_at)
    VALUES (p_id, advisor_id, 'Second meeting scheduled. Interested in document automation similar to Matt Meuli''s project. Need to send case studies and pricing.', NOW() - INTERVAL '4 days');
  END IF;
  
  -- Prospect 3: Likely Close - Financial
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'jlee@wealthadvisors.com') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Jennifer Lee', 'jlee@wealthadvisors.com', 'jenniferlee', 'prospect123',
            'Elite Wealth Advisors', 'https://wealthadvisors.com', '(310) 555-0203', 'prospect', 'likely_close')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
    INSERT INTO client_notes (client_id, advisor_id, note, created_at)
    VALUES (p_id, advisor_id, 'Had excellent intro call. They''re looking for AI automation for client portfolio management. Budget approved, just finalizing timeline. Follow up next Tuesday.', NOW() - INTERVAL '2 days');
  END IF;
  
  -- Prospect 4: Introduction - Healthcare
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'jpatterson@medicalgroup.com') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Dr. James Patterson', 'jpatterson@medicalgroup.com', 'drpatterson', 'prospect123',
            'Patterson Medical Group', 'https://pattersonmedical.com', '(617) 555-0204', 'prospect', 'introduction')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
  END IF;
  
  -- Prospect 5: Warm - Real Estate
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'dchen@premiumrealty.com') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'David Chen', 'dchen@premiumrealty.com', 'davidchen', 'prospect123',
            'Premium Realty Group', 'https://premiumrealty.com', '(305) 555-0205', 'prospect', 'warm')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
    INSERT INTO client_notes (client_id, advisor_id, note, created_at)
    VALUES (p_id, advisor_id, 'Exploring AI for property valuation and market analysis. Shared demo of similar real estate tools. Waiting for their tech team review.', NOW() - INTERVAL '3 days');
  END IF;
  
  -- Prospect 6: Likely Close - Consulting
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'afoster@strategyplus.com') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Amanda Foster', 'afoster@strategyplus.com', 'amandafoster', 'prospect123',
            'StrategyPlus Consulting', 'https://strategyplus.com', '(312) 555-0206', 'prospect', 'likely_close')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
    INSERT INTO client_notes (client_id, advisor_id, note, created_at)
    VALUES (p_id, advisor_id, 'Strong interest in AI-powered research and report generation. Sent proposal last week. Waiting for board approval. Very positive signals.', NOW() - INTERVAL '5 days');
  END IF;
  
  -- Prospect 7: Introduction - E-commerce
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'rmartinez@shopnova.com') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Robert Martinez', 'rmartinez@shopnova.com', 'robertmart', 'prospect123',
            'ShopNova E-commerce', 'https://shopnova.com', '(512) 555-0207', 'prospect', 'introduction')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
  END IF;
  
  -- Prospect 8: Warm - Marketing Agency
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'lisa@creativeedge.agency') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Lisa Anderson', 'lisa@creativeedge.agency', 'lisaanderson', 'prospect123',
            'Creative Edge Marketing', 'https://creativeedge.agency', '(303) 555-0208', 'prospect', 'warm')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
    INSERT INTO client_notes (client_id, advisor_id, note, created_at)
    VALUES (p_id, advisor_id, 'SaaS analytics platform - wants AI insights layer. Great product-market fit. Scheduled technical deep dive for next week.', NOW() - INTERVAL '6 days');
  END IF;
  
  -- Prospect 9: Likely Close - Manufacturing
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'twang@precisionmfg.com') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Thomas Wang', 'twang@precisionmfg.com', 'thomaswang', 'prospect123',
            'Precision Manufacturing Inc', 'https://precisionmfg.com', '(414) 555-0209', 'prospect', 'likely_close')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
    INSERT INTO client_notes (client_id, advisor_id, note, created_at)
    VALUES (p_id, advisor_id, 'Quality control automation is their top priority. Discussed using computer vision for defect detection. They love the approach and are ready to start. Contract review in progress.', NOW() - INTERVAL '1 day');
  END IF;
  
  -- Prospect 10: Warm - SaaS Startup
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'emily@cloudstream.io') THEN
    INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
    VALUES ('client', 'Emily Brooks', 'emily@cloudstream.io', 'emilybrooks', 'prospect123',
            'CloudStream Analytics', 'https://cloudstream.io', '(206) 555-0210', 'prospect', 'warm')
    RETURNING id INTO p_id;
    INSERT INTO advisor_clients (advisor_id, client_id) VALUES (advisor_id, p_id) ON CONFLICT DO NOTHING;
    INSERT INTO client_notes (client_id, advisor_id, note, created_at)
    VALUES (p_id, advisor_id, 'Looking for customer behavior prediction AI. Strong technical team. Discussed ML models and data pipeline. Very engaged, expect to close this month.', NOW() - INTERVAL '7 days');
  END IF;
  
  RAISE NOTICE 'Mock CRM prospects created successfully!';
END $$;




