-- Create financial_records table for tracking monthly contract values
-- This table stores monthly revenue projections for both clients and prospects

CREATE TABLE IF NOT EXISTS financial_records (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month INT NOT NULL CHECK (month >= 1 AND month <= 12),
  year INT NOT NULL CHECK (year >= 2020),
  contract_value DECIMAL(10, 2) NOT NULL DEFAULT 0,
  is_consistent_mrr BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month, year)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_financial_records_user_id ON financial_records(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_records_date ON financial_records(year, month);
CREATE INDEX IF NOT EXISTS idx_financial_records_user_date ON financial_records(user_id, year, month);

-- Add comments for documentation
COMMENT ON TABLE financial_records IS 'Stores monthly contract values for clients and prospects';
COMMENT ON COLUMN financial_records.user_id IS 'Reference to the client or prospect (users table)';
COMMENT ON COLUMN financial_records.month IS 'Month number (1-12)';
COMMENT ON COLUMN financial_records.year IS 'Year (e.g., 2025)';
COMMENT ON COLUMN financial_records.contract_value IS 'Monthly contract value in dollars';
COMMENT ON COLUMN financial_records.is_consistent_mrr IS 'True if this is part of a consistent MRR, false if custom monthly value';
COMMENT ON COLUMN financial_records.notes IS 'Optional notes about this financial record';

