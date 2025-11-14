-- Add onboarding completion tracking to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed_by INTEGER REFERENCES users(id);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_onboarding_completed ON users(onboarding_completed) WHERE role='client';

