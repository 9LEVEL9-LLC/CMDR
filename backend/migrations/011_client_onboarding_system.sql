-- Client Onboarding System
-- Comprehensive tables for managing client kickoff and onboarding process

-- Points of Contact (Team Members)
CREATE TABLE IF NOT EXISTS client_contacts (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(100) NOT NULL, -- 'executive_sponsor', 'technical_lead', 'marketing_lead', 'sales_rep', 'content_owner', 'custom'
  role_label VARCHAR(255), -- Custom label if role is 'custom'
  name VARCHAR(255),
  title VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  best_time_to_reach TEXT,
  systems_managed TEXT,
  current_tools TEXT,
  years_in_role VARCHAR(50),
  documentation_location TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_client_contacts_client ON client_contacts(client_id);

-- Enhanced API Credentials with more metadata
CREATE TABLE IF NOT EXISTS client_api_credentials (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  system_name VARCHAR(255) NOT NULL, -- 'google_workspace', 'slack', 'quickbooks', 'linkedin', 'email_smtp', etc.
  system_category VARCHAR(100), -- 'productivity', 'communication', 'financial', 'crm', 'marketing', 'custom'
  display_name VARCHAR(255),
  description TEXT,
  priority VARCHAR(20) DEFAULT 'normal', -- 'critical', 'high', 'normal', 'low'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'not_needed'
  
  -- Credential fields (flexible JSON for different auth types)
  credentials JSONB DEFAULT '{}', -- Stores tokens, keys, passwords, etc.
  
  -- Metadata
  api_url VARCHAR(500),
  documentation_url VARCHAR(500),
  webhook_url VARCHAR(500),
  required_permissions TEXT[],
  setup_instructions TEXT,
  estimated_time_minutes INTEGER,
  
  -- Tracking
  requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_date TIMESTAMP,
  last_verified TIMESTAMP,
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_client_api_credentials_client ON client_api_credentials(client_id);
CREATE INDEX idx_client_api_credentials_status ON client_api_credentials(status);

-- Documentation & Content Needed
CREATE TABLE IF NOT EXISTS client_documentation (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL, -- 'book', 'sales_calls', 'gpt_data', 'google_docs', 'market_research', 'podcast', 'technical_specs', 'marketing_assets', 'custom'
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(20) DEFAULT 'normal', -- 'critical', 'high', 'normal', 'low'
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'received', 'processed', 'not_needed'
  
  -- Content tracking
  content_type VARCHAR(100), -- 'pdf', 'docx', 'audio', 'video', 'folder', 'url'
  file_url VARCHAR(500),
  storage_location TEXT,
  file_count INTEGER,
  total_size_mb DECIMAL(10, 2),
  
  -- Checklist items
  checklist_items JSONB DEFAULT '[]', -- Array of {label, completed}
  
  -- Dates
  requested_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  received_date TIMESTAMP,
  processed_date TIMESTAMP,
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_client_documentation_client ON client_documentation(client_id);
CREATE INDEX idx_client_documentation_status ON client_documentation(status);

-- Strategic Questions
CREATE TABLE IF NOT EXISTS client_questions (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL, -- 'business_context', 'target_market', 'sales_process', 'operations', 'technical', 'content', 'budget', 'custom'
  category_label VARCHAR(255),
  question TEXT NOT NULL,
  answer TEXT,
  priority VARCHAR(20) DEFAULT 'normal',
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'answered', 'needs_followup', 'skipped'
  
  -- Metadata
  asked_by VARCHAR(255), -- Who asked this question
  answered_by VARCHAR(255), -- Who answered
  asked_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  answered_date TIMESTAMP,
  
  -- Follow-up
  requires_followup BOOLEAN DEFAULT false,
  followup_notes TEXT,
  
  display_order INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_client_questions_client ON client_questions(client_id);
CREATE INDEX idx_client_questions_category ON client_questions(category);
CREATE INDEX idx_client_questions_status ON client_questions(status);

-- Timeline & Milestones
CREATE TABLE IF NOT EXISTS client_milestones (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_number INTEGER,
  phase VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Deliverables and requirements
  deliverables TEXT[], -- Array of deliverable items
  client_requirements TEXT[], -- What we need from client
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'blocked', 'skipped'
  progress_percentage INTEGER DEFAULT 0,
  
  -- Dates
  planned_start_date DATE,
  planned_end_date DATE,
  actual_start_date DATE,
  actual_end_date DATE,
  
  -- Assignees
  assigned_to_advisor INTEGER REFERENCES users(id),
  assigned_to_client_contact INTEGER REFERENCES client_contacts(id),
  
  -- Ordering and organization
  display_order INTEGER DEFAULT 0,
  is_critical BOOLEAN DEFAULT false,
  
  notes TEXT,
  completion_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

CREATE INDEX idx_client_milestones_client ON client_milestones(client_id);
CREATE INDEX idx_client_milestones_status ON client_milestones(status);
CREATE INDEX idx_client_milestones_order ON client_milestones(client_id, display_order);

-- Success Metrics & KPIs
CREATE TABLE IF NOT EXISTS client_success_metrics (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL, -- 'marketing', 'operations', 'business_impact', 'module_specific'
  module VARCHAR(100), -- 'ai_brain', 'marketing_automation', 'ai_chat', etc.
  metric_name VARCHAR(255) NOT NULL,
  metric_description TEXT,
  
  -- Target and actual values
  target_value DECIMAL(12, 2),
  current_value DECIMAL(12, 2),
  unit VARCHAR(50), -- 'percent', 'count', 'dollars', 'hours', 'days', etc.
  
  -- Tracking
  baseline_value DECIMAL(12, 2),
  measurement_frequency VARCHAR(50), -- 'daily', 'weekly', 'monthly', 'quarterly', 'milestone'
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'achieved', 'at_risk', 'paused'
  priority VARCHAR(20) DEFAULT 'normal',
  
  -- Dates
  start_date DATE,
  target_date DATE,
  last_measured_date DATE,
  
  display_order INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_client_success_metrics_client ON client_success_metrics(client_id);
CREATE INDEX idx_client_success_metrics_category ON client_success_metrics(category);
CREATE INDEX idx_client_success_metrics_status ON client_success_metrics(status);

-- Metric Data Points (for tracking over time)
CREATE TABLE IF NOT EXISTS client_metric_data_points (
  id SERIAL PRIMARY KEY,
  metric_id INTEGER NOT NULL REFERENCES client_success_metrics(id) ON DELETE CASCADE,
  value DECIMAL(12, 2) NOT NULL,
  measured_date DATE NOT NULL,
  notes TEXT,
  recorded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_metric_data_points_metric ON client_metric_data_points(metric_id);
CREATE INDEX idx_metric_data_points_date ON client_metric_data_points(measured_date);

-- Update function for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_client_contacts_updated_at BEFORE UPDATE ON client_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_api_credentials_updated_at BEFORE UPDATE ON client_api_credentials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_documentation_updated_at BEFORE UPDATE ON client_documentation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_questions_updated_at BEFORE UPDATE ON client_questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_milestones_updated_at BEFORE UPDATE ON client_milestones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_success_metrics_updated_at BEFORE UPDATE ON client_success_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

