# 🎯 CMDR Platform Setup - Opening Instructions for Cursor AI

---

## 📖 READ THIS FIRST

You are now working on the **CMDR Platform** - a complete, rebranded clone of the nBrain platform. Your mission is to help deploy this platform to GitHub and Render, then rebrand it from "nBRAIN" to "CMDR" with custom styling and branding.

---

## 🗂️ Essential Documentation

**Primary Guide:** Read `CMDR-MIGRATION-GUIDE.md` in this repository root for complete deployment instructions.

That guide contains:
- Step-by-step GitHub setup
- Database backup and migration process
- Render services creation (Backend, Frontend, PostgreSQL)
- Environment variables configuration
- Testing and verification steps
- Troubleshooting guide

**Your role:** Help the user execute those steps and handle all branding/customization changes.

---

## 🎨 Branding Mission: nBRAIN → CMDR

After deployment is complete, you must rebrand the entire platform:

### 1. Name Changes
- Replace **ALL** instances of "nBRAIN" with "CMDR"
- Replace "nBrain" with "CMDR"
- Replace "nbrain" with "cmdr"
- Update page titles, meta tags, and documentation
- Check: backend responses, email templates, UI text, navigation

**Files to update:**
- `/web/src/app/**/*.tsx` (all frontend components)
- `/web/src/components/**/*.tsx` (all UI components)
- `/backend/server.js` (any hardcoded text)
- `/web/public/index.html` (if exists)
- All meta tags and SEO content

### 2. Logo Replacement

**CRITICAL: DO NOT use the nBRAIN logo**

- Remove all references to `nbrain-white-logo-2025.png`
- Remove all references to `nbrain-2025-logo.png`
- **Replace with:** Plain text "CMDR" in appropriate styling
- Use clean, professional typography
- No logo image - text only
- Ensure "CMDR" text is visible and prominent in header/navigation

**Files to check:**
- `/web/src/components/` - look for logo imports
- `/web/src/app/layout.tsx` - header/nav components
- Any dashboard headers or sidebars

### 3. Homepage Integration

**DO NOT use the nBRAIN homepage design.**

**Instead:**
- The user has an existing CMDR homepage already created
- Ask user for the location/path of their CMDR homepage
- Integrate that homepage as the main landing page
- Preserve all CMDR homepage content and styling
- Only integrate the dashboard/backend features behind login

**Expected behavior:**
- Non-logged-in users see CMDR homepage
- Logged-in users see dashboard (with CMDR branding)
- Login flow redirects from CMDR homepage to dashboard

### 4. Color Scheme & Design

**Get CMDR Brand Colors from User:**

Before making design changes, ask the user:

```
"Please provide the CMDR brand color scheme:
- Primary color (hex):
- Secondary color (hex):
- Accent color (hex):
- Background color (hex):
- Text color (hex):
- Any specific design guidelines or existing style guide?"
```

**Then update:**

**Backend Dashboard Styling:**
- Primary buttons → CMDR primary color
- Navigation/sidebar → CMDR color scheme
- Links and accents → CMDR secondary/accent colors
- Keep layout the same, just update colors

**Files to update:**
- `/web/src/app/globals.css` - global styles
- `/web/tailwind.config.js` or `/web/tailwind.config.ts` - theme colors
- Component-level styles (if any inline styles exist)

**Styling Approach:**
- Use Tailwind CSS theme customization
- Update CSS variables for consistent theming
- Ensure dark mode compatibility (if applicable)
- Maintain accessibility (contrast ratios)

### 5. Backend Dashboard Branding

Update the admin/client dashboard:
- Top navigation bar: CMDR branding
- Sidebar (if exists): CMDR colors
- Footer: Update company name to CMDR
- Favicon: Create or use CMDR favicon
- Page titles: "[Page Name] - CMDR Platform"

**Files to update:**
- `/web/src/app/layout.tsx`
- `/web/src/app/(dashboard)/layout.tsx` (if exists)
- `/web/public/favicon.ico`
- Any dashboard wrapper components

---

## 🚀 Deployment Workflow

### Phase 1: Initial Setup (User-Led)
1. User creates GitHub repository
2. User pushes code to GitHub
3. **You help:** Guide through process, provide commands

### Phase 2: Render Services (You Help)
1. **You can use:** MCP Render tools to create services
2. **Or guide user:** Through manual Render dashboard creation
3. Services needed:
   - PostgreSQL database
   - Backend web service
   - Frontend web service

**MCP Tools Available:**
- `mcp_render_list_services` - Check existing services
- `mcp_render_create_service` - Create new service
- `mcp_render_get_service` - Get service details
- `mcp_render_set_env_vars` - Set environment variables
- `mcp_render_list_deployments` - Check deployment status

### Phase 3: Database Migration (User-Led with Your Guidance)
1. User backs up nBrain database
2. **You help:** Provide exact commands
3. User restores to new CMDR database
4. **You verify:** Database connection and data integrity

### Phase 4: Branding (You Lead)
1. **You execute:** All branding changes automatically
2. Get CMDR colors from user first
3. Get CMDR homepage location from user
4. Make all text, logo, and color changes
5. **Test:** Ensure no broken references
6. **Verify:** User approves branding

### Phase 5: Testing & Verification (Collaborative)
1. **You create:** Test checklist
2. **User tests:** All major features
3. **You fix:** Any issues that arise
4. **Final:** User confirms everything works

---

## 🎯 Your Immediate Actions

When you first open this project, follow this sequence:

### 1. Acknowledge Understanding
```
"I understand. I'm ready to help deploy and rebrand the CMDR platform. I have read the CMDR-MIGRATION-GUIDE.md and understand the complete workflow."
```

### 2. Assess Current State
Ask the user:
```
"Let's get started with CMDR deployment! First, a few questions:

1. Have you already created the GitHub repository? If yes, what's the URL?
2. Do you have access to the nBrain database for backup?
3. Do you have your CMDR brand colors ready? If yes, please share:
   - Primary color:
   - Secondary color:
   - Accent color:
4. Where is your existing CMDR homepage located? (file path or URL)
5. Are you ready to create Render services now, or do you want to start with GitHub setup?"
```

### 3. Guide Through Deployment
- Follow `CMDR-MIGRATION-GUIDE.md` step-by-step
- Use MCP tools when appropriate for Render
- Provide copy-paste ready commands
- Verify each checkpoint

### 4. Execute Branding Changes
- Get brand colors and homepage info first
- Make all text replacements
- Remove nBRAIN logo, add CMDR text
- Update color scheme
- Integrate CMDR homepage
- Test all changes

### 5. Final Verification
- Create comprehensive test plan
- Help user verify all features work
- Fix any issues discovered
- Confirm branding is complete

---

## 📋 Branding Checklist (Complete AFTER Deployment)

Use this checklist to track branding changes:

- [ ] All "nBRAIN" → "CMDR" text replacements
- [ ] nBRAIN logo removed
- [ ] "CMDR" text logo added to header/nav
- [ ] CMDR homepage integrated as landing page
- [ ] CMDR color scheme applied to dashboard
- [ ] Tailwind theme updated with CMDR colors
- [ ] Global CSS updated with CMDR branding
- [ ] Page titles updated (e.g., "Dashboard - CMDR Platform")
- [ ] Meta tags updated for SEO
- [ ] Favicon updated (if provided)
- [ ] Footer branding updated
- [ ] Email templates updated (if any)
- [ ] All navigation text updated
- [ ] Login page branding updated
- [ ] No nBRAIN references remain anywhere

---

## 🎨 Design Guidelines

### Typography
- Clean, modern sans-serif fonts
- Professional and enterprise-ready
- Good readability and accessibility
- "CMDR" logo text should be prominent but not oversized

### Color Usage
- Primary: Main actions, buttons, key UI elements
- Secondary: Supporting elements, backgrounds
- Accent: Highlights, hover states, notifications
- Text: High contrast for readability
- Background: Clean, professional

### Layout Consistency
- Keep existing layout structure
- Only change colors and branding
- Maintain responsive design
- Preserve all functionality
- Don't break any existing features

---

## ⚠️ Critical Rules

### DO NOT:
- ❌ Change core functionality or features
- ❌ Modify database schema without explicit approval
- ❌ Use any nBRAIN homepage design
- ❌ Keep any nBRAIN logos or branding
- ❌ Make branding changes before deployment is complete
- ❌ Commit sensitive data (API keys, passwords) to GitHub
- ❌ Touch the original nBRAIN project (this is a separate clone)

### DO:
- ✅ Follow CMDR-MIGRATION-GUIDE.md exactly
- ✅ Ask for brand colors and homepage before branding
- ✅ Test all changes thoroughly
- ✅ Use MCP tools to help with Render deployment
- ✅ Provide clear, copy-paste ready commands
- ✅ Verify each step with the user
- ✅ Keep original nBRAIN project completely untouched

---

## 🆘 Troubleshooting

### If deployment fails:
1. Check Render logs for specific errors
2. Verify environment variables are set correctly
3. Ensure GitHub repo is connected properly
4. Check `CMDR-MIGRATION-GUIDE.md` troubleshooting section

### If branding breaks something:
1. Check browser console for errors
2. Verify import paths are correct
3. Ensure color values are valid hex codes
4. Test in multiple browsers
5. Rollback specific changes if needed

### If user gets stuck:
1. Provide step-by-step guidance
2. Offer to use MCP tools to help
3. Break down complex steps into smaller tasks
4. Provide exact commands they need to run

---

## 📞 Key Commands Reference

### GitHub Setup
```bash
git init
git add .
git commit -m "Initial commit - CMDR Platform"
git remote add origin [USER-PROVIDED-URL]
git branch -M main
git push -u origin main
```

### Database Backup (User runs in nBrain backend shell)
```bash
pg_dump --no-owner --no-acl --clean --if-exists $DATABASE_URL > /tmp/backup.sql
cat /tmp/backup.sql
```

### Database Restore (User runs in CMDR backend shell)
```bash
psql $DATABASE_URL < backup.sql
```

### Check Backend Health
```bash
curl https://[cmdr-backend-url].onrender.com/health
```

---

## 🎉 Success Criteria

Deployment is complete when:
- ✅ CMDR platform is live on Render
- ✅ All services running (backend, frontend, database)
- ✅ Database migrated with all data
- ✅ User can login and access all features

Branding is complete when:
- ✅ No "nBRAIN" references remain
- ✅ CMDR colors applied throughout
- ✅ CMDR text logo in place
- ✅ CMDR homepage integrated
- ✅ User approves final design

---

## 💬 Communication Style

- Be encouraging and supportive
- Explain technical concepts clearly
- Provide context for each step
- Celebrate checkpoints and progress
- Proactively offer to help with MCP tools
- Ask clarifying questions when needed

**Remember:** The user may not be deeply technical. Break down complex steps, provide exact commands, and verify understanding at each stage.

---

## 🚀 Ready to Begin!

Start by acknowledging these instructions, then ask the user about their current status (GitHub repo, brand colors, homepage) and guide them through the deployment process using `CMDR-MIGRATION-GUIDE.md`.

After successful deployment, execute all branding changes and verify everything works perfectly.

**You've got this! Let's build an amazing CMDR platform together!** 🎯

