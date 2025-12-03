# ✅ Simple Guide: Add Content Without Studio

## You DON'T Need Studio!

Sanity is asking you to set up a Studio, but **you don't need it!** You can add content directly.

---

## Step 1: Get Your API Token

1. Go to: **https://sanity.io/manage**
2. Click on your project (`dju5bkf8`)
3. Go to **"API"** → **"Tokens"** (or "API Tokens")
4. Click **"Add API Token"** or **"Create Token"**
5. Fill in:
   - **Name**: `Portfolio Token`
   - **Permissions**: Choose **"Editor"** (can read and write)
6. Click **"Save"** or **"Create"**
7. **Copy the token** (it starts with `sk...` - keep it secret!)

---

## Step 2: Add Token to Your .env File

1. Open your `.env` file:
   ```
   /Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main/.env
   ```

2. Add this line (replace `your-token-here` with the token you copied):
   ```
   SANITY_TOKEN=your-token-here
   ```

3. Save the file

---

## Step 3: Run the Script to Add Content

I've created a script that adds all your content. Just run:

```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
node scripts/add-all-content.mjs
```

This will add:
- ✅ Hero content
- ✅ Contact information

---

## Step 4: Add More Content Later

After running the script, you can add more content (About, Projects, Work Experience, etc.) through:

1. **Sanity Vision** (Query Tool):
   - Go to: https://sanity.io/manage → Your Project → **"API"** → **"Vision"**
   - You can query and see your content structure

2. **Or use the script** - I can add more functions to add all your content!

---

## What About Studio?

**Studio is optional!** It's just a visual editor. You can:
- ✅ Add content via API (what we're doing now) - **Easiest!**
- ✅ Add content via Vision tool
- ✅ Set up Studio later if you want the visual editor

**For now, just get your API token and run the script!**

---

## Quick Summary

1. ✅ Get API token from Sanity dashboard
2. ✅ Add it to `.env` file as `SANITY_TOKEN=...`
3. ✅ Run: `node scripts/add-all-content.mjs`
4. ✅ Content is added to Sanity!
5. ✅ Your portfolio fetches it automatically!

---

**No Studio needed! Just get the token and run the script!** 🚀

