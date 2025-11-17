#!/bin/bash
# Seed Matt Meuli's AI Ecosystem Roadmap
# Run this AFTER the roadmap tables are created

psql $DATABASE_URL << 'EOF'
DO $$
DECLARE
  matt_id INT;
  roadmap_id INT;
  dept_legal_id INT;
  dept_ops_id INT;
  dept_marketing_id INT;
  node_clio_id INT;
  node_docs_id INT;
  node_intake_id INT;
  node_knowledge_id INT;
  node_crm_id INT;
  node_brain_id INT;
  node_google_id INT;
  node_qb_id INT;
  node_portal_id INT;
  node_email_id INT;
BEGIN
  -- Get Matt's user ID
  SELECT id INTO matt_id FROM users WHERE username = 'mattmeuli';
  
  -- Create or get roadmap config
  INSERT INTO ai_roadmap_configs (user_id, name, description)
  VALUES (matt_id, 'Meuli & Associates AI Transformation Roadmap', 'Complete AI adoption roadmap for legal practice management, document automation, and client services.')
  ON CONFLICT DO NOTHING;
  
  SELECT id INTO roadmap_id FROM ai_roadmap_configs WHERE user_id = matt_id LIMIT 1;
  
  -- ===========================================
  -- DEPARTMENTS
  -- ===========================================
  
  -- Legal Operations Department
  INSERT INTO roadmap_departments (roadmap_config_id, name, color, position_x, position_y, ai_adoption_score, description)
  VALUES (roadmap_id, 'Legal Operations', '#3B82F6', 100, 100, 35, 'Core legal practice management and document workflows')
  RETURNING id INTO dept_legal_id;
  
  -- Business Operations Department
  INSERT INTO roadmap_departments (roadmap_config_id, name, color, position_x, position_y, ai_adoption_score, description)
  VALUES (roadmap_id, 'Business Operations', '#10B981', 100, 400, 25, 'Client management, billing, and operational efficiency')
  RETURNING id INTO dept_ops_id;
  
  -- Marketing & Client Acquisition Department
  INSERT INTO roadmap_departments (roadmap_config_id, name, color, position_x, position_y, ai_adoption_score, description)
  VALUES (roadmap_id, 'Marketing & Sales', '#F59E0B', 100, 700, 40, 'Lead generation, client communication, and marketing automation')
  RETURNING id INTO dept_marketing_id;
  
  -- ===========================================
  -- ECOSYSTEM NODES (Based on Platform Ecosystem)
  -- ===========================================
  
  -- CENTRAL AI BRAIN - Hub for all integrations
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline,
    position_x, position_y, width, height, custom_data
  ) VALUES (
    roadmap_id, 'milestone', 'Central AI Brain',
    'Unified AI orchestration layer that connects all systems, manages data flows, and provides intelligent automation across the entire practice.',
    'Core Platform',
    'in_progress', 'critical', 250000, 'Ongoing',
    700, 400, 320, 160,
    '{"is_central_hub": true, "icon": "brain", "highlight": true}'::jsonb
  ) RETURNING id INTO node_brain_id;
  
  -- Clio Practice Management Integration
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category, 
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'integration', 'Clio API Integration', 
    'Integrate with Clio Practice Management for client data, matters, documents, and billing automation.',
    'Legal Tech Integration',
    'in_progress', 'critical', 50000, '4-6 weeks', dept_legal_id,
    350, 80, 260, 130
  ) RETURNING id INTO node_clio_id;
  
  -- Document Automation System
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'project', 'Document Generation Engine',
    'AI-powered document automation for 500+ legal templates. Auto-fill from client data, reduce 20-30 hours/week of manual work.',
    'Document Automation',
    'planned', 'critical', 100000, '6-8 weeks', dept_legal_id,
    1050, 80, 260, 130
  ) RETURNING id INTO node_docs_id;
  
  -- Client Intake Automation
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'project', 'Automated Client Intake',
    'AI-assisted intake forms for 50-75 new clients/month. Smart questionnaires, data validation, and Clio sync.',
    'Client Services',
    'planned', 'high', 75000, '3-4 weeks', dept_ops_id,
    250, 280, 260, 130
  ) RETURNING id INTO node_intake_id;
  
  -- Legal Knowledge Base & RAG
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'project', 'AI Knowledge Base (RAG)',
    'Retrieval-Augmented Generation system for 500+ legal templates and precedents. Smart search and recommendations.',
    'Knowledge Management',
    'planned', 'high', 60000, '8-10 weeks', dept_legal_id,
    550, 600, 260, 130
  ) RETURNING id INTO node_knowledge_id;
  
  -- HubSpot CRM Integration
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'integration', 'HubSpot CRM Automation',
    'Marketing automation and lead tracking integration. Sync with client database and automate follow-ups.',
    'Marketing Tech',
    'planned', 'medium', 40000, '3-4 weeks', dept_marketing_id,
    950, 280, 260, 130
  ) RETURNING id INTO node_crm_id;
  
  -- Google Workspace Integration
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'integration', 'Google Workspace API',
    'Gmail, Calendar, and Drive integration for document management and communication automation.',
    'Productivity',
    'in_progress', 'high', 30000, '2-3 weeks', dept_ops_id,
    1150, 520, 260, 130
  ) RETURNING id INTO node_google_id;
  
  -- QuickBooks Integration
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'integration', 'QuickBooks Online Sync',
    'Automated billing, invoicing, and financial reporting. Sync with Clio for seamless accounting.',
    'Financial Management',
    'planned', 'medium', 35000, '3-4 weeks', dept_ops_id,
    250, 520, 260, 130
  ) RETURNING id INTO node_qb_id;
  
  -- Client Portal
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'project', 'Client Self-Service Portal',
    'Secure portal for clients to track cases, upload documents, sign agreements, and communicate with team.',
    'Client Experience',
    'planned', 'high', 55000, '6-8 weeks', dept_ops_id,
    950, 520, 260, 130
  ) RETURNING id INTO node_portal_id;
  
  -- Email Automation (Mailchimp)
  INSERT INTO roadmap_nodes (
    roadmap_config_id, node_type, title, description, category,
    status, priority, estimated_roi, estimated_timeline, department_id,
    position_x, position_y, width, height
  ) VALUES (
    roadmap_id, 'integration', 'Email Campaign Automation',
    'Mailchimp integration for client communications, newsletters, and automated follow-up sequences.',
    'Marketing Automation',
    'planned', 'low', 20000, '2-3 weeks', dept_marketing_id,
    1150, 280, 260, 130
  ) RETURNING id INTO node_email_id;
  
  -- ===========================================
  -- DEPENDENCIES / EDGES - All connect through Central AI Brain
  -- ===========================================
  
  -- AI Brain connects to Clio
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_clio_id, 'orchestration', 'Legal data sync', true);
  
  -- AI Brain connects to Document Engine
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_docs_id, 'orchestration', 'Template processing', true);
  
  -- AI Brain connects to Client Intake
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_intake_id, 'orchestration', 'Intake automation', true);
  
  -- AI Brain connects to Knowledge Base
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_knowledge_id, 'orchestration', 'RAG intelligence', true);
  
  -- AI Brain connects to HubSpot CRM
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_crm_id, 'orchestration', 'Marketing sync', false);
  
  -- AI Brain connects to Google Workspace
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_google_id, 'orchestration', 'Workspace integration', true);
  
  -- AI Brain connects to QuickBooks
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_qb_id, 'orchestration', 'Financial sync', false);
  
  -- AI Brain connects to Client Portal
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_portal_id, 'orchestration', 'Client interface', true);
  
  -- AI Brain connects to Email Automation
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_brain_id, node_email_id, 'orchestration', 'Email campaigns', false);
  
  RAISE NOTICE 'Matt Meuli AI Ecosystem Roadmap created successfully!';
END $$;

-- Verification
SELECT 
  'Roadmap Config' as item, 
  name as value 
FROM ai_roadmap_configs 
WHERE user_id = (SELECT id FROM users WHERE username = 'mattmeuli');

SELECT 
  'Departments Created' as summary, 
  CAST(COUNT(*) AS TEXT) as count 
FROM roadmap_departments 
WHERE roadmap_config_id IN (SELECT id FROM ai_roadmap_configs WHERE user_id = (SELECT id FROM users WHERE username = 'mattmeuli'));

SELECT 
  'Nodes Created' as summary, 
  CAST(COUNT(*) AS TEXT) as count 
FROM roadmap_nodes 
WHERE roadmap_config_id IN (SELECT id FROM ai_roadmap_configs WHERE user_id = (SELECT id FROM users WHERE username = 'mattmeuli'));

SELECT 
  'Connections Created' as summary, 
  CAST(COUNT(*) AS TEXT) as count 
FROM roadmap_edges 
WHERE roadmap_config_id IN (SELECT id FROM ai_roadmap_configs WHERE user_id = (SELECT id FROM users WHERE username = 'mattmeuli'));
EOF

echo ""
echo "✅ Matt Meuli AI Ecosystem Roadmap seeded!"
echo ""
echo "Summary:"
echo "- 3 Departments (Legal Ops, Business Ops, Marketing)"
echo "- 10 Ecosystem Nodes (1 Central AI Brain + 9 integrations/projects)"
echo "- 9 Connections (all through Central AI Brain)"
echo ""
echo "Nodes created:"
echo "  🧠 Central AI Brain (center hub)"
echo "  📋 Clio API Integration"
echo "  📄 Document Generation Engine"
echo "  ✍️  Automated Client Intake"
echo "  🔍 AI Knowledge Base (RAG)"
echo "  📊 HubSpot CRM Automation"
echo "  📧 Google Workspace API"
echo "  💰 QuickBooks Online Sync"
echo "  🌐 Client Self-Service Portal"
echo "  📨 Email Campaign Automation"
echo ""
echo "Refresh the Client AI Ecosystems page to see the visual roadmap!"
echo ""

