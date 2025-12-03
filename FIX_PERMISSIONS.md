# Fix "Insufficient Permissions" Error

## The Problem

You're seeing "Insufficient permissions" when trying to access your Sanity project. This usually means:

1. **Not logged in** to the correct Sanity account
2. **Wrong account** - Project might be under a different email
3. **Project access** - Need to accept invitation or check permissions

---

## ✅ Solution 1: Check Your Login

### Step 1: Verify You're Logged In

```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npx sanity whoami
```

This shows which account you're logged in as.

### Step 2: Log Out and Log Back In

```bash
npx sanity logout
npx sanity login
```

Make sure you log in with the **same email** that created the project (`saurabhgera08@gmail.com`).

---

## ✅ Solution 2: Check Project Ownership

### Step 1: Go to Sanity Dashboard

1. Visit: **https://sanity.io/manage**
2. Make sure you're logged in with: `saurabhgera08@gmail.com`
3. Check if you see your project listed

### Step 2: Check Project Settings

1. Click on your project
2. Go to **"Settings"** → **"Members"**
3. Verify your email is listed as owner/admin

---

## ✅ Solution 3: Create New Project (If Needed)

If the project doesn't exist or you can't access it:

### Option A: Create New Project

1. Go to: https://sanity.io/manage
2. Click **"Create Project"**
3. Name it: `Portfolio CMS`
4. Copy the new Project ID
5. Update your `.env` file with the new Project ID

### Option B: Use Existing Project

If you have access to a different project:
1. Go to: https://sanity.io/manage
2. Click on an accessible project
3. Copy its Project ID
4. Update your `.env` file

---

## ✅ Solution 4: Check Browser Session

### Clear Browser Cache

1. **Log out** of Sanity in your browser
2. **Clear cookies** for sanity.io
3. **Log back in** at: https://sanity.io/login
4. Try accessing your project again

---

## ✅ Solution 5: Use Different Account

If you have multiple Google accounts:

1. **Check which account** created the project
2. **Log in** with that specific account
3. Or **invite yourself** from the project settings

---

## Quick Fix Steps

1. **Log out**: `npx sanity logout`
2. **Log in**: `npx sanity login` (use `saurabhgera08@gmail.com`)
3. **Check**: `npx sanity whoami`
4. **Try accessing**: https://sanity.io/manage

---

## Alternative: Add Content via API

If you still can't access the dashboard, you can add content using the API:

1. **Get your API token** from: https://sanity.io/manage/personal/project/dju5bkf8/api
2. **Use a script** to add content (I can create one for you)

---

## What to Check

- ✅ Are you logged in with `saurabhgera08@gmail.com`?
- ✅ Does the project exist in your dashboard?
- ✅ Are you the owner/admin of the project?
- ✅ Did you accept any project invitations?

---

**Try logging out and back in first - that usually fixes it!** 🔐

