# Deploy Sanity Studio to Web

## Option 1: Deploy Studio (Recommended)

This will make your Studio accessible from anywhere via the web!

### Step 1: Build the Studio
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npm run studio:build
```

### Step 2: Deploy to Sanity
```bash
npx sanity deploy
```

When prompted:
- **Output directory**: `dist-studio` (or whatever it says)
- **Hostname**: Choose a name (e.g., `yourname-portfolio`)
- **Public**: Yes (so you can access it)

### Step 3: Access Your Studio
After deployment, you'll get a URL like:
`https://yourname-portfolio.sanity.studio`

**Now you can access it from anywhere!**

---

## Option 2: Use Local Studio (What We've Been Setting Up)

If you prefer to run it locally:

1. **Make sure you're logged in:**
   ```bash
   npx sanity login
   ```

2. **Run the studio:**
   ```bash
   npm run studio
   ```

3. **Open:** `http://localhost:3333`

---

## Which Should You Choose?

### Deploy Studio (Option 1) ✅
- ✅ Access from anywhere
- ✅ No local setup needed
- ✅ Share with team members
- ✅ Always available

### Local Studio (Option 2)
- ✅ Works offline
- ✅ Faster (no internet needed)
- ❌ Only works on your computer
- ❌ Need to start it each time

**Recommendation: Deploy it!** Then you can use it from any device.

---

## After Deployment

Once deployed, you'll see "Open Studio" button in your Sanity dashboard instead of "Add Studio"!

