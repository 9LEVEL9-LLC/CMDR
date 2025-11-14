# ✅ CMDR Deployment Checklist

## Before You Copy Project

### 1. Backup nBrain Database
- [ ] Go to nBrain Render backend shell
- [ ] Run: `pg_dump --no-owner --no-acl --clean --if-exists $DATABASE_URL > /tmp/backup.sql`
- [ ] Run: `cat /tmp/backup.sql`
- [ ] Copy output to file: `nbrain_backup.sql`
- [ ] Save file securely

### 2. Gather CMDR Brand Assets
- [ ] CMDR Primary Color: `#______`
- [ ] CMDR Secondary Color: `#______`
- [ ] CMDR Accent Color: `#______`
- [ ] CMDR Background Color: `#______`
- [ ] CMDR Text Color: `#______`
- [ ] CMDR Homepage Location: `________________`

### 3. Prepare Accounts
- [ ] GitHub account ready
- [ ] Render account ready
- [ ] Payment method added to Render

---

## Copy Project to New Directory

- [ ] Run: `cp -r /Users/dannydemichele/nbrain-platform-10:15:2025/ ~/cmdr-platform/`
- [ ] Run: `cd ~/cmdr-platform`
- [ ] Run: `rm -rf .git`
- [ ] Run: `rm -rf backend/node_modules web/node_modules`
- [ ] Copy `nbrain_backup.sql` into project root

---

## Open New Cursor Project

- [ ] Open Cursor application
- [ ] File → Open Folder
- [ ] Select: `~/cmdr-platform`
- [ ] New Cursor window opens

---

## Paste Opening Prompt

- [ ] Open Cursor chat
- [ ] Copy contents of: `CMDR-OPENING-PROMPT.txt`
- [ ] Paste into chat
- [ ] Send message
- [ ] Wait for AI acknowledgment

---

## Deployment Phase (AI-Guided)

### GitHub Setup
- [ ] Create GitHub repository (name: `cmdr-platform`)
- [ ] Initialize git in project
- [ ] Add remote origin
- [ ] Push code to GitHub

### Render Services
- [ ] Create PostgreSQL database (`cmdr-platform-db`)
- [ ] Note internal database URL
- [ ] Create backend service (`cmdr-platform-backend`)
- [ ] Set backend environment variables
- [ ] Note backend service URL
- [ ] Create frontend service (`cmdr-platform-frontend`)
- [ ] Set frontend environment variables

### Database Migration
- [ ] Access CMDR backend Render shell
- [ ] Restore database from backup
- [ ] Run migrations
- [ ] Verify data migrated

---

## Branding Phase (AI-Automated)

- [ ] Provide CMDR brand colors to AI
- [ ] Provide CMDR homepage location to AI
- [ ] AI replaces all "nBRAIN" → "CMDR"
- [ ] AI removes nBRAIN logos
- [ ] AI adds "CMDR" text logo
- [ ] AI applies CMDR color scheme
- [ ] AI integrates CMDR homepage
- [ ] Verify changes look correct

---

## Testing Phase

### Backend Tests
- [ ] Visit: `https://[your-backend].onrender.com/health`
- [ ] Should return: `{"status":"healthy","database":"connected"}`
- [ ] No errors in Render logs

### Frontend Tests
- [ ] Visit CMDR frontend URL
- [ ] Login with existing credentials
- [ ] Navigate to Projects page
- [ ] Check AI chat works
- [ ] Check AI Ecosystem/Roadmap works
- [ ] Test file uploads
- [ ] Create test project
- [ ] Verify all features functional

### Branding Verification
- [ ] No "nBRAIN" text visible anywhere
- [ ] All text says "CMDR"
- [ ] No nBRAIN logos present
- [ ] CMDR colors applied throughout
- [ ] CMDR homepage is landing page
- [ ] "CMDR" text logo in header/nav
- [ ] Page titles say "CMDR Platform"

---

## Final Verification

- [ ] No console errors in browser
- [ ] All API calls working
- [ ] Database has all expected data
- [ ] Two platforms running independently:
  - [ ] Original nBRAIN untouched
  - [ ] New CMDR fully functional
- [ ] GitHub repository is private
- [ ] Environment variables secure
- [ ] Database backup file deleted (or stored securely)

---

## Post-Deployment (Optional)

- [ ] Enable automatic backups on Render PostgreSQL
- [ ] Add custom domain (if desired)
- [ ] Configure SSL certificate (automatic with custom domain)
- [ ] Set up monitoring/alerts
- [ ] Invite team members to Render dashboard
- [ ] Document any custom configurations

---

## ✅ Deployment Complete!

**When all boxes are checked above, you have:**
- ✨ Fully functional CMDR platform
- ✨ Independent deployment from nBrain
- ✨ Complete branding transformation
- ✨ All data migrated successfully
- ✨ Two separate platforms running

---

## 📊 Final Status

**Original nBrain:**
- Status: Untouched ✅
- Location: `/Users/dannydemichele/nbrain-platform-10:15:2025/`
- Deployment: Existing Render services
- Purpose: Continue using for current clients

**New CMDR:**
- Status: Live ✅
- Location: `~/cmdr-platform/`
- Deployment: New Render services
- Purpose: Use for CMDR clients and projects

---

## 🎉 Success!

You now have two completely independent, fully functional platforms!

**Monthly cost:** $21 (CMDR platform only)
**Time invested:** ~45 minutes
**Value:** Infinite! 🚀

Congratulations! 🎊

