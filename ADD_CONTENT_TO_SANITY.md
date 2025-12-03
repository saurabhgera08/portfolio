# How to Add Content to Sanity (Without Studio)

Since the Studio isn't deployed yet, you can add content directly using Sanity's Content API. Here are two ways:

---

## Option 1: Use Sanity Vision (Easiest)

### Step 1: Go to Sanity Dashboard
1. Visit: https://sanity.io/manage
2. Click on your project (`dju5bkf8`)
3. Go to **"API"** → **"Vision"** (or look for "Query" tool)

### Step 2: Use Vision to Add Content
Vision lets you run queries and mutations directly. You can add content using GROQ mutations.

---

## Option 2: Deploy Studio Properly

Let's deploy the Studio so you can use the visual editor:

### Step 1: Build Studio
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npm run studio:build
```

### Step 2: Deploy Studio
```bash
npx sanity deploy
```

When prompted:
- **Output directory**: `dist-studio` (or accept default)
- **Hostname**: Choose a name (e.g., `portfolio-studio`)
- **Public**: Yes

### Step 3: Access Studio
After deployment, you'll get a URL like:
`https://portfolio-studio.sanity.studio`

---

## Option 3: Use Sanity CLI to Add Content

You can add content using the Sanity CLI:

### Add Hero Content
```bash
npx sanity exec --with-user-token --dataset production
```

Then in the interactive shell, you can create documents.

---

## Option 4: Use a Script to Add Initial Content

I can create a script that adds your current content to Sanity. Would you like me to do that?

---

## Quick Solution: Deploy Studio

The easiest long-term solution is to deploy the Studio. Let me help you do that properly.

