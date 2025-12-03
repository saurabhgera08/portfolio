# Complete Sanity Setup Guide

## ✅ All Components Are Now Connected to Sanity!

Your entire portfolio is now editable through Sanity CMS. Here's how to set it up and start editing.

---

## Step 1: Add Environment Variables in Vercel

### Go to Vercel Dashboard:
1. Visit: **https://vercel.com/dashboard**
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
- **Value:** `your-token-here` (from your `.env` file)
- **Environments:** ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

### Redeploy:
1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes

---

## Step 2: Access Sanity Studio (Admin Panel)

You have **two options** to edit your content:

### Option A: Web-Based Admin (Easiest - Recommended)

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

## Step 3: What You Can Edit

All sections are now editable through Sanity:

### ✅ Hero Section
- Headline, subheadline
- CTA buttons text
- Stats (values, labels, highlights)

### ✅ About Section
- Personal statement (rich text)
- Thinking principles (title, description, icon)
- Key achievements (rich text)
- Value proposition (rich text)
- Personal interests

### ✅ Work Experience
- Add/edit/delete work experiences
- Role, company, duration
- Headline, story, learnings
- "The Clarity" insights
- Order them with the `order` field

### ✅ Projects
- Add/edit/delete projects
- Title, subtitle, tagline
- Category (Built & Launched, Strategic, Market Analysis)
- Images (upload multiple)
- Problem statement, approach, outcome, learning
- Tags, timeline, project link
- Order them with the `order` field

### ✅ Reading (Books)
- Currently reading book
- Books that shaped you
- Books by category (Technology, History, Fiction)
- Book cover images
- About, why it mattered, impact
- Order them with the `order` field

### ✅ Skills
- Product management skills
- Technical skills
- Business & growth skills
- Certifications

### ✅ Contact
- Email, phone, LinkedIn
- Location
- "Interested in" list
- "Let's talk if" message

---

## Step 4: How to Add Content

### For Single Documents (Hero, About, Skills, Contact):

1. **Click on the section** (e.g., "Hero")
2. **Fill in the fields**
3. **Click "Publish"** (top right)
4. **Wait 10-30 seconds** - Your site updates automatically!

### For Lists (Work Experience, Projects, Books):

1. **Click on the section** (e.g., "Work Experience")
2. **Click "Create"** or **"New"** button
3. **Fill in all fields**:
   - Required fields are marked with *
   - Set `order` field (lower numbers appear first)
   - Upload images if needed
4. **Click "Publish"**
5. **Your site updates automatically!**

---

## Step 5: Image Upload Tips

### For Project Images:
- Click **"Select"** → **"Upload"**
- Select your image file
- Images are automatically optimized by Sanity
- You can upload multiple images per project

### For Book Cover Images:
- Click **"Select"** → **"Upload"**
- Recommended size: 300x450px (book cover ratio)
- Images are automatically optimized

---

## Step 6: Icon Names

For icons (in About principles, Projects), use **lucide-react** icon names:
- `Brain`, `Users`, `TrendingUp`, `Target`, `Zap`
- `Package`, `ShoppingCart`, `Smartphone`, `Heart`
- `Plane`, `Megaphone`, `LineChart`
- See all icons: https://lucide.dev/icons/

---

## Step 7: Ordering Items

For lists (Work Experience, Projects, Books), use the **`order`** field:
- **Lower numbers appear first**
- Example: `0` appears before `1`
- You can use decimals: `0.5`, `1.5`, etc.

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

### Images Not Loading?

1. **Check image is uploaded** in Sanity
2. **Verify image is published** (not draft)
3. **Check browser console** for image URL errors
4. **Hard refresh** browser (`Cmd+Shift+R`)

---

## Quick Reference

- **Web Admin**: `https://your-site.vercel.app/admin`
- **Local Admin**: `npm run studio` → http://localhost:3333
- **Sanity Dashboard**: https://sanity.io/manage
- **Project ID**: `dju5bkf8`
- **Dataset**: `production`

---

## What Happens When You Edit?

1. **Edit content** in Sanity Studio
2. **Click "Publish"**
3. **Sanity updates** the content in their database
4. **Your site fetches** the new content automatically
5. **Changes appear** on your site within 10-30 seconds
6. **No code changes needed!** 🎉

---

## Next Steps

1. ✅ Add environment variables in Vercel
2. ✅ Access `/admin` on your site
3. ✅ Start editing content!
4. ✅ Publish changes
5. ✅ See updates on your site

**That's it!** Your entire portfolio is now editable through Sanity. 🚀

