-- Update OpticWise Google Workspace credential with comprehensive instructions
UPDATE client_api_credentials 
SET 
  setup_instructions = 'We need full Google Workspace API access for the following capabilities:

1. GMAIL API ACCESS (Read & Send):
   - Read all emails across your organization
   - Send emails on behalf of users
   - Search and retrieve existing emails
   - Access email metadata and attachments

2. GOOGLE DRIVE API ACCESS (Read & Write):
   - Read all files and folders
   - Create, update, and organize files
   - Upload and download documents
   - Manage sharing permissions

3. GOOGLE DOCS/SHEETS API ACCESS:
   - Read and edit documents
   - Create new docs/sheets
   - Export in various formats

SETUP STEPS:
1. Go to Google Cloud Console (console.cloud.google.com)
2. Create a new project or select existing project
3. Enable the following APIs:
   - Gmail API
   - Google Drive API
   - Google Docs API
   - Google Sheets API
4. Create Service Account credentials
5. Grant domain-wide delegation to the service account
6. Download the JSON key file
7. Share necessary Drive folders with the service account email

REQUIRED SCOPES:
- https://www.googleapis.com/auth/gmail.readonly
- https://www.googleapis.com/auth/gmail.send
- https://www.googleapis.com/auth/gmail.modify
- https://www.googleapis.com/auth/drive
- https://www.googleapis.com/auth/documents
- https://www.googleapis.com/auth/spreadsheets

WHAT TO PROVIDE:
Please paste the entire Service Account JSON key file in the credentials box below, or upload the JSON file directly.',
  api_url = 'https://console.cloud.google.com',
  documentation_url = 'https://developers.google.com/workspace',
  estimated_time_minutes = 30
WHERE system_name = 'google_workspace' 
  AND client_id = (SELECT id FROM users WHERE username = 'opticwise');

-- Add Render account credential for OpticWise
INSERT INTO client_api_credentials (
  client_id, 
  system_name, 
  system_category, 
  display_name, 
  description, 
  priority, 
  status, 
  api_url, 
  documentation_url, 
  required_permissions, 
  setup_instructions, 
  estimated_time_minutes
)
SELECT 
  id,
  'render',
  'infrastructure',
  'Render Account (Hosting Platform)',
  'Render account for hosting backend, database, and services',
  'critical',
  'pending',
  'https://render.com',
  'https://render.com/docs',
  ARRAY[]::TEXT[],
  'We need you to create a Render account and add danny@nbrain.ai as an admin user.

SETUP STEPS:
1. Go to https://render.com
2. Sign up for an account using your company email
3. Subscribe to the $20/month paid plan (required for team features and better performance)
4. Once account is created, go to Account Settings → Team
5. Click "Invite Team Member"
6. Add danny@nbrain.ai as an Admin user
7. We will accept the invitation and set up your infrastructure

WHY WE NEED THIS:
- Deploy and manage your backend services
- Host PostgreSQL database
- Set up environment variables and configurations
- Monitor application performance
- Manage deployments and scaling

WHAT TO PROVIDE:
Once you have created the account and added danny@nbrain.ai as admin, please paste your Render account email and confirmation that the invitation was sent in the credentials box below.',
  15
FROM users 
WHERE username = 'opticwise'
ON CONFLICT DO NOTHING;

