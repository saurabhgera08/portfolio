# Quick Guide: Add Content to Sanity (No Studio Needed!)

## The Situation

You're seeing "Sanity Canvas" with "no studio detected" because the Studio hasn't been deployed yet. **But you can still add content!**

---

## ✅ Easiest Way: Use Sanity Dashboard

### Step 1: Go to Sanity Dashboard
1. Visit: **https://sanity.io/manage**
2. Click on your project (`dju5bkf8`)

### Step 2: Find Content Editor
Look for one of these:
- **"Content"** tab (if available)
- **"API"** → **"Vision"** (query tool)
- **"Documents"** section

### Step 3: Create Documents
1. Click **"Create"** or **"New Document"**
2. Choose a document type:
   - `hero` - Hero section
   - `about` - About section
   - `workExperience` - Work experience
   - `project` - Projects
   - `book` - Books
   - `skills` - Skills
   - `contact` - Contact info

3. Fill in the fields
4. Click **"Publish"**

---

## Alternative: Use Sanity CLI

You can also add content using the CLI:

```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npx sanity exec --with-user-token --dataset production
```

Then you can create documents interactively.

---

## What Content Types Can You Add?

Based on your schemas, you can add:

1. **Hero** - Main landing page content
2. **About** - About me section
3. **Work Experience** - Your work history (multiple entries)
4. **Projects** - Portfolio projects (multiple entries)
5. **Books** - Books you've read (multiple entries)
6. **Skills** - Skills and certifications
7. **Contact** - Contact information

---

## Recommendation

**For now, use the Sanity Dashboard** to add content. Once you have content, your portfolio will automatically fetch it!

We can deploy the Studio later for a better editing experience, but the dashboard works fine for adding initial content.

---

**Go to https://sanity.io/manage → Your Project → Look for Content/Documents → Create your first document!** 🚀

