# Connect Sanity to Your Portfolio

## Step 1: Add Environment Variables in Vercel

Even though the site works without them, you need these to fetch content from Sanity.

### Go to Vercel Dashboard:
1. Visit: https://vercel.com/dashboard
2. Click on your project (`portfolio`)
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**

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

**Variable 3 (Optional but recommended):**
- **Name:** `VITE_SANITY_TOKEN`
- **Value:** `your-token-here` (or get from your `.env` file)
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

### Redeploy:
1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## Step 2: Access Sanity Studio (Admin Panel)

You can edit your content in two ways:

### Option A: Web-Based Admin (Easiest)

1. **Go to your deployed site**: `https://your-site.vercel.app/admin`
2. **Log in** with your Sanity account
3. **Edit content** directly in the browser!

### Option B: Local Admin Panel

1. **Start the studio locally**:
   ```bash
   cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
   npm run studio
   ```
2. **Open**: http://localhost:3333
3. **Log in** and edit content
4. **Changes sync automatically** to your site!

---

## Step 3: Add Content in Sanity

Once you're in the Studio, you'll see these sections:

### 📝 Content Types:

1. **Hero** - Main hero section (name, title, description, image)
2. **About** - About me section
3. **Work Experience** - Your work history
4. **Projects** - Portfolio projects
5. **Books** - Books you've read
6. **Skills** - Skills and certifications
7. **Contact** - Contact information

### How to Add Content:

1. **Click on a section** (e.g., "Hero")
2. **Fill in the fields**:
   - Text fields: Just type
   - Images: Click "Select" → Upload or choose from existing
   - Rich text: Use the editor toolbar
3. **Click "Publish"** (top right)
4. **Wait 10-30 seconds** - Your site will update automatically!

---

## Step 4: Verify It's Working

1. **Add/edit content** in Sanity Studio
2. **Publish** the changes
3. **Visit your site** - Content should update automatically
4. **If not updating**: Hard refresh (`Cmd+Shift+R`)

---

## Troubleshooting

### Content Not Showing?

1. **Check environment variables** in Vercel (Step 1)
2. **Redeploy** after adding variables
3. **Check browser console** for errors
4. **Verify content is published** in Sanity (not just saved as draft)

### Can't Access `/admin`?

1. **Make sure you're logged in** to Sanity
2. **Try**: `https://your-site.vercel.app/admin`
3. **Check Vercel deployment** is complete

### Studio Not Starting Locally?

```bash
# Make sure you're in the right directory
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"

# Install dependencies (if needed)
npm install

# Start studio
npm run studio
```

---

## Quick Reference

- **Web Admin**: `https://your-site.vercel.app/admin`
- **Local Admin**: `npm run studio` → http://localhost:3333
- **Sanity Dashboard**: https://sanity.io/manage
- **Project ID**: `dju5bkf8`
- **Dataset**: `production`

---

**That's it!** Your portfolio is now connected to Sanity. Edit content anytime! 🚀

