#!/bin/bash
# Complete setup for Matt Meuli client account
# This runs all setup scripts in the correct order
# Run this on Render backend shell

echo "=========================================="
echo "Matt Meuli Complete Account Setup"
echo "=========================================="
echo ""

# Step 1: Create user account and link to advisors
echo "Step 1: Creating Matt Meuli user account..."
bash create-matt-meuli.sh
if [ $? -ne 0 ]; then
  echo "❌ Failed to create user account"
  exit 1
fi
echo ""

# Step 2: Seed ecosystem data
echo "Step 2: Seeding ecosystem data (contacts, credentials, questions)..."
bash seed-matt-meuli-ecosystem.sh
if [ $? -ne 0 ]; then
  echo "❌ Failed to seed ecosystem data"
  exit 1
fi
echo ""

# Step 3: Add communications and scheduling
echo "Step 3: Adding communications and scheduling..."
bash seed-matt-communications.sh
if [ $? -ne 0 ]; then
  echo "❌ Failed to seed communications"
  exit 1
fi
echo ""

echo "=========================================="
echo "✅ COMPLETE SETUP FINISHED!"
echo "=========================================="
echo ""
echo "Matt Meuli's account is fully configured with:"
echo ""
echo "✓ User Account & Login Credentials"
echo "  - Username: mattmeuli"
echo "  - Password: 123456"
echo "  - Company: Meuli & Associates"
echo ""
echo "✓ Onboarding Dashboard Populated:"
echo "  - 5 Team Contacts"
echo "  - 6 API Credential Requests"
echo "  - 18 Strategic Questions"
echo "  - 1 Active Project"
echo ""
echo "✓ Communications & Activity:"
echo "  - 9 Project Messages"
echo "  - 4 Scheduled Meetings"
echo ""
echo "🔗 Login at: https://cmdr.onrender.com/login"
echo "📧 Email: matt@wyomingassetprotection.com"
echo ""
echo "Next Steps:"
echo "1. Log in as Matt and verify onboarding dashboard"
echo "2. Test all tabs: Team, API, Docs, Questions"
echo "3. Review project communications"
echo "4. Check schedule/meetings"
echo ""

