# Deploy Sanity Studio - Step by Step

## The Problem

Sanity Canvas shows "no studio detected" because the Studio hasn't been deployed to Sanity's hosting yet.

---

## ✅ Solution: Deploy Studio to Sanity

### Step 1: Make Sure You're Logged In

```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npx sanity login
```

Enter your Sanity credentials when prompted.

### Step 2: Build the Studio

```bash
npm run studio:build
```

This creates a `dist-studio` folder with the built Studio.

### Step 3: Deploy the Studio

```bash
npx sanity deploy
```

When prompted:
- **Output directory**: `dist-studio` (or press Enter for default)
- **Hostname**: Choose a name like `portfolio-studio` or `saurabh-portfolio`
- **Public**: Yes (so you can access it)

### Step 4: Wait for Deployment

It will take 1-2 minutes to deploy. You'll see a URL like:
`https://portfolio-studio.sanity.studio`

### Step 5: Access Your Studio

1. Go to the URL provided
2. Log in with your Sanity account
3. You'll see all your content types!
4. Start editing!

---

## Alternative: Use Sanity's Content API

If deployment doesn't work, you can add content using Sanity's Content API:

### Option A: Use Sanity Vision

1. Go to: https://sanity.io/manage
2. Click your project → **"API"** → **"Vision"**
3. Use GROQ queries to add content

### Option B: Use a Script

I can create a script that adds your content. Would you like me to do that?

---

## Troubleshooting

### If `npm run studio:build` fails:

The module root error might prevent building. Try:

```bash
# Clear caches
rm -rf node_modules/.vite .sanity dist-studio

# Try building again
npm run studio:build
```

### If `npx sanity deploy` fails:

1. Make sure you're logged in: `npx sanity login`
2. Check your project ID matches: `dju5bkf8`
3. Try deploying with explicit path: `npx sanity deploy dist-studio`

---

## Quick Test

After deployment, go to:
- https://sanity.io/manage
- Click your project
- You should see **"Open Studio"** button instead of "Add Studio"!

---

**Let's deploy the Studio so you can start editing!** 🚀

