-- Set all existing companies as prospects with introduction stage
-- Run this AFTER add_crm_fields.sql migration

-- Update all existing client-role users to be prospects
UPDATE users 
SET 
  client_type = 'prospect',
  prospect_stage = 'introduction'
WHERE 
  role = 'client' 
  AND (client_type IS NULL OR client_type = 'client');

-- Comment for tracking
COMMENT ON COLUMN users.client_type IS 'Updated: All existing companies set to prospect by default';

