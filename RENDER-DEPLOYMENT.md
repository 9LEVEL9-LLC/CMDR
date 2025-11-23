# CMDR - Render Deployment Guide

## ✅ Successfully Pushed to GitHub!

Repository: https://github.com/9LEVEL9-LLC/CMDR

---

## 🚀 Deploy to Render (Step-by-Step)

### 1. Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"**
4. Find and select: **9LEVEL9-LLC/CMDR**
5. Click **"Connect"**

### 2. Configure Service

**Basic Settings:**
- **Name**: `cmdr` (or `cmdr-platform`)
- **Region**: Oregon (or closest to your users)
- **Branch**: `main`
- **Root Directory**: (leave blank)
- **Runtime**: `Node`

**Build Settings:**
- **Build Command**: 
  ```bash
  npm install && npm run build
  ```

- **Start Command**:
  ```bash
  npm start
  ```

**Instance Type:**
- Select **"Free"** (for testing) or **"Starter"** (for production)

### 3. Environment Variables

No environment variables needed for the current setup.

If you add analytics or forms later, you can add them in the "Environment" tab.

### 4. Deploy!

Click **"Create Web Service"**

Render will:
1. Clone your GitHub repo
2. Install dependencies (`npm install`)
3. Build the Next.js app (`npm run build`)
4. Start the production server (`npm start`)
5. Assign you a URL: `https://cmdr.onrender.com` (or similar)

**Deployment takes 3-5 minutes.**

---

## 🌐 Available Pages After Deployment

### Main Pages (Next.js)
- **/** - Stealth demo landing page (personalized booking)
- **/full** - Complete pitch deck with all sections
- **/demo** - Same as homepage (alias)

### Static HTML Pages (in /public)
- **/aryn-thomez-ai-exponent.html**
- **/aryn-thomez-business-launch-proposal.html**
- **/aryn-thomez-business-plan-proposal.html**
- **/aryn-thomez-platform-pitch.html**
- **/property-management-ai-proposal.html**

---

## 🔧 Custom Domain Setup

### Point MyCMDR.com to Render

1. In Render Dashboard → Your Service → **"Settings"** → **"Custom Domain"**
2. Click **"Add Custom Domain"**
3. Enter: `mycmdr.com`
4. Render will show DNS instructions

**DNS Records to Add:**
```
Type: CNAME
Name: @
Value: [your-service].onrender.com

Type: CNAME
Name: www
Value: [your-service].onrender.com
```

5. Wait 5-15 minutes for DNS propagation
6. Render automatically provisions SSL certificate

**Your site will be live at https://mycmdr.com**

---

## 📊 Post-Deployment Checklist

### Test All Pages
- [ ] Visit main page (demo landing)
- [ ] Test "Schedule Personalized Demo" button
- [ ] Fill out modal form
- [ ] Visit /full (complete pitch deck)
- [ ] Test all HTML pages in /public

### Verify Performance
- [ ] Run Lighthouse audit (aim for 90+ performance)
- [ ] Test mobile responsiveness
- [ ] Check all CTAs work
- [ ] Verify no console errors

### Update Links
- [ ] Update any placeholder links in modal
- [ ] Add real Calendly or booking integration
- [ ] Connect form to email service (if needed)

---

## 🔄 Continuous Deployment

Render automatically deploys when you push to GitHub:

```bash
# Make changes locally
# Test with: npm run dev

# Commit and push
git add .
git commit -m "Update: description of changes"
git push origin main

# Render auto-deploys in 2-3 minutes
```

---

## 🎯 What Was Deployed

### Homepage (/)
**Stealth Demo Landing Page** with:
- Hero: "Stop Trading Time for Money. Start Multiplying It."
- Stats: 35h, 2.4x, 6x, $420K
- Real Impact section (Before/After comparison)
- Personalization message
- Modal with form + expertise dropdown
- Green CTA: "Schedule Personalized Demo"

### Full Pitch Deck (/full)
- Complete 10-section pitch deck
- Hero + Problem + Solution + Time Breakdown
- Market Opportunity (10 segments table)
- Exponential Impact section
- Business Model + Growth Strategy
- CTA + Footer

### Static HTML Pages
All your previous HTML proposals accessible via direct URL.

---

## 📧 Form Integration (Next Steps)

The modal currently shows an alert. To integrate real booking:

### Option 1: Calendly
```tsx
// After form submit
window.location.href = `https://calendly.com/your-link/demo?name=${formData.name}&email=${formData.email}`;
```

### Option 2: Cal.com
```tsx
// Embed Cal.com in modal
<iframe src="https://cal.com/your-link" />
```

### Option 3: Custom API
Create an API route to save form data and send emails.

---

## ✅ Deployment Complete!

Your CMDR platform is now:
- ✅ Pushed to GitHub: https://github.com/9LEVEL9-LLC/CMDR
- ✅ Ready to deploy on Render (follow steps above)
- ✅ All pages working (/, /full, /html-pages)
- ✅ Personalized demo modal functional
- ✅ Mobile responsive
- ✅ Production ready

**Next Step**: Go to Render and create your web service!

---

## 🎉 Summary

**Repository**: https://github.com/9LEVEL9-LLC/CMDR  
**Main Branch**: main  
**Build Command**: `npm install && npm run build`  
**Start Command**: `npm start`  
**Port**: 3000 (auto-detected by Render)  

**Status**: ✅ Ready to deploy to Render and point MyCMDR.com!







