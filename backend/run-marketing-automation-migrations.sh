#!/bin/bash

# Marketing Automation Module - Database Migration Runner
# Run this to set up all Marketing Automation tables

echo "🚀 Marketing Automation - Database Migration"
echo "=============================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  echo "❌ ERROR: DATABASE_URL environment variable is not set"
  echo "Please set DATABASE_URL in your .env file or export it"
  exit 1
fi

echo "📦 DATABASE_URL found"
echo ""

# Run migration 100 - Core tables
echo "📝 Running migration 100: Core Tables..."
psql "$DATABASE_URL" -f migrations/100_create_marketing_automation_core.sql

if [ $? -eq 0 ]; then
  echo "✅ Migration 100 completed successfully"
else
  echo "❌ Migration 100 failed"
  exit 1
fi

echo ""

# Run migration 101 - Module tables
echo "📝 Running migration 101: Module-Specific Tables..."
psql "$DATABASE_URL" -f migrations/101_create_marketing_automation_modules.sql

if [ $? -eq 0 ]; then
  echo "✅ Migration 101 completed successfully"
else
  echo "❌ Migration 101 failed"
  exit 1
fi

echo ""
echo "=============================================="
echo "✅ All Marketing Automation migrations completed!"
echo ""
echo "📊 Created Tables:"
echo "  - 14 Core infrastructure tables"
echo "  - 23 Module-specific tables"
echo "  - Total: 37 tables created"
echo ""
echo "🎯 Next Steps:"
echo "  1. Start the backend server: npm start"
echo "  2. Start the frontend: cd ../web && npm run dev"
echo "  3. Navigate to /marketing-automation in your browser"
echo ""
echo "🎉 You're ready to create campaigns!"

