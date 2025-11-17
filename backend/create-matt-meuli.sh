#!/bin/bash
# Create Matt Meuli client account and link to all advisors
# Run this on Render backend shell

psql $DATABASE_URL << 'EOF'
-- Create Matt Meuli client user
INSERT INTO users (role, name, email, username, password, company_name, website_url, phone)
VALUES (
  'client', 
  'Matt Meuli', 
  'matt@wyomingassetprotection.com', 
  'mattmeuli', 
  '123456',
  'Meuli & Associates',
  'https://wyomingassetprotection.com',
  NULL
)
ON CONFLICT (username) DO UPDATE 
SET 
  password = '123456', 
  role = 'client',
  name = 'Matt Meuli',
  email = 'matt@wyomingassetprotection.com',
  company_name = 'Meuli & Associates',
  website_url = 'https://wyomingassetprotection.com';

-- Get Matt's user ID
DO $$
DECLARE
  matt_id INT;
  advisor_id INT;
BEGIN
  SELECT id INTO matt_id FROM users WHERE username = 'mattmeuli';
  
  -- Link Matt to ALL advisors in the system
  FOR advisor_id IN SELECT id FROM users WHERE role = 'advisor'
  LOOP
    INSERT INTO advisor_clients (advisor_id, client_id)
    VALUES (advisor_id, matt_id)
    ON CONFLICT DO NOTHING;
  END LOOP;
  
  RAISE NOTICE 'Matt Meuli (ID: %) linked to all advisors', matt_id;
END $$;

-- Verify user was created
SELECT id, role, name, email, username, company_name FROM users WHERE username = 'mattmeuli';

-- Show advisor linkages
SELECT 
  u.name as advisor_name,
  c.name as client_name,
  c.company_name
FROM advisor_clients ac
JOIN users u ON u.id = ac.advisor_id
JOIN users c ON c.id = ac.client_id
WHERE c.username = 'mattmeuli';
EOF

echo ""
echo "✅ Matt Meuli client account created successfully!"
echo ""
echo "Login credentials:"
echo "Name: Matt Meuli"
echo "Company: Meuli & Associates"
echo "Email: matt@wyomingassetprotection.com"
echo "Username: mattmeuli"
echo "Password: 123456"
echo ""
echo "Login at: https://cmdr.onrender.com/login"
echo ""

