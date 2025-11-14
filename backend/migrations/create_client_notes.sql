-- Client Notes/Message Board System
-- Migration: create_client_notes.sql
-- Purpose: Add notes/messages for each client that advisors can add

-- Client Notes Table
CREATE TABLE IF NOT EXISTS client_notes (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  advisor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
  
  -- Note content
  note TEXT NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_client_notes_client ON client_notes(client_id);
CREATE INDEX IF NOT EXISTS idx_client_notes_advisor ON client_notes(advisor_id);
CREATE INDEX IF NOT EXISTS idx_client_notes_created ON client_notes(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE client_notes IS 'Stores notes and messages for each client visible to all advisors';
COMMENT ON COLUMN client_notes.note IS 'The note/message content';
COMMENT ON COLUMN client_notes.advisor_id IS 'The advisor who created this note';

