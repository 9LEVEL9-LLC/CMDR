# Matt Meuli Client Account Setup

Complete setup package for creating Matt Meuli's client account with full ecosystem integration based on the Platform Ecosystem documentation.

## Overview

This setup creates a fully-featured demo client account for **Matt Meuli** of **Meuli & Associates** (Wyoming Asset Protection), including:

- ✅ User account linked to all advisors
- ✅ Complete onboarding dashboard with realistic data
- ✅ Team contacts and system access points
- ✅ API credential requests for all platforms
- ✅ Strategic discovery questions
- ✅ Mock communications and message history
- ✅ Scheduled meetings and calendar items

## Quick Start

### Option 1: Run Complete Setup (Recommended)

```bash
cd /app/backend
bash setup-matt-meuli-complete.sh
```

This runs all three setup scripts in the correct order.

### Option 2: Run Scripts Individually

If you need more control or want to run steps separately:

```bash
# Step 1: Create user account
bash create-matt-meuli.sh

# Step 2: Seed ecosystem data
bash seed-matt-meuli-ecosystem.sh

# Step 3: Add communications
bash seed-matt-communications.sh
```

## Login Credentials

After setup, Matt can log in with:

- **URL**: https://cmdr.onrender.com/login
- **Username**: `mattmeuli`
- **Password**: `123456`
- **Name**: Matt Meuli
- **Email**: matt@wyomingassetprotection.com
- **Company**: Meuli & Associates

## What Gets Created

### 1. User Account (`create-matt-meuli.sh`)

- Creates Matt Meuli as a `client` role user
- Links to **ALL** advisors in the system automatically
- Sets up company profile information

### 2. Ecosystem Data (`seed-matt-meuli-ecosystem.sh`)

#### Team Contacts (5 contacts)
1. **Matt Meuli** - Executive Sponsor / Managing Partner
2. **Sarah Chen** - IT Director (Technical Lead)
3. **Jennifer Martinez** - Business Development Director
4. **David Thompson** - Senior Legal Counsel (Content Owner)
5. **Lisa Anderson** - Operations Manager

#### API Credentials (6 systems)
1. **Google Workspace API** - Critical priority
2. **Clio Practice Management** - Critical priority
3. **QuickBooks Online** - High priority
4. **HubSpot CRM** - High priority
5. **Mailchimp Marketing** - Normal priority
6. **PostgreSQL Database** - Normal priority

Each credential includes:
- Detailed setup instructions
- Documentation links
- Estimated time to complete
- Required permissions
- Security notes

#### Strategic Questions (18 questions across 6 categories)

**Categories:**
1. Business Context & Goals (3 questions)
2. Current Systems & Workflows (3 questions)
3. Client & Market Understanding (3 questions)
4. Document & Knowledge Management (3 questions)
5. Technology & Integration Requirements (3 questions)
6. AI Vision & Expectations (3 questions)

#### Project
- **Project Name**: "Legal Platform AI Integration"
- **Status**: Active
- **Stage**: Scope
- **ETA**: Q2 2025

### 3. Communications & Scheduling (`seed-matt-communications.sh`)

#### Project Messages (9 messages)
Realistic conversation thread covering:
- Initial welcome and onboarding
- Technical questions about API setup
- Strategic discussion about document automation
- Timeline and milestone planning
- Template prioritization
- Meeting scheduling

#### Schedule Requests (4 meetings)
1. **Initial Discovery Call** - Completed (Nov 18)
2. **Template Prioritization Workshop** - Confirmed (Nov 26)
3. **Technical Integration Review** - Pending (Nov 28)
4. **Weekly Progress Check-in** - Recurring (Every Monday)

## Testing the Setup

After running the setup, verify everything works:

### 1. Test Login
```
1. Go to https://cmdr.onrender.com/login
2. Enter username: mattmeuli
3. Enter password: 123456
4. Should redirect to client dashboard
```

### 2. Test Onboarding Dashboard
```
1. Navigate to Client Onboarding page
2. Select "Matt Meuli - Meuli & Associates" from dropdown
3. Verify all 4 tabs load correctly:
   - Team (Points of Contact) - 5 contacts
   - System Access & API - 6 credentials
   - Documentation & Content - (empty, ready for client input)
   - Strategic Questions - 18 questions
```

### 3. Test Project Communications
```
1. Go to Projects page
2. Open "Legal Platform AI Integration"
3. Navigate to Communications tab
4. Should see 9 messages between Matt and advisor
```

### 4. Test Schedule
```
1. Go to Schedule/Calendar page
2. Should see 4 scheduled items
3. Verify different statuses (completed, confirmed, pending)
```

## Onboarding Dashboard Features

The setup populates data that demonstrates all onboarding features:

### Team Contacts Tab
- Multiple role types (executive, technical, marketing, content, custom)
- Role-specific fields (systems_managed, current_tools, etc.)
- Contact information and best times to reach
- Notes and additional context

### System Access & API Tab
- Priority-based organization (critical, high, normal)
- Status tracking (pending, in_progress, completed)
- Detailed setup instructions for each system
- Credential storage with visibility toggle
- File upload capability
- Documentation links

### Strategic Questions Tab
- Categorized question groups
- Expandable/collapsible interface
- Answer tracking with timestamps
- Status indicators (pending, answered)
- Follow-up notes capability

### Documentation Tab
- Ready for client to upload documents
- Supports multiple content types
- Status tracking per document

## Customization

### Adding More Contacts
Edit `seed-matt-meuli-ecosystem.sh` and add new INSERT statements in the "TEAM CONTACTS" section.

### Adding More API Credentials
Edit `seed-matt-meuli-ecosystem.sh` and add new INSERT statements in the "API CREDENTIALS" section.

### Adding More Questions
Edit `seed-matt-meuli-ecosystem.sh` and add new INSERT statements in the "STRATEGIC QUESTIONS" section.

### Adding More Messages
Edit `seed-matt-communications.sh` and add new INSERT statements in the "PROJECT COMMUNICATIONS" section.

## Troubleshooting

### "User already exists"
If Matt's account already exists, the scripts will UPDATE the existing record instead of failing.

### "Project not found"
Make sure `seed-matt-meuli-ecosystem.sh` completed successfully before running `seed-matt-communications.sh`.

### "Advisor not found"
Ensure at least one advisor user exists in the system before running the setup.

### Verify Database State
```sql
-- Check if Matt exists
SELECT * FROM users WHERE username = 'mattmeuli';

-- Check advisor linkages
SELECT u.name as advisor, c.name as client
FROM advisor_clients ac
JOIN users u ON u.id = ac.advisor_id  
JOIN users c ON c.id = ac.client_id
WHERE c.username = 'mattmeuli';

-- Check onboarding data
SELECT 
  (SELECT COUNT(*) FROM client_contacts WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli')) as contacts,
  (SELECT COUNT(*) FROM client_api_credentials WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli')) as credentials,
  (SELECT COUNT(*) FROM client_questions WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli')) as questions;
```

## Clean Up / Reset

To remove Matt's account and start over:

```sql
-- This will cascade delete all related data
DELETE FROM users WHERE username = 'mattmeuli';
```

Then re-run the setup scripts.

## Architecture Notes

The setup is based on the **Platform Ecosystem** documentation (`matt-Platform-Ecosystem.md`), which outlines:

- Core domain modules (Auth, Users, Templates, Documents, Appointments)
- Data models (User, ClientProfile, DocumentTemplate, etc.)
- API surface (REST endpoints)
- Frontend pages (dashboard, templates, documents, etc.)

The seeded data aligns with:
- Legal practice management workflows (Clio integration)
- Document automation requirements (500+ templates)
- Client intake processes (50-75/month)
- Compliance and security requirements (attorney-client privilege)

## Next Steps After Setup

1. **Log in as Matt** and explore the onboarding dashboard
2. **Fill in some answers** to strategic questions
3. **Upload mock credentials** for API systems
4. **Add a response** to the project communications
5. **Mark some milestones complete** to see progress tracking
6. **Demo the full workflow** to stakeholders

---

**Created for**: CMDR AI Platform  
**Client**: Matt Meuli - Meuli & Associates  
**Purpose**: Demo/Testing complete client onboarding workflow  
**Date**: November 2024

