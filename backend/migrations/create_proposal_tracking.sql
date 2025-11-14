-- Proposal Tracking System
-- Migration: create_proposal_tracking.sql
-- Purpose: Track proposals, scopes, and their engagement analytics

-- Client Proposals Table
-- Stores links to proposal/scope HTML pages for each client
CREATE TABLE IF NOT EXISTS client_proposals (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  advisor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  
  -- Proposal details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  proposal_type VARCHAR(50) DEFAULT 'proposal' CHECK (proposal_type IN ('proposal', 'scope', 'contract', 'agreement', 'other')),
  
  -- URL to the HTML page (can be relative or absolute)
  proposal_url TEXT NOT NULL,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'signed', 'declined')),
  sent_at TIMESTAMP,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Proposal Analytics Table
-- Tracks every interaction with proposals
CREATE TABLE IF NOT EXISTS proposal_analytics (
  id SERIAL PRIMARY KEY,
  proposal_id INTEGER NOT NULL REFERENCES client_proposals(id) ON DELETE CASCADE,
  
  -- Event details
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('proposal_view', 'agreement_view', 'download_click', 'section_view')),
  
  -- Source tracking
  source_url TEXT,
  source_ip VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  
  -- Additional context
  section_name VARCHAR(255), -- For section-specific tracking
  metadata JSONB DEFAULT '{}',
  
  -- Timestamp
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_client_proposals_client ON client_proposals(client_id);
CREATE INDEX IF NOT EXISTS idx_client_proposals_advisor ON client_proposals(advisor_id);
CREATE INDEX IF NOT EXISTS idx_client_proposals_status ON client_proposals(status);
CREATE INDEX IF NOT EXISTS idx_client_proposals_type ON client_proposals(proposal_type);
CREATE INDEX IF NOT EXISTS idx_proposal_analytics_proposal ON proposal_analytics(proposal_id);
CREATE INDEX IF NOT EXISTS idx_proposal_analytics_event ON proposal_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_proposal_analytics_created ON proposal_analytics(created_at);

-- Add comments for documentation
COMMENT ON TABLE client_proposals IS 'Stores proposal and scope of work documents for clients';
COMMENT ON TABLE proposal_analytics IS 'Tracks views, clicks, and engagement with proposals';
COMMENT ON COLUMN client_proposals.proposal_type IS 'Type of document: proposal, scope, contract, agreement, or other';
COMMENT ON COLUMN client_proposals.proposal_url IS 'URL to the HTML page - can be relative (/public/...) or absolute';
COMMENT ON COLUMN proposal_analytics.event_type IS 'Type of event: proposal_view, agreement_view, download_click, section_view';
COMMENT ON COLUMN proposal_analytics.source_url IS 'URL where the event occurred';
COMMENT ON COLUMN proposal_analytics.section_name IS 'Specific section viewed (if applicable)';

