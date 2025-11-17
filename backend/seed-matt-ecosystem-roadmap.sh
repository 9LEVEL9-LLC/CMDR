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
    400, 100, 280, 140
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
    750, 100, 280, 140
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
    400, 400, 280, 140
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
    1100, 100, 280, 140
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
    400, 700, 280, 140
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
    750, 400, 280, 140
  );
  
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
    1100, 400, 280, 140
  );
  
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
    400, 550, 280, 140
  );
  
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
    750, 700, 280, 140
  );
  
  -- ===========================================
  -- DEPENDENCIES / EDGES
  -- ===========================================
  
  -- Document automation depends on Clio integration
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_clio_id, node_docs_id, 'dependency', 'Client data sync', true);
  
  -- Intake depends on Clio integration
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_clio_id, node_intake_id, 'dependency', 'Matter creation', true);
  
  -- Knowledge base enhances document automation
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_docs_id, node_knowledge_id, 'enhancement', 'Template intelligence', false);
  
  -- CRM feeds into intake
  INSERT INTO roadmap_edges (roadmap_config_id, source_node_id, target_node_id, edge_type, label, is_critical)
  VALUES (roadmap_id, node_crm_id, node_intake_id, 'data_flow', 'Lead conversion', false);
  
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
echo "- 9 Ecosystem Nodes (integrations and projects)"
echo "- 4 Dependencies/Connections"
echo ""
echo "Refresh the Client AI Ecosystems page to see the visual roadmap!"
echo ""

