#!/bin/bash
# Complete setup for CRM prospects including table creation
# Run this on Render backend shell

echo "=========================================="
echo "CRM Prospects Complete Setup"
echo "=========================================="
echo ""

# Step 1: Create client_notes table if needed
echo "Step 1: Ensuring client_notes table exists..."
psql $DATABASE_URL -f migrations/create_client_notes.sql
if [ $? -ne 0 ]; then
  echo "⚠️  Warning: client_notes migration had issues (may already exist)"
fi
echo ""

# Step 2: Seed the prospects
echo "Step 2: Creating 10 mock CRM prospects..."
bash seed-mock-crm-prospects.sh
if [ $? -ne 0 ]; then
  echo "❌ Failed to create prospects"
  exit 1
fi
echo ""

echo "=========================================="
echo "✅ CRM SETUP COMPLETE!"
echo "=========================================="
echo ""
echo "View prospects in Advisor CRM Dashboard:"
echo "  🔗 https://cmdr.onrender.com/advisor/crm"
echo ""

