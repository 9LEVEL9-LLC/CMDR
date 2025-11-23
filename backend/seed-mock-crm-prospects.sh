#!/bin/bash
# Seed 10 mock CRM prospects at various stages
# Run this on Render backend shell

psql $DATABASE_URL << 'EOF'
DO $$
DECLARE
  advisor_id INT;
BEGIN
  -- Get an advisor to link prospects to
  SELECT id INTO advisor_id FROM users WHERE role = 'advisor' LIMIT 1;
  
  -- ===========================================
  -- CREATE 10 MOCK PROSPECTS
  -- ===========================================
  
  -- Prospect 1: Introduction Stage - Tech Startup
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Sarah Thompson',
    'sarah@techvision.ai',
    'sarahtech',
    '$2b$10$YourHashedPasswordHere',
    'TechVision AI Solutions',
    'https://techvision.ai',
    '(415) 555-0201',
    'prospect',
    'introduction'
  ) ON CONFLICT (email) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'introduction', company_name = EXCLUDED.company_name, website_url = EXCLUDED.website_url, phone = EXCLUDED.phone
  ON CONFLICT (username) DO UPDATE
  SET client_type = 'prospect', prospect_stage = 'introduction', company_name = EXCLUDED.company_name, website_url = EXCLUDED.website_url, phone = EXCLUDED.phone;
  
  -- Link to advisor
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'sarahtech'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 2: Warm Stage - Law Firm
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Michael Rodriguez',
    'michael@rodriguezlaw.com',
    'michaelrod',
    'prospect123',
    'Rodriguez & Partners LLP',
    'https://rodriguezlaw.com',
    '(212) 555-0202',
    'prospect',
    'warm'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'warm';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'michaelrod'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 3: Likely Close - Financial Services
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Jennifer Lee',
    'jlee@wealthadvisors.com',
    'jenniferlee',
    'prospect123',
    'Elite Wealth Advisors',
    'https://wealthadvisors.com',
    '(310) 555-0203',
    'prospect',
    'likely_close'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'likely_close';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'jenniferlee'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 4: Introduction Stage - Healthcare
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Dr. James Patterson',
    'jpatterson@medicalgroup.com',
    'drpatterson',
    'prospect123',
    'Patterson Medical Group',
    'https://pattersonmedical.com',
    '(617) 555-0204',
    'prospect',
    'introduction'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'introduction';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'drpatterson'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 5: Warm Stage - Real Estate
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'David Chen',
    'dchen@premiumrealty.com',
    'davidchen',
    'prospect123',
    'Premium Realty Group',
    'https://premiumrealty.com',
    '(305) 555-0205',
    'prospect',
    'warm'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'warm';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'davidchen'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 6: Likely Close - Consulting Firm
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Amanda Foster',
    'afoster@strategyplus.com',
    'amandafoster',
    'prospect123',
    'StrategyPlus Consulting',
    'https://strategyplus.com',
    '(312) 555-0206',
    'prospect',
    'likely_close'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'likely_close';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'amandafoster'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 7: Introduction Stage - E-commerce
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Robert Martinez',
    'rmartinez@shopnova.com',
    'robertmart',
    'prospect123',
    'ShopNova E-commerce',
    'https://shopnova.com',
    '(512) 555-0207',
    'prospect',
    'introduction'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'introduction';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'robertmart'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 8: Warm Stage - Marketing Agency
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Lisa Anderson',
    'lisa@creativeedge.agency',
    'lisaanderson',
    'prospect123',
    'Creative Edge Marketing',
    'https://creativeedge.agency',
    '(303) 555-0208',
    'prospect',
    'warm'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'warm';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'lisaanderson'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 9: Likely Close - Manufacturing
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Thomas Wang',
    'twang@precisionmfg.com',
    'thomaswang',
    'prospect123',
    'Precision Manufacturing Inc',
    'https://precisionmfg.com',
    '(414) 555-0209',
    'prospect',
    'likely_close'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'likely_close';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'thomaswang'
  ON CONFLICT DO NOTHING;
  
  -- Prospect 10: Warm Stage - SaaS Startup
  INSERT INTO users (role, name, email, username, password, company_name, website_url, phone, client_type, prospect_stage)
  VALUES (
    'client',
    'Emily Brooks',
    'emily@cloudstream.io',
    'emilybrooks',
    'prospect123',
    'CloudStream Analytics',
    'https://cloudstream.io',
    '(206) 555-0210',
    'prospect',
    'warm'
  ) ON CONFLICT (username) DO UPDATE 
  SET client_type = 'prospect', prospect_stage = 'warm';
  
  INSERT INTO advisor_clients (advisor_id, client_id)
  SELECT advisor_id, id FROM users WHERE username = 'emilybrooks'
  ON CONFLICT DO NOTHING;
  
  -- ===========================================
  -- ADD ADVISOR NOTES FOR SOME PROSPECTS
  -- ===========================================
  
  -- Note for Jennifer Lee (likely close)
  INSERT INTO client_notes (client_id, advisor_id, note, created_at)
  SELECT id, advisor_id, 
    'Had excellent intro call. They''re looking for AI automation for client portfolio management. Budget approved, just finalizing timeline. Follow up next Tuesday.',
    NOW() - INTERVAL '2 days'
  FROM users WHERE username = 'jenniferlee';
  
  -- Note for Amanda Foster (likely close)
  INSERT INTO client_notes (client_id, advisor_id, note, created_at)
  SELECT id, advisor_id,
    'Strong interest in AI-powered research and report generation. Sent proposal last week. Waiting for board approval. Very positive signals.',
    NOW() - INTERVAL '5 days'
  FROM users WHERE username = 'amandafoster';
  
  -- Note for Thomas Wang (likely close)
  INSERT INTO client_notes (client_id, advisor_id, note, created_at)
  SELECT id, advisor_id,
    'Quality control automation is their top priority. Discussed using computer vision for defect detection. They love the approach and are ready to start. Contract review in progress.',
    NOW() - INTERVAL '1 day'
  FROM users WHERE username = 'thomaswang';
  
  -- Note for Michael Rodriguez (warm)
  INSERT INTO client_notes (client_id, advisor_id, note, created_at)
  SELECT id, advisor_id,
    'Second meeting scheduled. Interested in document automation similar to Matt Meuli''s project. Need to send case studies and pricing.',
    NOW() - INTERVAL '4 days'
  FROM users WHERE username = 'michaelrod';
  
  -- Note for David Chen (warm)
  INSERT INTO client_notes (client_id, advisor_id, note, created_at)
  SELECT id, advisor_id,
    'Exploring AI for property valuation and market analysis. Shared demo of similar real estate tools. Waiting for their tech team review.',
    NOW() - INTERVAL '3 days'
  FROM users WHERE username = 'davidchen';
  
  -- Note for Emily Brooks (warm)
  INSERT INTO client_notes (client_id, advisor_id, note, created_at)
  SELECT id, advisor_id,
    'SaaS analytics platform - wants AI insights layer. Great product-market fit. Scheduled technical deep dive for next week.',
    NOW() - INTERVAL '6 days'
  FROM users WHERE username = 'emilybrooks';
  
  RAISE NOTICE 'Mock CRM prospects created successfully!';
END $$;

-- Verification and Summary
SELECT 
  'Total Prospects Created' as summary,
  CAST(COUNT(*) AS TEXT) as count
FROM users 
WHERE client_type = 'prospect';

-- Show breakdown by stage
SELECT 
  prospect_stage as stage,
  COUNT(*) as count,
  STRING_AGG(company_name, ', ') as companies
FROM users 
WHERE client_type = 'prospect'
GROUP BY prospect_stage
ORDER BY 
  CASE prospect_stage
    WHEN 'introduction' THEN 1
    WHEN 'warm' THEN 2
    WHEN 'likely_close' THEN 3
  END;

-- Show all prospects with details
SELECT 
  id,
  name,
  company_name,
  email,
  prospect_stage,
  phone
FROM users
WHERE client_type = 'prospect'
ORDER BY 
  CASE prospect_stage
    WHEN 'likely_close' THEN 1
    WHEN 'warm' THEN 2
    WHEN 'introduction' THEN 3
  END,
  company_name;
EOF

echo ""
echo "✅ 10 Mock CRM Prospects Created!"
echo ""
echo "Breakdown by Stage:"
echo "  🔥 Likely Close (3 prospects) - Ready to convert"
echo "  🌡️  Warm (4 prospects) - Active engagement"
echo "  👋 Introduction (3 prospects) - Initial contact"
echo ""
echo "Prospects:"
echo "1. Sarah Thompson - TechVision AI Solutions (Introduction)"
echo "2. Michael Rodriguez - Rodriguez & Partners LLP (Warm)"
echo "3. Jennifer Lee - Elite Wealth Advisors (Likely Close) 💰"
echo "4. Dr. James Patterson - Patterson Medical Group (Introduction)"
echo "5. David Chen - Premium Realty Group (Warm)"
echo "6. Amanda Foster - StrategyPlus Consulting (Likely Close) 💰"
echo "7. Robert Martinez - ShopNova E-commerce (Introduction)"
echo "8. Lisa Anderson - Creative Edge Marketing (Warm)"
echo "9. Thomas Wang - Precision Manufacturing Inc (Likely Close) 💰"
echo "10. Emily Brooks - CloudStream Analytics (Warm)"
echo ""
echo "All prospects linked to advisor and include:"
echo "  - Contact information (email, phone, website)"
echo "  - Stage tracking (introduction → warm → likely close)"
echo "  - Advisor notes on 6 prospects"
echo ""
echo "View in Advisor CRM Dashboard!"
echo ""

