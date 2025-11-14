# Test Login Credentials

## Demo Users (Standard Credentials)

### Advisor Login
```
Username: advisor
Password: advisor
```
After login, redirects to: `/advisor` dashboard

### Admin Login
```
Username: admin
Password: admin
```
After login, redirects to: `/admin` dashboard

### Client Login
```
Username: client
Password: client
```
After login, redirects to: `/dashboard`

---

## Additional Test Users

### OpticWise Client
```
Username: opticwise
Password: opticwise2025
```

### Dan Caufield Client
```
Username: clientdan
Password: 123456
```

---

## Backend Deployment Needed

**The backend needs to be deployed to get the CORS fix.**

Backend has CORS fix in commit: `17727f8`  
Current backend deploy: Needs manual trigger

**To deploy backend:**
1. Go to: https://dashboard.render.com/web/srv-d4bnj2ripnbc738vpqr0
2. Click "Manual Deploy"
3. Select "Deploy latest commit"
4. This will enable frontend → backend communication

---

## Autodeploy Issue

**Why autodeploy isn't working:**

The GitHub → Render webhook may not be configured. To fix:

1. **Check Render Deploy Hook:**
   - Go to frontend service settings
   - Look for "Deploy Hook" URL
   - If it exists, copy it

2. **Configure GitHub Webhook:**
   - Go to: https://github.com/9LEVEL9-LLC/CMDR/settings/hooks
   - Click "Add webhook"
   - Paste Render Deploy Hook URL
   - Content type: `application/json`
   - Events: "Just the push event"
   - Click "Add webhook"

3. **Verify Branch:**
   - Render settings → ensure "Branch" is set to `main`
   - Ensure "Auto-Deploy" is set to "Yes"

This will enable automatic deployments on every push to main.

