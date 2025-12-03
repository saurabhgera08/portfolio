# Add Content to Sanity - Web Interface Guide

## ✅ Easiest Way: Use Sanity Dashboard

Since Studio deployment is having issues, use Sanity's web interface to add content!

---

## Step 1: Access Content Editor

1. Go to: **https://sanity.io/manage**
2. Click on your project (`dju5bkf8`)
3. Look for one of these:
   - **"Content"** tab
   - **"Documents"** section
   - **"Create"** or **"New Document"** button
   - **"API"** → **"Vision"** (for querying)

---

## Step 2: Create Your First Document

### Add Hero Content:

1. Click **"Create"** or **"New Document"**
2. Choose document type: **`hero`**
3. Fill in these fields:
   - **headline**: `Scaling Businesses Through\nClear Thinking &\nRelentless Execution`
   - **headlineHighlight**: `Relentless Execution`
   - **subheadline**: `I've driven 50%+ MoM growth...`
   - **ctaPrimary**: `Explore My Work`
   - **ctaSecondary**: `Get in Touch`
   - **stats**: Add array of stats (see your Hero component for examples)

4. Click **"Publish"**

---

## Step 3: Add More Content

Repeat for other document types:
- **`about`** - About section
- **`contact`** - Contact information
- **`workExperience`** - Work experiences (create multiple)
- **`project`** - Projects (create multiple)
- **`book`** - Books (create multiple)
- **`skills`** - Skills and certifications

---

## What Your Portfolio Will Do

Once you publish content:
1. Your portfolio fetches it from Sanity
2. Content appears on your site automatically
3. No code changes needed!

---

## Document Types Reference

### Hero (Single Document)
- headline, headlineHighlight, subheadline
- ctaPrimary, ctaSecondary
- stats (array)

### About (Single Document)
- title, personalStatement (rich text)
- thinkingPrinciples (array)
- achievements (rich text)
- valueProposition (rich text)
- interests (array)

### Work Experience (Multiple Documents)
- role, company, duration
- headline, story, learnings (array)
- clarity
- order (number)

### Projects (Multiple Documents)
- title, subtitle, tagline
- category (built-launched, strategic, analysis)
- images (array)
- problem, thinking (array), outcome, learning
- tags (array), timeline, link
- order (number)

### Books (Multiple Documents)
- title, author
- coverImage
- about, why, impact
- category (current, shaping, technology, history, fiction)
- order (number)

### Skills (Single Document)
- productSkills (array)
- technicalSkills (array)
- businessSkills (array)
- certifications (array)

### Contact (Single Document)
- email, phone, linkedin
- location
- interestedIn (array)
- letsTalkIf

---

## Quick Start

1. **Go to:** https://sanity.io/manage
2. **Click your project**
3. **Click "Create"** → Choose `hero`
4. **Fill in fields** → **"Publish"**
5. **Check your portfolio** - content should appear!

---

**That's it!** You can add all your content through the web interface. 🚀

