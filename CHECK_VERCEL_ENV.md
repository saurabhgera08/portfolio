# Check Vercel Environment Variables

## The Error You're Seeing

```
Uncaught Error: Configuration must contain `projectId`
```

This means **environment variables aren't set in Vercel**!

---

## ✅ Fix: Add Environment Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Go to: https://vercel.com/dashboard
2. Click on your project (`portfolio`)

### Step 2: Add Environment Variables
1. Go to **"Settings"** → **"Environment Variables"**
2. Click **"Add New"**

### Add These 3 Variables:

**Variable 1:**
- **Name:** `VITE_SANITY_PROJECT_ID`
- **Value:** `dju5bkf8`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

**Variable 2:**
- **Name:** `VITE_SANITY_DATASET`
- **Value:** `production`
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

**Variable 3 (Optional):**
- **Name:** `VITE_SANITY_TOKEN`
- **Value:** `your-token-here` (from your .env file)
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes

---

## After Redeploy

Your site should work! The error will be gone because:
- ✅ Environment variables are set
- ✅ Sanity client will initialize properly
- ✅ App won't crash

---

## Verify Variables Are Set

In Vercel → Settings → Environment Variables, you should see:
- ✅ VITE_SANITY_PROJECT_ID
- ✅ VITE_SANITY_DATASET
- ✅ VITE_SANITY_TOKEN (optional)

**If any are missing, add them!**

---

## Quick Checklist

- [ ] Environment variables added in Vercel
- [ ] All 3 variables have Production ✅ checked
- [ ] Redeployed after adding variables
- [ ] Waited 2-3 minutes for deployment
- [ ] Hard refreshed browser (Cmd+Shift+R)

**This will fix the white screen!** 🚀

