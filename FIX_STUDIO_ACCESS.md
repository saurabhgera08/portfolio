# Fix Studio Access - Step by Step

## The Problem

The Studio URL `https://dju5bkf8.sanity.studio` gives a 404 because the Studio hasn't been deployed yet.

---

## ✅ Solution: Use Local Studio (Works Immediately)

The easiest way to access Studio right now is to run it locally:

### Step 1: Start Local Studio

```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npm run studio
```

### Step 2: Wait for It to Start

You'll see:
```
✓ Checking configuration files...
- Starting dev server
```

Wait 10-30 seconds for it to fully start.

### Step 3: Open in Browser

Go to: **http://localhost:3333**

You should see the Sanity Studio login page!

---

## Alternative: Deploy Studio to Sanity

If you want the hosted URL to work, you need to deploy the Studio:

### Option A: Use Sanity CLI (Recommended)

1. **Make sure you're logged in:**
   ```bash
   npx sanity login
   ```

2. **Build the Studio:**
   ```bash
   npm run studio:build
   ```

3. **Deploy it:**
   ```bash
   npx sanity deploy
   ```

   When prompted:
   - **Output directory**: `dist-studio` (or accept default)
   - **Hostname**: Choose a name (e.g., `portfolio-studio`)
   - **Public**: Yes

4. **After deployment**, you'll get a URL like:
   `https://portfolio-studio.sanity.studio`

### Option B: Use Sanity Dashboard

1. Go to: https://sanity.io/manage
2. Click on your project (`dju5bkf8`)
3. Look for **"Deploy Studio"** or **"Add Studio"** button
4. Follow the prompts to deploy

---

## Quick Fix: Use Local Studio Now

**Right now, the fastest solution is:**

```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npm run studio
```

Then open: **http://localhost:3333**

This works immediately and doesn't require deployment!

---

## Troubleshooting

### If `npm run studio` doesn't work:

1. **Check if you're logged in:**
   ```bash
   npx sanity login
   ```

2. **Check if port 3333 is available:**
   ```bash
   lsof -ti:3333
   ```
   If something is using it:
   ```bash
   lsof -ti:3333 | xargs kill -9
   ```

3. **Try again:**
   ```bash
   npm run studio
   ```

### If you see "Unable to resolve sanity module root":

1. **Make sure you're in the project root**
2. **Check that `sanity.json` exists**
3. **Try reinstalling:**
   ```bash
   npm install
   ```

---

## Recommendation

**For now, use local Studio** (`npm run studio` → http://localhost:3333)

It works immediately and you can edit all your content. We can deploy it to the web later if you want!

---

## After Studio Starts

1. **Log in** with your Sanity account
2. **You'll see all your content types:**
   - Hero
   - About
   - Work Experience
   - Projects
   - Books
   - Skills
   - Contact

3. **Click any section** to edit
4. **Make changes** and click **"Publish"**
5. **Your site updates automatically!**

---

**That's it!** Local Studio is the fastest way to get started. 🚀

