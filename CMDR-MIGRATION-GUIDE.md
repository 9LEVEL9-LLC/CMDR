# 🚀 CMDR Platform Migration Guide

## Overview

This guide will help you deploy the CMDR platform as a complete, independent copy of the nBrain platform with all features, data, and functionality—branded for CMDR.

**Estimated Time:** 30-45 minutes
**Cost:** ~$21/month on Render

---

## 📋 Pre-Migration Checklist

Before you start, ensure you have:

- [ ] Access to GitHub (to create new repository)
- [ ] Access to Render account (to create services)
- [ ] Access to original nBrain database (to backup data)
- [ ] This codebase copied to a new directory
- [ ] New Cursor project opened in that directory

---

## Phase 1: GitHub Repository Setup (5 minutes)

### Step 1.1: Create New GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `cmdr-platform` (or your preferred name)
3. Description: "CMDR Client Management & AI Platform"
4. **Privacy:** Private (recommended)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 1.2: Push Code to GitHub

Open terminal in your CMDR project directory:

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - CMDR Platform"

# Add your new GitHub repo as remote
git remote add origin https://github.com/YOUR-USERNAME/cmdr-platform.git

# Push to GitHub
git branch -M main
git push -u origin main
```

✅ **Checkpoint:** Code is now on GitHub and ready for Render deployment

---

## Phase 2: Database Backup & Migration (10 minutes)

### Step 2.1: Backup Original nBrain Database

**Option A: Via Render Dashboard**

1. Go to: https://dashboard.render.com
2. Navigate to your nBrain PostgreSQL database
3. Click "Backups" tab
4. Click "Create Manual Backup"
5. Wait for completion (1-5 minutes)
6. Download backup file → save as `nbrain_backup.sql`

**Option B: Via Render Shell (nBrain Backend)**

1. Go to: https://dashboard.render.com
2. Navigate to your nBrain backend service
3. Click "Shell" tab
4. Run:

```bash
pg_dump --no-owner --no-acl --clean --if-exists $DATABASE_URL > /tmp/backup.sql
cat /tmp/backup.sql
```

5. Copy all output and save to local file: `nbrain_backup.sql`

### Step 2.2: Create New PostgreSQL Database for CMDR

**Via Render Dashboard:**

1. Go to: https://dashboard.render.com/new/database
2. Configuration:
   - **Name:** `cmdr-platform-db`
   - **Database:** `cmdrdb` (or auto-generated)
   - **User:** `cmdruser` (or auto-generated)
   - **Region:** Oregon (or closest to you)
   - **Plan:** Basic 1GB ($7/month) - sufficient for most cases
3. Click "Create Database"
4. **IMPORTANT:** Copy the **Internal Database URL** - you'll need this!

**Via Cursor MCP Tools (ask your AI):**

```
"Create a new PostgreSQL database for CMDR platform with plan basic_1gb in Oregon"
```

✅ **Checkpoint:** New CMDR database created, internal URL saved

### Step 2.3: Restore Database to CMDR

You'll do this AFTER creating the backend service (Step 3), so note this for later:

**In CMDR Backend Render Shell:**

```bash
# If you have backup file in project:
psql $DATABASE_URL < nbrain_backup.sql

# OR if pasting SQL directly:
psql $DATABASE_URL << 'EOF'
[paste all SQL content from backup file here]
EOF
```

---

## Phase 3: Create Render Services (15 minutes)

### Step 3.1: Create Backend Service

**Via Render Dashboard:**

1. Go to: https://dashboard.render.com/create?type=web
2. Connect to your GitHub repository (`cmdr-platform`)
3. Configuration:
   - **Name:** `cmdr-platform-backend`
   - **Region:** Oregon (same as database)
   - **Branch:** `main`
   - **Root Directory:** Leave blank (uses repo root)
   - **Build Command:** `cd backend && npm ci`
   - **Start Command:** `cd backend && npm start`
   - **Plan:** Starter ($7/month)
   - **Auto-Deploy:** Yes

4. **Environment Variables** (click "Advanced" → "Add Environment Variable"):

```bash
# Database connection (use INTERNAL URL from Step 2.2)
DATABASE_URL=postgresql://cmdruser:password@host:5432/cmdrdb

# JWT Secret (generate new one)
# Run: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your-generated-secret-here

# Google Gemini AI (copy from original or use new key)
GEMINI_API_KEY=your-gemini-api-key

# Gemini Model
GEMINI_MODEL=gemini-2.0-flash-exp

# Server Port
PORT=3001

# Email Configuration (optional - copy from original if used)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Gemini Strict Mode
GEMINI_STRICT=false
```

5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. **IMPORTANT:** Copy the service URL (e.g., `https://cmdr-platform-backend.onrender.com`)

**Via Cursor MCP Tools:**

```
"Create a Render web service for CMDR backend using my GitHub repo"
```

✅ **Checkpoint:** Backend service created and deployed

### Step 3.2: NOW Restore Database

With backend service running, go to its Shell tab and restore the backup:

```bash
psql $DATABASE_URL << 'EOF'
[paste your SQL backup content here]
EOF
```

Then run latest migrations:

```bash
cd backend && node << 'EOF'
const {Pool} = require('pg');
const fs = require('fs');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
});
const sql = fs.readFileSync('migrations/update_roadmap_tables_v2.sql', 'utf8');
pool.query(sql)
  .then(() => {
    console.log('Migrations complete!');
    process.exit(0);
  })
  .catch(e => {
    console.error('Error:', e.message);
    process.exit(1);
  });
EOF
```

✅ **Checkpoint:** Database restored with all data from nBrain

### Step 3.3: Create Frontend Service

**Via Render Dashboard:**

1. Go to: https://dashboard.render.com/create?type=web
2. Connect to same GitHub repository
3. Configuration:
   - **Name:** `cmdr-platform-frontend`
   - **Region:** Oregon (same as backend)
   - **Branch:** `main`
   - **Root Directory:** `web`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Starter ($7/month)
   - **Auto-Deploy:** Yes

4. **Environment Variables:**

```bash
# API Base URL (use your backend URL from Step 3.1)
NEXT_PUBLIC_API_BASE_URL=https://cmdr-platform-backend.onrender.com
```

5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. **Your CMDR platform URL:** This will be your public URL!

✅ **Checkpoint:** Frontend service created and running

---

## Phase 4: Branding & Customization (Handled by Cursor AI)

**DO NOT DO THIS MANUALLY** - The Cursor AI in your CMDR project will handle all branding changes using the instructions in `CMDR-CURSOR-PROMPT.md`.

The AI will:
- Replace all "nBRAIN" text with "CMDR"
- Update color scheme to match your CMDR brand
- Remove nBRAIN logo and replace with "CMDR" text
- Integrate your existing CMDR homepage design
- Update all branding elements in the backend dashboard

---

## Phase 5: Verification & Testing (10 minutes)

### Step 5.1: Test Backend Health

Visit: `https://your-cmdr-backend.onrender.com/health`

Expected response:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Step 5.2: Test Frontend Access

1. Visit your CMDR frontend URL
2. You should see the login page (or homepage)
3. Try logging in with existing credentials from nBrain

### Step 5.3: Comprehensive Feature Test

- [ ] Login works
- [ ] Projects page loads
- [ ] Can view existing projects
- [ ] AI chat functionality works
- [ ] AI Ecosystem/Roadmap loads
- [ ] File uploads work
- [ ] Can create new projects
- [ ] All navigation works

---

## 🎉 Deployment Complete!

You now have two completely independent platforms:

### **Original nBrain Platform**
- Unchanged and safe
- Continue using for existing clients

### **New CMDR Platform**
- Fully functional clone
- All data migrated
- Custom branding (via Cursor AI)
- Independent deployment
- Can customize without affecting nBrain

---

## 📊 Monthly Costs

| Service | Plan | Cost |
|---------|------|------|
| Backend | Starter | $7/month |
| Frontend | Starter | $7/month |
| PostgreSQL | Basic 1GB | $7/month |
| **Total** | | **$21/month** |

---

## 🔒 Security Checklist

- [ ] New JWT_SECRET generated (different from nBrain)
- [ ] Database uses internal URLs (not external)
- [ ] Environment variables never committed to GitHub
- [ ] GitHub repository is private
- [ ] Backup file deleted after restoration
- [ ] All API keys rotated (optional but recommended)

---

## 🆘 Troubleshooting

### Backend Won't Start
- Check Render logs for specific errors
- Verify DATABASE_URL is the internal URL
- Ensure all required env vars are set
- Check PostgreSQL database is "Available"

### Frontend Can't Connect
- Verify NEXT_PUBLIC_API_BASE_URL points to backend
- Check backend health endpoint responds
- Verify CORS is working (should be pre-configured)

### Database Restore Failed
- Ensure you used `--no-owner --no-acl` flags
- Check PostgreSQL versions match (v16)
- Try restoring in smaller chunks
- Check Render logs for specific SQL errors

### Deployment Timeouts
- Build timeouts are normal for first deploy
- Wait patiently (can take 10-15 minutes)
- Check build logs for actual errors vs warnings
- Next.config.ts is configured to ignore build errors

---

## 📞 Getting Help

**In Your CMDR Cursor Project:**
```
"Help me deploy CMDR platform"
"My backend won't connect to database"
"Frontend shows API errors"
"Create all Render services for me"
```

**Useful Render Links:**
- Dashboard: https://dashboard.render.com
- Docs: https://render.com/docs
- Status: https://status.render.com

---

## 🎯 Next Steps After Deployment

Once your CMDR platform is live:

1. **Update DNS** (optional): Point custom domain to Render
2. **Configure SSL**: Automatic with custom domain
3. **Set up monitoring**: Use Render metrics or external tools
4. **Backup schedule**: Enable automatic backups on PostgreSQL
5. **Team access**: Invite team members to Render dashboard

---

## 📝 Important Notes

**Data Privacy:**
- Backup file contains real user data
- Store securely and delete after restoration
- Never commit to GitHub

**Two Platforms:**
- nBrain and CMDR are completely independent
- Changes to one don't affect the other
- Can customize CMDR freely

**Updates:**
- Push code changes to GitHub
- Render auto-deploys on push (if enabled)
- Database migrations run manually via shell

**Cost Optimization:**
- Start with Starter plans ($7 each)
- Upgrade if needed based on traffic
- Monitor usage in Render dashboard

---

**Ready to launch CMDR? Follow the steps above and you'll have a fully functional platform in under an hour!** 🚀

