# Matt Meuli Complete Setup - Deployment Instructions

## ✅ What Has Been Created

I've successfully created a complete client account setup package for **Matt Meuli** of **Meuli & Associates**, including:

### Scripts Created (in `/cmdr/backend/`):

1. **`create-matt-meuli.sh`** - Creates user account and links to all advisors
2. **`seed-matt-meuli-ecosystem.sh`** - Seeds all onboarding data
3. **`seed-matt-communications.sh`** - Adds communications and meetings
4. **`setup-matt-meuli-complete.sh`** - Master script that runs all three
5. **`MATT-MEULI-SETUP-README.md`** - Complete documentation

### Data That Will Be Created:

#### User Account
- **Name**: Matt Meuli
- **Email**: matt@wyomingassetprotection.com
- **Username**: mattmeuli
- **Password**: 123456
- **Company**: Meuli & Associates
- **Linked to**: ALL advisors in the system

#### Onboarding Dashboard Data

**Team Contacts (5 contacts):**
1. Matt Meuli - Executive Sponsor
2. Sarah Chen - IT Director  
3. Jennifer Martinez - Business Development Director
4. David Thompson - Senior Legal Counsel
5. Lisa Anderson - Operations Manager

**API Credentials (6 systems):**
1. Google Workspace API (Critical)
2. Clio Practice Management (Critical)
3. QuickBooks Online (High)
4. HubSpot CRM (High)
5. Mailchimp Marketing (Normal)
6. PostgreSQL Database (Normal)

**Strategic Questions (18 questions across 6 categories):**
- Business Context & Goals
- Current Systems & Workflows
- Client & Market Understanding
- Document & Knowledge Management
- Technology & Integration Requirements
- AI Vision & Expectations

**Project:**
- "Legal Platform AI Integration" (Active, Scope stage)

**Communications:**
- 9 realistic message exchanges between Matt and advisor
- Topics: onboarding, technical setup, template prioritization

**Meetings:**
- Initial Discovery Call (Completed)
- Template Prioritization Workshop (Confirmed)
- Technical Integration Review (Pending)
- Weekly Progress Check-in (Recurring)

---

## 🚀 How to Deploy This on Render

### Option 1: Using Render Shell (Recommended)

1. **Access Render Shell**
   ```
   Go to: https://dashboard.render.com/web/srv-d4bnj2ripnbc738vpqr0
   Click "Shell" tab in the left sidebar
   ```

2. **Navigate to Backend Directory**
   ```bash
   cd /app/backend
   ```

3. **Run the Complete Setup Script**
   ```bash
   bash setup-matt-meuli-complete.sh
   ```

This will run all three scripts in sequence and give you a complete status report.

### Option 2: Run Scripts Individually

If you want more control:

```bash
# Step 1: Create user account
bash create-matt-meuli.sh

# Step 2: Seed ecosystem data  
bash seed-matt-meuli-ecosystem.sh

# Step 3: Add communications
bash seed-matt-communications.sh
```

### Option 3: Using SSH (Advanced)

```bash
ssh srv-d4bnj2ripnbc738vpqr0@ssh.oregon.render.com
cd /app/backend
bash setup-matt-meuli-complete.sh
```

---

## 🧪 Testing the Setup

### 1. Verify Login
```
URL: https://cmdr.onrender.com/login
Username: mattmeuli
Password: 123456
```

### 2. Check Onboarding Dashboard
- Navigate to `/client-onboarding` page
- Select "Matt Meuli - Meuli & Associates" from dropdown
- Verify all 4 tabs:
  - ✅ Team (Points of Contact) - should show 5 contacts
  - ✅ System Access & API - should show 6 credentials
  - ✅ Documentation & Content - empty (ready for input)
  - ✅ Strategic Questions - should show 18 questions

### 3. Check Project Communications
- Go to Projects page
- Open "Legal Platform AI Integration"
- Navigate to Communications tab
- Should see 9 messages

### 4. Check Schedule
- Go to Schedule/Calendar page
- Should see 4 scheduled items

---

## 📊 Expected Output

When you run `setup-matt-meuli-complete.sh`, you should see:

```
==========================================
Matt Meuli Complete Account Setup
==========================================

Step 1: Creating Matt Meuli user account...
✅ Matt Meuli client account created successfully!

Step 2: Seeding ecosystem data (contacts, credentials, questions)...
✅ Matt Meuli ecosystem fully seeded!

Step 3: Adding communications and scheduling...
✅ Matt Meuli communications and scheduling seeded!

==========================================
✅ COMPLETE SETUP FINISHED!
==========================================

Matt Meuli's account is fully configured with:

✓ User Account & Login Credentials
  - Username: mattmeuli
  - Password: 123456
  - Company: Meuli & Associates

✓ Onboarding Dashboard Populated:
  - 5 Team Contacts
  - 6 API Credential Requests
  - 18 Strategic Questions
  - 1 Active Project

✓ Communications & Activity:
  - 9 Project Messages
  - 4 Scheduled Meetings

🔗 Login at: https://cmdr.onrender.com/login
📧 Email: matt@wyomingassetprotection.com
```

---

## 🔍 Database Verification

If you want to verify the data was created correctly, run these SQL queries in Render Shell:

```sql
# Check if Matt exists
psql $DATABASE_URL -c "SELECT id, role, name, email, username, company_name FROM users WHERE username = 'mattmeuli';"

# Check advisor linkages
psql $DATABASE_URL -c "SELECT u.name as advisor, c.name as client FROM advisor_clients ac JOIN users u ON u.id = ac.advisor_id JOIN users c ON c.id = ac.client_id WHERE c.username = 'mattmeuli';"

# Check onboarding data counts
psql $DATABASE_URL -c "SELECT 
  (SELECT COUNT(*) FROM client_contacts WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli')) as contacts,
  (SELECT COUNT(*) FROM client_api_credentials WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli')) as credentials,
  (SELECT COUNT(*) FROM client_questions WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli')) as questions,
  (SELECT COUNT(*) FROM projects WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli')) as projects;"

# Check communications
psql $DATABASE_URL -c "SELECT COUNT(*) as message_count FROM project_messages pm JOIN projects p ON p.id = pm.project_id WHERE p.client_id = (SELECT id FROM users WHERE username = 'mattmeuli');"

# Check meetings
psql $DATABASE_URL -c "SELECT COUNT(*) as meeting_count FROM schedule_requests WHERE client_id = (SELECT id FROM users WHERE username = 'mattmeuli');"
```

---

## 🧹 Clean Up / Reset

If you need to remove Matt's account and start over:

```sql
psql $DATABASE_URL -c "DELETE FROM users WHERE username = 'mattmeuli';"
```

This will cascade delete all related data. Then you can re-run the setup scripts.

---

## 📝 What to Demonstrate

After setup, you can demonstrate the following features:

### 1. Complete Onboarding Workflow
- Show how advisors can manage client onboarding
- Demonstrate team contact collection
- Show API credential request system
- Walkthrough strategic question gathering

### 2. Client Experience
- Log in as Matt
- Show client view of onboarding dashboard
- Demonstrate answering questions
- Show how to provide credentials

### 3. Communication Flow
- Show realistic advisor-client messaging
- Demonstrate project timeline
- Show meeting scheduling

### 4. Platform Ecosystem Integration
- Reference the `matt-Platform-Ecosystem.md` document
- Show how the setup aligns with platform architecture
- Demonstrate NextAuth, Prisma, PostgreSQL integration

---

## 🎯 Business Context

This setup is based on the **Platform Ecosystem** documentation, which outlines:

- Legal practice management (Clio integration)
- Document automation (500+ templates)
- Client intake processes (50-75/month)
- Compliance requirements (attorney-client privilege)

Matt Meuli's demo account showcases:
- **Real-world legal practice scenario**
- **Complete onboarding workflow**
- **Multi-system integration** (Google, Clio, QuickBooks, HubSpot)
- **Strategic discovery process**
- **Communication and project management**

---

## ✨ Next Steps

1. **Run the setup on Render** using instructions above
2. **Test the login** with Matt's credentials
3. **Verify all onboarding tabs** load correctly
4. **Review communications** and meetings
5. **Demo to stakeholders**
6. **Use as template** for other client accounts

---

## 📞 Support

If you encounter any issues:

1. **Check Render logs** for error messages
2. **Verify database connection** is working
3. **Ensure migrations** have run successfully
4. **Review README** in `backend/MATT-MEULI-SETUP-README.md`

---

**Created**: November 17, 2024  
**Author**: AI Assistant  
**Purpose**: Demo complete client onboarding system  
**Client**: Matt Meuli - Meuli & Associates

