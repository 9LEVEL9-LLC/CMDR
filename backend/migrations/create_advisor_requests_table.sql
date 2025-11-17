-- Create advisor_requests table
CREATE TABLE IF NOT EXISTS advisor_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_advisor_requests_created_at ON advisor_requests(created_at DESC);

