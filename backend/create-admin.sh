#!/bin/bash
# Create admin user directly in database
# Run this on Render backend shell

psql $DATABASE_URL << 'EOF'
-- Create admin user
INSERT INTO users (role, name, email, username, password)
VALUES ('admin', 'Admin User', 'admin@cmdr.com', 'admin', 'admin123')
ON CONFLICT (username) DO UPDATE 
SET password = 'admin123', role = 'admin';

-- Verify user was created
SELECT id, role, name, email, username FROM users WHERE username = 'admin';
EOF

echo ""
echo "✅ Admin user created successfully!"
echo ""
echo "Login credentials:"
echo "Username: admin"
echo "Password: admin123"
echo ""
echo "Login at: https://cmdr.onrender.com/login"






