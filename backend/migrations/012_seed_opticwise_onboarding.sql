-- Seed OpticWise Account with Onboarding Data
-- Based on opticwise-kickoff.html template

-- First, ensure OpticWise user exists (create if not)
INSERT INTO users (role, name, email, username, password, company_name, website_url)
VALUES ('client', 'Bill Douglas', 'bill@opticwise.com', 'opticwise', 'opticwise2025', 'OpticWise', 'https://opticwise.com')
ON CONFLICT (username) DO UPDATE 
SET company_name = EXCLUDED.company_name, website_url = EXCLUDED.website_url;

-- Get the OpticWise user ID
DO $$
DECLARE
    opticwise_id INTEGER;
BEGIN
    SELECT id INTO opticwise_id FROM users WHERE username = 'opticwise';

    -- ============================================================
    -- POINTS OF CONTACT (Team Members)
    -- ============================================================
    
    INSERT INTO client_contacts (client_id, role, role_label, name, title, email, phone, best_time_to_reach, notes)
    VALUES 
    (opticwise_id, 'executive_sponsor', 'Executive Sponsor / Project Owner', '', '', '', '', '', 'Primary decision-maker and escalation point for the project.'),
    (opticwise_id, 'technical_lead', 'Technical Lead / IT Administrator', '', '', '', '', '', 'Responsible for providing system access, API credentials, and technical integrations.'),
    (opticwise_id, 'marketing_lead', 'Marketing/Sales Lead', '', '', '', '', '', 'Primary contact for marketing campaigns, messaging, and sales process insights.'),
    (opticwise_id, 'sales_rep', 'Sales Team Representative', '', '', '', '', '', 'Frontline salesperson who can provide insights on objections, sales process, and customer questions.'),
    (opticwise_id, 'content_owner', 'Content/Knowledge Owner', '', '', '', '', '', 'Person who manages company documentation, Google Docs, and internal knowledge base.');

    -- ============================================================
    -- API CREDENTIALS & SYSTEM ACCESS
    -- ============================================================
    
    INSERT INTO client_api_credentials (client_id, system_name, system_category, display_name, description, priority, status, api_url, documentation_url, required_permissions, setup_instructions, estimated_time_minutes)
    VALUES 
    -- Critical Priority
    (opticwise_id, 'google_workspace', 'productivity', 'Google Workspace (Google Docs, Drive)', 'Service account with read access to Google Drive and Docs', 'critical', 'pending', 'https://console.cloud.google.com', 'https://console.cloud.google.com', ARRAY['drive.readonly', 'docs.readonly'], 'We will guide you through creating a service account in Google Cloud Console', 15),
    
    (opticwise_id, 'slack', 'communication', 'Slack Workspace', 'Workspace admin access to install nBrain app', 'critical', 'pending', '', '', ARRAY['app:mentions:read', 'chat:write', 'files:read'], 'Workspace admin needs to install nBrain Slack app', 10),
    
    (opticwise_id, 'quickbooks', 'financial', 'QuickBooks Online', 'QuickBooks API OAuth credentials (read-only)', 'critical', 'pending', 'https://developer.intuit.com', 'https://developer.intuit.com', ARRAY['accounting.readonly'], 'We will create an app in QuickBooks Developer Portal', 20),
    
    -- High Priority
    (opticwise_id, 'sales_call_recordings', 'content', 'Sales Call Recordings Storage', 'Access to 8 months of sales call recordings', 'high', 'pending', '', '', ARRAY[]::TEXT[], 'Provide download link or folder access to call recordings', 30),
    
    (opticwise_id, 'website_hosting', 'infrastructure', 'Website Hosting & FTP Access (opticwise.com)', 'FTP/SFTP credentials for opticwise.com', 'high', 'pending', '', '', ARRAY['ftp.write'], 'Need FTP username, password, host, and port', 15),
    
    (opticwise_id, 'website_hosting_peak', 'infrastructure', 'Website Hosting (PeakPropertyPerformance.com)', 'FTP/SFTP credentials for PeakPropertyPerformance.com', 'high', 'pending', '', '', ARRAY['ftp.write'], 'Need FTP username, password, host, and port for second website', 15),
    
    (opticwise_id, 'linkedin', 'marketing', 'LinkedIn Sales Navigator', 'LinkedIn account for multi-channel outbound campaigns', 'high', 'pending', '', '', ARRAY[]::TEXT[], 'Account email and subscription type (Professional/Team/Enterprise)', 10),
    
    -- Normal Priority
    (opticwise_id, 'email_smtp', 'communication', 'Email Sending Infrastructure', 'SMTP service for email campaigns', 'normal', 'pending', '', '', ARRAY[]::TEXT[], 'Current email platform, sending domain, DNS access for SPF/DKIM', 30),
    
    (opticwise_id, 'sms_provider', 'communication', 'SMS Provider (Twilio)', 'SMS messaging for campaigns', 'normal', 'pending', 'https://www.twilio.com', 'https://www.twilio.com/docs', ARRAY[]::TEXT[], 'We can help set up Twilio account if none exists', 20),
    
    (opticwise_id, 'voicemail_drop', 'communication', 'Voicemail Drop Service', 'Slybroadcast or similar for voicemail campaigns', 'normal', 'pending', 'https://www.slybroadcast.com', '', ARRAY[]::TEXT[], 'We can help set up Slybroadcast account if none exists', 20),
    
    (opticwise_id, 'dns_management', 'infrastructure', 'DNS Management Access', 'For deploying chatbot and email authentication', 'normal', 'pending', '', '', ARRAY['dns.write'], 'Access to DNS management for domain verification', 15);

    -- ============================================================
    -- DOCUMENTATION & CONTENT NEEDED
    -- ============================================================
    
    INSERT INTO client_documentation (client_id, category, title, description, priority, status, content_type, checklist_items)
    VALUES 
    -- Critical Priority
    (opticwise_id, 'book', 'Published Book: "Who Owns Your Data?"', 'Complete digital copy for AI training', 'critical', 'pending', 'pdf', 
     '[{"label": "Complete digital copy (PDF, DOCX, or both)", "completed": false}, 
       {"label": "Book content organized by chapter (if available)", "completed": false}, 
       {"label": "Current inventory count (mentioned: 2,500 copies)", "completed": false}, 
       {"label": "Warehouse/storage location for physical copies", "completed": false}, 
       {"label": "Book distribution process", "completed": false}]'::jsonb),
    
    (opticwise_id, 'sales_calls', 'Sales Call Recordings (8 Months)', 'All recorded sales calls for AI training', 'critical', 'pending', 'audio', 
     '[{"label": "All recorded sales calls from past 8 months", "completed": false}, 
       {"label": "File naming convention (if any)", "completed": false}, 
       {"label": "Any existing transcripts or notes", "completed": false}, 
       {"label": "Call outcomes/results (closed, lost, pipeline stage)", "completed": false}]'::jsonb),
    
    (opticwise_id, 'gpt_data', 'Custom GPT Data (Objection & Question Analysis)', 'Existing analysis of objections and pushback', 'critical', 'pending', 'folder', 
     '[{"label": "Existing GPT analysis of objections and pushback", "completed": false}, 
       {"label": "Common questions and answers document", "completed": false}, 
       {"label": "Objection handling scripts or playbooks", "completed": false}, 
       {"label": "FAQ document (if exists)", "completed": false}]'::jsonb),
    
    -- High Priority
    (opticwise_id, 'google_docs', 'Google Docs Documentation', 'Company policies, procedures, and documentation', 'high', 'pending', 'folder', 
     '[{"label": "Complete access to relevant Google Drive folders", "completed": false}, 
       {"label": "Company policies and procedures", "completed": false}, 
       {"label": "Product specifications and technical documentation", "completed": false}, 
       {"label": "Sales playbooks and scripts", "completed": false}, 
       {"label": "Pricing sheets and contract templates", "completed": false}, 
       {"label": "Onboarding materials", "completed": false}]'::jsonb),
    
    (opticwise_id, 'market_research', 'Market Research & Interviews', '50 property owner interviews and research', 'high', 'pending', 'folder', 
     '[{"label": "50 property owner interviews (transcripts or recordings)", "completed": false}, 
       {"label": "Market research reports", "completed": false}, 
       {"label": "Competitive analysis documents", "completed": false}, 
       {"label": "Customer personas or profiles", "completed": false}]'::jsonb),
    
    -- Normal Priority
    (opticwise_id, 'podcast', 'Property Performance Podcast Content', 'All podcast episodes for training', 'normal', 'pending', 'audio', 
     '[{"label": "All podcast episodes (audio files)", "completed": false}, 
       {"label": "Episode transcripts (if available)", "completed": false}, 
       {"label": "Show notes and descriptions", "completed": false}, 
       {"label": "Guest information and topics covered", "completed": false}]'::jsonb),
    
    (opticwise_id, 'technical_specs', 'Technical Specifications & Product Information', 'System integration and product docs', 'normal', 'pending', 'folder', 
     '[{"label": "System integration documentation (HVAC, Access, Security, Lighting, etc.)", "completed": false}, 
       {"label": "Hardware specifications and requirements", "completed": false}, 
       {"label": "Network architecture diagrams", "completed": false}, 
       {"label": "Installation process documentation", "completed": false}, 
       {"label": "ROI calculators and case studies", "completed": false}]'::jsonb),
    
    (opticwise_id, 'marketing_assets', 'Marketing Assets & Previous Campaigns', 'Historical campaign data and assets', 'normal', 'pending', 'folder', 
     '[{"label": "Previous outbound campaign data (three failed attempts)", "completed": false}, 
       {"label": "Email templates and messaging used", "completed": false}, 
       {"label": "Landing pages and lead magnets", "completed": false}, 
       {"label": "Brand guidelines (logos, colors, fonts)", "completed": false}, 
       {"label": "Conference materials or booth displays", "completed": false}]'::jsonb);

    -- ============================================================
    -- STRATEGIC QUESTIONS
    -- ============================================================
    
    -- Business Context & Goals
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (opticwise_id, 'business_context', 'Business Context & Goals', 'What does success look like for this project in 3 months? (Specific metrics: number of qualified leads, demos booked, productivity improvements?)', 1),
    (opticwise_id, 'business_context', 'Business Context & Goals', 'What were the primary reasons the three previous outbound campaigns failed? (Wrong targeting? Poor messaging? No follow-up? No differentiation?)', 2),
    (opticwise_id, 'business_context', 'Business Context & Goals', 'What is your ideal customer profile? (Building size, property type, current pain points, geographic location, ownership structure?)', 3),
    (opticwise_id, 'business_context', 'Business Context & Goals', 'What percentage of your deals come from each property type? (Offices, Apartments, Hospitality, Other?)', 4),
    (opticwise_id, 'business_context', 'Business Context & Goals', 'What is your average deal size and contract length? (Monthly/annual recurring revenue?)', 5),
    (opticwise_id, 'business_context', 'Business Context & Goals', 'What is your current average sales cycle length? (From first contact to signed contract?)', 6),
    (opticwise_id, 'business_context', 'Business Context & Goals', 'What are your top 3 business priorities for 2025?', 7);
    
    -- Target Market & Outbound Strategy
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (opticwise_id, 'target_market', 'Target Market & Outbound Strategy', 'How do you currently identify true building owners vs. property managers? (Data sources, research process?)', 101),
    (opticwise_id, 'target_market', 'Target Market & Outbound Strategy', 'What conferences do you attend annually? (CRE Tech Conference - what others? Dates known?)', 102),
    (opticwise_id, 'target_market', 'Target Market & Outbound Strategy', 'What is your conference strategy? (Booth size, speaking opportunities, attendee list access?)', 103),
    (opticwise_id, 'target_market', 'Target Market & Outbound Strategy', 'Do you have existing lists of target prospects? (Building owners, property managers, conference attendees?)', 104),
    (opticwise_id, 'target_market', 'Target Market & Outbound Strategy', 'What lead sources are currently working? (You mentioned LinkedIn and book - anything else?)', 105),
    (opticwise_id, 'target_market', 'Target Market & Outbound Strategy', 'What is your current LinkedIn strategy? (Who is using it? What messaging? Any automation?)', 106),
    (opticwise_id, 'target_market', 'Target Market & Outbound Strategy', 'Do you have relationships with any commercial real estate associations or groups? (BOMA, IREM, NAIOP, etc.?)', 107);
    
    -- Sales Process & Objections
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (opticwise_id, 'sales_process', 'Sales Process & Objections', 'What are the top 5 objections you hear from prospects?', 201),
    (opticwise_id, 'sales_process', 'Sales Process & Objections', 'What questions do prospects ask most frequently?', 202),
    (opticwise_id, 'sales_process', 'Sales Process & Objections', 'What is your current sales process? (First call → demo → proposal → close?)', 203),
    (opticwise_id, 'sales_process', 'Sales Process & Objections', 'How do you currently qualify leads? (What makes a "good fit" vs. "not a good fit"?)', 204),
    (opticwise_id, 'sales_process', 'Sales Process & Objections', 'What is the typical decision-making unit? (Who needs to approve the purchase? C-suite, operations, finance?)', 205),
    (opticwise_id, 'sales_process', 'Sales Process & Objections', 'What is your current demo process? (Live demo? Case study presentation? Building walkthrough?)', 206),
    (opticwise_id, 'sales_process', 'Sales Process & Objections', 'What closes deals fastest? (ROI calculator? Case studies? Specific pain points?)', 207);
    
    -- Internal Operations & Team
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (opticwise_id, 'operations', 'Internal Operations & Team', 'How many employees currently waste time searching for information? (You mentioned 20% time waste - how many people total?)', 301),
    (opticwise_id, 'operations', 'Internal Operations & Team', 'What are the most common questions employees ask? (Pricing? Technical specs? Processes?)', 302),
    (opticwise_id, 'operations', 'Internal Operations & Team', 'Where is company knowledge currently scattered? (Google Docs, Slack, email, QuickBooks - what else?)', 303),
    (opticwise_id, 'operations', 'Internal Operations & Team', 'Do you have role-based information access? (Should sales see different info than engineering?)', 304),
    (opticwise_id, 'operations', 'Internal Operations & Team', 'What is your onboarding process for new employees? (How long does it take to get up to speed?)', 305),
    (opticwise_id, 'operations', 'Internal Operations & Team', 'What tools/platforms does your team use daily? (Beyond Slack, Google Docs, QuickBooks - CRM? Project management?)', 306),
    (opticwise_id, 'operations', 'Internal Operations & Team', 'How distributed is your team? (Locations? Time zones? Remote vs. hybrid?)', 307);
    
    -- Technical & Integration
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (opticwise_id, 'technical', 'Technical & Integration Requirements', 'Are there any systems we need to integrate with that were not mentioned? (Yardi? Building management platforms? Other CRMs?)', 401),
    (opticwise_id, 'technical', 'Technical & Integration Requirements', 'Do you have any technical constraints or security requirements? (Data residency, compliance, SOC 2?)', 402),
    (opticwise_id, 'technical', 'Technical & Integration Requirements', 'Who manages your current tech stack? (In-house IT? MSP? Contractors?)', 403),
    (opticwise_id, 'technical', 'Technical & Integration Requirements', 'Do you have website analytics installed? (Google Analytics? Hotjar? Other tracking?)', 404),
    (opticwise_id, 'technical', 'Technical & Integration Requirements', 'What is your current website traffic? (Monthly visitors? Lead conversion rate?)', 405),
    (opticwise_id, 'technical', 'Technical & Integration Requirements', 'Do you have a preferred appointment scheduling tool? (Calendly? Cal.com? Other?)', 406);
    
    -- Budget & Resources
    INSERT INTO client_questions (client_id, category, category_label, question, display_order)
    VALUES 
    (opticwise_id, 'budget', 'Budget & Resources', 'Beyond the $30K implementation, do you have budget for outbound tools? (LinkedIn Sales Navigator, email platform, SMS credits?)', 501),
    (opticwise_id, 'budget', 'Budget & Resources', 'Who will be the day-to-day contact during implementation? (Project manager? Technical contact?)', 502),
    (opticwise_id, 'budget', 'Budget & Resources', 'How much time can your team dedicate to this project? (Weekly check-ins? Content reviews? Testing?)', 503),
    (opticwise_id, 'budget', 'Budget & Resources', 'After the 3-month implementation, do you prefer ongoing maintenance or ad-hoc support?', 504);

    -- ============================================================
    -- TIMELINE & MILESTONES (3-Month Implementation)
    -- ============================================================
    
    INSERT INTO client_milestones (client_id, week_number, phase, title, description, deliverables, client_requirements, display_order, is_critical)
    VALUES 
    -- Month 1
    (opticwise_id, 1, 'AI Brain Foundation', 'Kickoff & Access', 'Project kickoff meeting and access provisioning', 
     ARRAY['Project kickoff meeting', 'Access provisioning started', 'Document collection begins'], 
     ARRAY['Attend kickoff call', 'Provide all credentials', 'Share book content', 'Grant Google Drive access'], 1, true),
    
    (opticwise_id, 2, 'AI Brain Foundation', 'Data Ingestion', 'Ingest and process all knowledge sources', 
     ARRAY['Book content ingested', 'Sales calls processed', 'Google Docs imported', 'Knowledge base structured'], 
     ARRAY['Provide sales call recordings', 'Review knowledge structure', 'Identify any missing content'], 2, true),
    
    (opticwise_id, 3, 'AI Brain Foundation', 'Internal AI Deployment', 'Deploy Slack AI assistant and integrations', 
     ARRAY['Slack AI assistant live', 'QuickBooks integration', 'Permission structure set', 'Team training materials'], 
     ARRAY['Install Slack app', 'Authorize QuickBooks', 'Test AI assistant', 'Provide feedback'], 3, true),
    
    (opticwise_id, 4, 'AI Brain Foundation', 'Audit Tool Development', 'Build interactive audit tool', 
     ARRAY['Interactive audit tool built', 'Qualification questions finalized', 'Calendly/booking integration', 'Testing and refinement'], 
     ARRAY['Review audit questions', 'Approve qualification criteria', 'Provide calendar link', 'Test tool flow'], 4, false),
    
    -- Month 2
    (opticwise_id, 5, 'Marketing Automation & External Chat', 'Marketing Platform Build', 'Set up marketing automation infrastructure', 
     ARRAY['Email integration complete', 'LinkedIn setup', 'SMS provider configured', 'Voicemail drop ready'], 
     ARRAY['Approve email templates', 'Provide LinkedIn access', 'Review messaging', 'Test sends'], 5, true),
    
    (opticwise_id, 6, 'Marketing Automation & External Chat', 'Workflow Builder', 'Build campaign workflows and CRM', 
     ARRAY['Drag-and-drop builder live', 'Built-in CRM functional', 'First campaign created', 'Training on platform'], 
     ARRAY['Upload target prospect lists', 'Review campaign logic', 'Attend training session', 'Approve first campaign'], 6, true),
    
    (opticwise_id, 7, 'Marketing Automation & External Chat', 'Website Chatbot', 'Deploy AI chatbot on website', 
     ARRAY['Chatbot deployed on website', 'Lead qualification flow active', 'Appointment booking working', 'Analytics tracking live'], 
     ARRAY['Provide website access', 'Review chatbot personality', 'Test conversations', 'Approve deployment'], 7, false),
    
    (opticwise_id, 8, 'Marketing Automation & External Chat', 'Website Replication', 'Clone both websites as static code', 
     ARRAY['opticwise.com replicated', 'PeakPropertyPerformance.com replicated', 'Static code delivered', 'Hosting recommendations'], 
     ARRAY['Review replicated sites', 'Approve accuracy', 'Decide on hosting'], 8, false),
    
    -- Month 3
    (opticwise_id, 9, 'Optimization & Full Activation', 'Campaign Launch', 'Launch full outbound campaigns', 
     ARRAY['First outbound campaigns live', 'Book distribution automation', 'Conference campaign template', 'Daily monitoring active'], 
     ARRAY['Final campaign approval', 'Monitor initial sends', 'Provide feedback', 'Track first leads'], 9, true),
    
    (opticwise_id, 10, 'Optimization & Full Activation', 'Optimization', 'A/B testing and refinement', 
     ARRAY['A/B testing results', 'Message optimization', 'Lead scoring refinement', 'Performance reports'], 
     ARRAY['Review analytics', 'Provide sales feedback', 'Identify top performers', 'Suggest improvements'], 10, false),
    
    (opticwise_id, 11, 'Optimization & Full Activation', 'Scale & Expand', 'Scale campaigns and expand functionality', 
     ARRAY['Additional campaigns launched', 'Advanced workflows created', 'Team fully trained', 'Documentation completed'], 
     ARRAY['Approve new campaigns', 'Expand target lists', 'Train additional team members'], 11, false),
    
    (opticwise_id, 12, 'Optimization & Full Activation', 'Handoff & Wrap-Up', 'Complete platform handoff', 
     ARRAY['Complete platform handoff', 'Full documentation delivered', 'Performance analysis', 'Future roadmap discussion'], 
     ARRAY['Attend final review', 'Approve deliverables', 'Decide on ongoing support', 'Provide testimonial/feedback'], 12, true);

    -- ============================================================
    -- SUCCESS METRICS & KPIs
    -- ============================================================
    
    -- Module 1: AI Brain
    INSERT INTO client_success_metrics (client_id, category, module, metric_name, metric_description, target_value, unit, display_order)
    VALUES 
    (opticwise_id, 'module_specific', 'ai_brain', 'Documents Ingested', 'Number of documents ingested into knowledge base', 0, 'count', 1),
    (opticwise_id, 'module_specific', 'ai_brain', 'Query Response Accuracy', 'Knowledge base query response accuracy', 95, 'percent', 2),
    (opticwise_id, 'module_specific', 'ai_brain', 'Employee Satisfaction', 'Employee satisfaction with internal AI (1-10 rating)', 8, 'rating', 3),
    (opticwise_id, 'module_specific', 'ai_brain', 'Time Saved Per Query', 'Average time saved per employee query', 7.5, 'minutes', 4);
    
    -- Module 2: Marketing Automation
    INSERT INTO client_success_metrics (client_id, category, module, metric_name, metric_description, target_value, current_value, unit, display_order)
    VALUES 
    (opticwise_id, 'marketing', 'marketing_automation', 'Audit Completion Rate', 'Percentage of visitors who complete the audit tool', 25, 0, 'percent', 10),
    (opticwise_id, 'marketing', 'marketing_automation', 'Demo Booking Rate', 'Percentage of audits that book demos', 7.5, 0, 'percent', 11),
    (opticwise_id, 'marketing', 'marketing_automation', 'Email Open Rate', 'Cold outbound email open rate', 30, 0, 'percent', 12),
    (opticwise_id, 'marketing', 'marketing_automation', 'Email Reply Rate', 'Positive email engagement rate', 4, 0, 'percent', 13),
    (opticwise_id, 'marketing', 'marketing_automation', 'LinkedIn Acceptance Rate', 'LinkedIn connection acceptance rate', 35, 0, 'percent', 14),
    (opticwise_id, 'marketing', 'marketing_automation', 'LinkedIn Response Rate', 'LinkedIn message response rate', 12.5, 0, 'percent', 15),
    (opticwise_id, 'marketing', 'marketing_automation', 'Cost Per Lead Reduction', 'Reduction in cost per qualified lead', 62.5, 0, 'percent', 16);
    
    -- Module 3: AI Chat
    INSERT INTO client_success_metrics (client_id, category, module, metric_name, metric_description, target_value, unit, display_order)
    VALUES 
    (opticwise_id, 'module_specific', 'ai_chat', 'Internal Query Success Rate', 'Internal queries answered successfully', 90, 'percent', 20),
    (opticwise_id, 'module_specific', 'ai_chat', 'Chatbot Engagement Rate', 'Website visitors who engage with chatbot', 20, 'percent', 21),
    (opticwise_id, 'module_specific', 'ai_chat', 'Chatbot Conversion Rate', 'Chatbot conversations that book appointments', 7.5, 'percent', 22),
    (opticwise_id, 'module_specific', 'ai_chat', 'Average Conversation Length', 'Average conversation exchanges before goal', 5, 'exchanges', 23);
    
    -- Business Impact (90-Day Outcomes)
    INSERT INTO client_success_metrics (client_id, category, metric_name, metric_description, target_value, baseline_value, unit, display_order, priority)
    VALUES 
    (opticwise_id, 'business_impact', 'Qualified Leads Generated', 'Number of qualified leads in 90 days', 75, 0, 'count', 30, 'high'),
    (opticwise_id, 'business_impact', 'Demos/Consultations Booked', 'Number of demos or consultations booked', 30, 0, 'count', 31, 'high'),
    (opticwise_id, 'business_impact', 'Deals Closed', 'Number of deals closed (given 5-10 year contract value)', 2.5, 0, 'count', 32, 'high'),
    (opticwise_id, 'business_impact', 'Pipeline Value Created', 'ARR pipeline value created in 90 days', 300000, 0, 'dollars', 33, 'high'),
    (opticwise_id, 'business_impact', 'Employee Productivity Gain', 'Percentage time savings for employees', 20, 0, 'percent', 34, 'normal'),
    (opticwise_id, 'business_impact', 'Sales Cycle Reduction', 'Reduction in sales cycle length (months)', 3, 6, 'months', 35, 'normal');

END $$;

