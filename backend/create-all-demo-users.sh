#!/bin/bash
# Create all demo users directly in database
# Run this on Render backend shell

psql $DATABASE_URL << 'EOF'
-- Create admin user
INSERT INTO users (role, name, email, username, password)
VALUES ('admin', 'Admin User', 'admin@cmdr.com', 'admin', 'admin123')
ON CONFLICT (username) DO UPDATE 
SET password = 'admin123', role = 'admin';

-- Create advisor user  
INSERT INTO users (role, name, email, username, password)
VALUES ('advisor', 'Advisor User', 'advisor@cmdr.com', 'advisor', 'advisor123')
ON CONFLICT (username) DO UPDATE 
SET password = 'advisor123', role = 'advisor';

-- Create client user
INSERT INTO users (role, name, email, username, password, company_name)
VALUES ('client', 'Client User', 'client@cmdr.com', 'client', 'client123', 'Demo Company')
ON CONFLICT (username) DO UPDATE 
SET password = 'client123', role = 'client';

-- Link client to advisor
INSERT INTO advisor_clients (advisor_id, client_id)
SELECT 
  (SELECT id FROM users WHERE username = 'advisor'),
  (SELECT id FROM users WHERE username = 'client')
ON CONFLICT DO NOTHING;

-- Show all created users
SELECT id, role, name, email, username FROM users WHERE username IN ('admin', 'advisor', 'client');
EOF

echo ""
echo "✅ All demo users created successfully!"
echo ""
echo "=== LOGIN CREDENTIALS ==="
echo ""
echo "Admin:"
echo "  Username: admin"
echo "  Password: admin123"
echo "  URL: https://cmdr.onrender.com/login"
echo ""
echo "Advisor:"
echo "  Username: advisor"
echo "  Password: advisor123"
echo "  URL: https://cmdr.onrender.com/login"
echo ""
echo "Client:"
echo "  Username: client"
echo "  Password: client123"
echo "  URL: https://cmdr.onrender.com/login"
echo ""






