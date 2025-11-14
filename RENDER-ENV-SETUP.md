# Render Environment Variables Setup

## CMDR Frontend Service (srv-d4bni77diees73dbrro0)

**CRITICAL**: The frontend needs this environment variable to connect to the backend:

### Required Environment Variable

```
Key: NEXT_PUBLIC_API_BASE_URL
Value: https://cmdr-backend.onrender.com
```

## How to Set on Render Dashboard

1. Go to: https://dashboard.render.com/web/srv-d4bni77diees73dbrro0
2. Click "Environment" in the left sidebar
3. Click "Add Environment Variable"
4. Enter:
   - **Key**: `NEXT_PUBLIC_API_BASE_URL`
   - **Value**: `https://cmdr-backend.onrender.com`
5. Click "Save Changes"
6. Render will automatically redeploy

## Current Issue

The environment variable is currently set BACKWARDS:
- Key: "Value" → "https://cmdr-backend.onrender.com"
- Key: "Key" → "NEXT_PUBLIC_API_BASE_URL"

**Delete these two** and create the correct one as shown above.

## What This Fixes

- ✅ Login functionality (currently fails with 405 error)
- ✅ All dashboard API calls
- ✅ Backend communication

Without this, the frontend tries to call itself instead of the backend, causing all API calls to fail.

