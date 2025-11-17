-- Add missing columns to users table for CRM and profile functionality
-- These columns may already exist on some deployments, so we use ADD COLUMN IF NOT EXISTS

-- Add company_description column for profile details
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS company_description TEXT;

-- Add client_type column for CRM categorization
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS client_type TEXT DEFAULT 'client' 
CHECK (client_type IN ('client', 'prospect'));

-- Add prospect_stage column for prospect pipeline tracking
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS prospect_stage TEXT 
CHECK (prospect_stage IN ('introduction', 'warm', 'likely_close', NULL));

-- Add converted_to_client_at timestamp
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS converted_to_client_at TIMESTAMP;

-- Add index for better query performance on client_type
CREATE INDEX IF NOT EXISTS idx_users_client_type ON users(client_type);

-- Add index for prospect_stage
CREATE INDEX IF NOT EXISTS idx_users_prospect_stage ON users(prospect_stage);

