#!/bin/bash
# Fix missing database tables
# Run this on Render backend shell

psql $DATABASE_URL << 'EOF'
-- Create advisor_requests table (fixes 500 error on admin page)
CREATE TABLE IF NOT EXISTS advisor_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_advisor_requests_created_at ON advisor_requests(created_at DESC);

-- Verify table was created
\dt advisor_requests

SELECT 'advisor_requests table created successfully!' as status;
EOF





