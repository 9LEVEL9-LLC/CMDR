-- Add CRM fields to support prospect management and client distinction
-- This migration adds fields to track prospect stages and client types

-- Add client_type field to distinguish clients from prospects
ALTER TABLE users ADD COLUMN IF NOT EXISTS client_type TEXT DEFAULT 'client' CHECK (client_type IN ('client', 'prospect'));

-- Add prospect_stage field for tracking prospect progress (defaults to 'introduction')
ALTER TABLE users ADD COLUMN IF NOT EXISTS prospect_stage TEXT CHECK (prospect_stage IN ('introduction', 'warm', 'likely_close', NULL));

-- Add converted_to_client_at timestamp to track when prospects become clients
ALTER TABLE users ADD COLUMN IF NOT EXISTS converted_to_client_at TIMESTAMP;

-- Update existing users to have proper client_type
-- All existing users with role='client' should be marked as 'client' type
UPDATE users SET client_type = 'client' WHERE role = 'client' AND client_type IS NULL;

-- Set all prospects without a stage to 'introduction' (default first stage)
UPDATE users SET prospect_stage = 'introduction' WHERE client_type = 'prospect' AND prospect_stage IS NULL;

-- Create index for faster CRM queries
CREATE INDEX IF NOT EXISTS idx_users_client_type ON users(client_type);
CREATE INDEX IF NOT EXISTS idx_users_prospect_stage ON users(prospect_stage);

-- Add comments for documentation
COMMENT ON COLUMN users.client_type IS 'Distinguishes between active clients and prospects';
COMMENT ON COLUMN users.prospect_stage IS 'Tracks prospect progress: introduction, warm, likely_close';
COMMENT ON COLUMN users.converted_to_client_at IS 'Timestamp when a prospect was converted to a client';

