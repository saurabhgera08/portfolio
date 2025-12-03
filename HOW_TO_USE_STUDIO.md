# How to Use Sanity Studio

## Current Situation

You see "Add Studio" in the dashboard because the Studio hasn't been deployed to Sanity's hosting yet. That's okay! You have two options:

---

## ✅ Option 1: Use Local Studio (Easiest Right Now)

### Step 1: Open Terminal
Navigate to your project:
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
```

### Step 2: Make Sure You're Logged In
```bash
npx sanity login
```
(You've already done this, so you can skip if you're still logged in)

### Step 3: Start the Studio
```bash
npm run studio
```

### Step 4: Wait for It to Start
You'll see:
```
✓ Checking configuration files...
- Starting dev server
```

Wait 10-30 seconds, then:

### Step 5: Open in Browser
Go to: **http://localhost:3333**

You should see the Sanity Studio interface!

---

## Option 2: Use Sanity's Web Interface (Alternative)

Even without deploying Studio, you can still edit content:

1. Go to: https://sanity.io/manage
2. Click on your project
3. Look for **"Content"** or **"Documents"** tab
4. You can edit content there directly!

---

## What You Can Do in Studio

Once Studio is running (local or deployed), you can:

- ✅ Edit Hero Section (headlines, stats)
- ✅ Edit About Section
- ✅ Add/Edit Work Experience
- ✅ Add/Edit Projects (with images!)
- ✅ Add/Edit Books
- ✅ Edit Skills & Certifications
- ✅ Edit Contact Information

---

## Troubleshooting Local Studio

### If you get "Unable to resolve sanity module root":
1. Make sure you're in the project folder
2. Try: `npx sanity login` again
3. Check that `sanity.json` exists in the root

### If port 3333 is busy:
```bash
lsof -ti:3333 | xargs kill -9
npm run studio
```

---

## Recommendation

**For now, use Option 1 (Local Studio)** - it's the easiest and works immediately!

Once you get comfortable with it, we can deploy it to the web later if you want.

---

## Quick Start

Just run:
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npm run studio
```

Then open: **http://localhost:3333**

**That's it!** 🎉

