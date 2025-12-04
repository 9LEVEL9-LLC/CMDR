#!/bin/bash

echo "=========================================="
echo "Fixing Onboarding Completion Tracking"
echo "=========================================="
echo ""

echo "Running migration 013_onboarding_completion_tracking.sql..."
echo ""

psql $DATABASE_URL << 'EOF'
-- Add onboarding completion tracking to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed_at TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS onboarding_completed_by INTEGER REFERENCES users(id);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_users_onboarding_completed ON users(onboarding_completed) WHERE role='client';
EOF

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migration completed successfully!"
    echo ""
    echo "Verifying columns were added..."
    echo ""
    
    psql $DATABASE_URL -c "\d users" | grep "onboarding"
    
    echo ""
    echo "=========================================="
    echo "✅ FIX COMPLETE!"
    echo "=========================================="
    echo ""
    echo "The /client/onboarding-complete endpoint should now work."
    echo "Please test the login again."
else
    echo ""
    echo "❌ Migration failed!"
    echo "Please check the error message above."
    exit 1
fi

