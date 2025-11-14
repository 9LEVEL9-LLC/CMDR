-- Add credential_type to client_api_credentials table
ALTER TABLE client_api_credentials 
ADD COLUMN IF NOT EXISTS credential_type VARCHAR(50) DEFAULT 'api';

-- Set default credential types for existing records based on system name
UPDATE client_api_credentials 
SET credential_type = 'username_password'
WHERE system_name IN ('linkedin', 'website_hosting', 'website_hosting_peak');

UPDATE client_api_credentials 
SET credential_type = 'api'
WHERE credential_type IS NULL OR credential_type = '';

