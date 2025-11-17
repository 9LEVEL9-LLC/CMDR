#!/bin/bash
# Seed Matt Meuli's complete ecosystem based on Platform-Ecosystem.md
# Run this AFTER create-matt-meuli.sh

psql $DATABASE_URL << 'EOF'
-- Get Matt's client ID
DO $$
DECLARE
  matt_id INT;
BEGIN
  SELECT id INTO matt_id FROM users WHERE username = 'mattmeuli';
  
  -- ===========================================
  -- TEAM CONTACTS (from Platform Ecosystem)
  -- ===========================================
  
  -- Executive Sponsor / Project Owner
  INSERT INTO client_contacts (
    client_id, role, role_label, name, title, email, phone, 
    best_time_to_reach, notes
  ) VALUES (
    matt_id,
    'executive_sponsor',
    NULL,
    'Matt Meuli',
    'Managing Partner',
    'matt@wyomingassetprotection.com',
    '(307) 555-0100',
    'Weekdays 9am-6pm MST',
    'Primary decision maker for all strategic AI initiatives and platform development.'
  );
  
  -- Technical Lead / IT Administrator
  INSERT INTO client_contacts (
    client_id, role, role_label, name, title, email, phone,
    best_time_to_reach, systems_managed, notes
  ) VALUES (
    matt_id,
    'technical_lead',
    NULL,
    'Sarah Chen',
    'IT Director',
    'sarah.chen@wyomingassetprotection.com',
    '(307) 555-0101',
    'Weekdays 8am-5pm MST',
    'Google Workspace, QuickBooks Online, Clio Practice Management, Custom CRM',
    'Manages all technical systems and has admin access to all platforms.'
  );
  
  -- Marketing/Sales Lead
  INSERT INTO client_contacts (
    client_id, role, role_label, name, title, email, phone,
    best_time_to_reach, current_tools, notes
  ) VALUES (
    matt_id,
    'marketing_lead',
    NULL,
    'Jennifer Martinez',
    'Business Development Director',
    'jennifer@wyomingassetprotection.com',
    '(307) 555-0102',
    'Weekdays 9am-7pm MST',
    'HubSpot CRM, Mailchimp, LinkedIn Sales Navigator',
    'Leads client acquisition and retention strategies. Key stakeholder for client-facing AI features.'
  );
  
  -- Content/Knowledge Owner
  INSERT INTO client_contacts (
    client_id, role, role_label, name, title, email, phone,
    best_time_to_reach, documentation_location, notes
  ) VALUES (
    matt_id,
    'content_owner',
    NULL,
    'David Thompson',
    'Senior Legal Counsel',
    'david.thompson@wyomingassetprotection.com',
    '(307) 555-0103',
    'Weekdays 10am-4pm MST',
    'https://drive.google.com/drive/folders/legal-templates-knowledge-base',
    'Owns all legal templates, knowledge base content, and document workflows.'
  );
  
  -- Custom Role: Operations Manager
  INSERT INTO client_contacts (
    client_id, role, role_label, name, title, email, phone,
    best_time_to_reach, notes
  ) VALUES (
    matt_id,
    'custom',
    'Operations Manager',
    'Lisa Anderson',
    'Operations Manager',
    'lisa.anderson@wyomingassetprotection.com',
    '(307) 555-0104',
    'Weekdays 8am-6pm MST',
    'Manages day-to-day operations and client onboarding workflows.'
  );
  
  -- ===========================================
  -- API CREDENTIALS & SYSTEM ACCESS
  -- ===========================================
  
  -- Google Workspace API
  INSERT INTO client_api_credentials (
    client_id, system_name, system_category, display_name, description,
    priority, status, api_url, documentation_url,
    setup_instructions, estimated_time_minutes
  ) VALUES (
    matt_id,
    'Google Workspace',
    'productivity',
    'Google Workspace Admin API',
    'Access to Gmail, Calendar, Drive for document management and automation',
    'critical',
    'pending',
    'https://console.cloud.google.com',
    'https://developers.google.com/workspace',
    'We need:
1. Service account credentials (JSON key file)
2. Domain-wide delegation enabled
3. API scopes: Gmail API, Calendar API, Drive API
4. Admin email for impersonation

Steps:
- Go to Google Cloud Console
- Create new project or use existing
- Enable APIs: Gmail, Calendar, Drive
- Create service account
- Download JSON key
- Enable domain-wide delegation in Workspace Admin',
    30
  );
  
  -- Clio Practice Management
  INSERT INTO client_api_credentials (
    client_id, system_name, system_category, display_name, description,
    priority, status, api_url, documentation_url,
    setup_instructions, estimated_time_minutes
  ) VALUES (
    matt_id,
    'Clio',
    'legal_tech',
    'Clio Practice Management API',
    'Integration with legal practice management for client data, documents, and billing',
    'critical',
    'pending',
    'https://app.clio.com/settings/integrations',
    'https://docs.clio.com/',
    'We need:
1. API Client ID
2. API Client Secret
3. OAuth 2.0 authorization for the following scopes:
   - Read/Write Clients
   - Read/Write Matters
   - Read Documents
   - Read Billing

Steps:
- Log into Clio Manage
- Go to Settings > Integrations > API
- Create new app/integration
- Note Client ID and Secret
- Authorize required scopes',
    20
  );
  
  -- QuickBooks Online
  INSERT INTO client_api_credentials (
    client_id, system_name, system_category, display_name, description,
    priority, status, api_url, documentation_url,
    setup_instructions, estimated_time_minutes
  ) VALUES (
    matt_id,
    'QuickBooks Online',
    'accounting',
    'QuickBooks Online API',
    'Financial data integration for invoicing, expenses, and reporting',
    'high',
    'pending',
    'https://developer.intuit.com',
    'https://developer.intuit.com/app/developer/qbo/docs/get-started',
    'We need:
1. App Client ID
2. App Client Secret
3. OAuth 2.0 connection to your QuickBooks company

Steps:
- Go to Intuit Developer Portal
- Create new app (select QuickBooks Online API)
- Get Client ID and Client Secret
- We will handle OAuth flow to connect to your QuickBooks account',
    25
  );
  
  -- HubSpot CRM
  INSERT INTO client_api_credentials (
    client_id, system_name, system_category, display_name, description,
    priority, status, api_url, documentation_url,
    setup_instructions, estimated_time_minutes
  ) VALUES (
    matt_id,
    'HubSpot',
    'crm',
    'HubSpot CRM API',
    'Marketing automation and CRM integration for lead tracking and communication',
    'high',
    'pending',
    'https://app.hubspot.com/developer',
    'https://developers.hubspot.com/docs/api/overview',
    'We need:
1. Private App Access Token OR
2. OAuth App credentials (Client ID/Secret)

Recommended: Private App
Steps:
- Go to HubSpot Settings > Integrations > Private Apps
- Create new private app
- Grant scopes: CRM (read/write), Marketing (read), Timeline
- Copy access token

Alternative: OAuth App (for multi-account)
- Create app in developer portal
- Note Client ID and Secret',
    15
  );
  
  -- Mailchimp
  INSERT INTO client_api_credentials (
    client_id, system_name, system_category, display_name, description,
    priority, status, api_url, documentation_url,
    setup_instructions, estimated_time_minutes
  ) VALUES (
    matt_id,
    'Mailchimp',
    'marketing',
    'Mailchimp Marketing API',
    'Email campaign management and list synchronization',
    'normal',
    'pending',
    'https://mailchimp.com/developer/',
    'https://mailchimp.com/developer/marketing/guides/quick-start/',
    'We need:
1. API Key

Steps:
- Log into Mailchimp
- Go to Profile > Extras > API Keys
- Create new API key
- Copy the key (starts with your username)
- Note your server prefix (e.g., us19)',
    10
  );
  
  -- Database Access (PostgreSQL)
  INSERT INTO client_api_credentials (
    client_id, system_name, system_category, display_name, description,
    priority, status, api_url, documentation_url,
    setup_instructions, estimated_time_minutes
  ) VALUES (
    matt_id,
    'PostgreSQL Database',
    'database',
    'Production Database Access',
    'Read-only access to production database for reporting and data extraction',
    'normal',
    'pending',
    NULL,
    'https://www.postgresql.org/docs/',
    'We need:
1. Database host/endpoint
2. Port (usually 5432)
3. Database name
4. Read-only username
5. Password for read-only user

Security Note:
- Create a dedicated read-only user
- Grant SELECT permissions only
- Use SSL connection
- Whitelist our IP addresses',
    20
  );
  
  -- ===========================================
  -- STRATEGIC QUESTIONS
  -- ===========================================
  
  -- Business Context & Goals
  INSERT INTO client_questions (
    client_id, category, category_label, question, display_order, status
  ) VALUES 
    (matt_id, 'business_context', 'Business Context & Goals', 
     'What are the primary business challenges you are currently facing that AI could help address?', 
     1, 'pending'),
    (matt_id, 'business_context', 'Business Context & Goals',
     'What are your top 3 business objectives for the next 12 months?',
     2, 'pending'),
    (matt_id, 'business_context', 'Business Context & Goals',
     'How do you currently measure success in your practice? What are your key performance indicators?',
     3, 'pending');
  
  -- Current Systems & Workflows
  INSERT INTO client_questions (
    client_id, category, category_label, question, display_order, status
  ) VALUES
    (matt_id, 'current_systems', 'Current Systems & Workflows',
     'Walk us through your current client onboarding process from initial contact to case opening.',
     4, 'pending'),
    (matt_id, 'current_systems', 'Current Systems & Workflows',
     'What are the biggest bottlenecks or pain points in your current workflows?',
     5, 'pending'),
    (matt_id, 'current_systems', 'Current Systems & Workflows',
     'Which manual tasks take up the most time for your team each week?',
     6, 'pending');
  
  -- Client & Market
  INSERT INTO client_questions (
    client_id, category, category_label, question, display_order, status
  ) VALUES
    (matt_id, 'client_market', 'Client & Market Understanding',
     'Describe your ideal client profile. What industries, company sizes, or individual characteristics?',
     7, 'pending'),
    (matt_id, 'client_market', 'Client & Market Understanding',
     'What are the most common questions or concerns your clients have when they first engage with you?',
     8, 'pending'),
    (matt_id, 'client_market', 'Client & Market Understanding',
     'How do most of your new clients find you? (referrals, SEO, advertising, etc.)',
     9, 'pending');
  
  -- Document & Knowledge Management
  INSERT INTO client_questions (
    client_id, category, category_label, question, display_order, status
  ) VALUES
    (matt_id, 'documents_knowledge', 'Document & Knowledge Management',
     'What types of legal documents do you generate most frequently?',
     10, 'pending'),
    (matt_id, 'documents_knowledge', 'Document & Knowledge Management',
     'How is your knowledge base currently organized? (templates, precedents, best practices)',
     11, 'pending'),
    (matt_id, 'documents_knowledge', 'Document & Knowledge Management',
     'What percentage of your documents require customization vs. using standard templates?',
     12, 'pending');
  
  -- Technology & Integration
  INSERT INTO client_questions (
    client_id, category, category_label, question, display_order, status
  ) VALUES
    (matt_id, 'technology', 'Technology & Integration Requirements',
     'What is your team''s current comfort level with technology and new tools? (1-10 scale)',
     13, 'pending'),
    (matt_id, 'technology', 'Technology & Integration Requirements',
     'Are there any existing integrations or automations you''ve implemented successfully?',
     14, 'pending'),
    (matt_id, 'technology', 'Technology & Integration Requirements',
     'What security or compliance requirements must we consider? (e.g., HIPAA, attorney-client privilege)',
     15, 'pending');
  
  -- AI Vision & Expectations
  INSERT INTO client_questions (
    client_id, category, category_label, question, display_order, status
  ) VALUES
    (matt_id, 'ai_vision', 'AI Vision & Expectations',
     'If you could wave a magic wand, what would AI do for your practice?',
     16, 'pending'),
    (matt_id, 'ai_vision', 'AI Vision & Expectations',
     'What concerns or hesitations do you have about implementing AI in your practice?',
     17, 'pending'),
    (matt_id, 'ai_vision', 'AI Vision & Expectations',
     'What would a successful AI implementation look like 6 months from now?',
     18, 'pending');
  
  -- ===========================================
  -- PROJECT CREATION
  -- ===========================================
  
  -- Create a sample project for Matt
  INSERT INTO projects (
    client_id, name, status, eta, project_stage
  ) VALUES (
    matt_id,
    'Legal Platform AI Integration',
    'active',
    'Q2 2025',
    'Scope'
  );
  
  RAISE NOTICE 'Matt Meuli ecosystem fully seeded!';
END $$;

-- Verification Queries
SELECT 'Team Contacts Created:' as summary, COUNT(*)::text as count 
FROM client_contacts WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli');

SELECT 'API Credentials Created:' as summary, COUNT(*)::text as count 
FROM client_api_credentials WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli');

SELECT 'Strategic Questions Created:' as summary, COUNT(*)::text as count 
FROM client_questions WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli');

SELECT 'Projects Created:' as summary, COUNT(*)::text as count 
FROM projects WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli');
EOF

echo ""
echo "✅ Matt Meuli ecosystem fully seeded!"
echo ""
echo "Summary:"
echo "- Team Contacts: 5 contacts added"
echo "- API Credentials: 6 systems configured"
echo "- Strategic Questions: 18 questions across 6 categories"
echo "- Projects: 1 active project created"
echo ""

