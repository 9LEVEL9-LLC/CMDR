-- Add flag to track if user has changed their initial password
-- This will be used to show a mandatory password change modal on first login

ALTER TABLE users ADD COLUMN IF NOT EXISTS initial_password_changed BOOLEAN DEFAULT false;

-- Set existing users to true (don't force them to change password)
-- Only new users or users with default passwords will see the modal
UPDATE users SET initial_password_changed = true WHERE initial_password_changed IS NULL OR initial_password_changed = false;

-- For specific users with known default passwords, set to false to force password change
-- UPDATE users SET initial_password_changed = false WHERE username IN ('billdouglas', 'opticwise');


