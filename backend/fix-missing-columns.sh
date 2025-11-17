#!/bin/bash
# Fix missing columns in users table
# Run this on Render backend shell

export PGPASSWORD='T2qSid1L6bHSLsze3LLtHu4pCrWTawMs'

psql -h dpg-d4bnjgv5r7bs739u0g50-a.oregon-postgres.render.com \
     -U cmdr_production \
     -d cmdr_production \
     -c "
-- Add missing columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS company_description TEXT;

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS client_type TEXT DEFAULT 'client' 
CHECK (client_type IN ('client', 'prospect'));

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS prospect_stage TEXT 
CHECK (prospect_stage IN ('introduction', 'warm', 'likely_close', NULL));

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS converted_to_client_at TIMESTAMP;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_client_type ON users(client_type);
CREATE INDEX IF NOT EXISTS idx_users_prospect_stage ON users(prospect_stage);

SELECT 'Missing columns added successfully!' as status;
"

echo "✅ Migration complete!"

