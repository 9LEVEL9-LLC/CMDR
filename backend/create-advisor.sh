#!/bin/bash
# Create advisor user directly in database
# Run this on Render backend shell

psql $DATABASE_URL << 'EOF'
-- Create advisor user
INSERT INTO users (role, name, email, username, password)
VALUES ('advisor', 'Advisor User', 'advisor@cmdr.com', 'advisor', 'advisor123')
ON CONFLICT (username) DO UPDATE 
SET password = 'advisor123', role = 'advisor';

-- Verify user was created
SELECT id, role, name, email, username FROM users WHERE username = 'advisor';
EOF

echo ""
echo "✅ Advisor user created successfully!"
echo ""
echo "Login credentials:"
echo "Username: advisor"
echo "Password: advisor123"
echo ""
echo "Login at: https://cmdr.onrender.com/login"






