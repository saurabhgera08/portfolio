# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your portfolio so you can edit content and images through a web interface.

## Step 1: Create a Sanity Account

1. Go to [https://sanity.io](https://sanity.io)
2. Sign up for a free account (generous free tier)
3. Create a new project

## Step 2: Get Your Project Credentials

1. After creating a project, go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy your **Project ID** and **Dataset** name (usually "production")

## Step 3: Configure Environment Variables

1. Create a `.env` file in the root directory (copy from `.env.example`)
2. Add your Sanity credentials:

```env
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
```

## Step 4: Initialize Sanity Studio

Run the following command to initialize Sanity Studio:

```bash
npx sanity init
```

When prompted:
- Choose **"Create new project"** or **"Use existing project"**
- Select your project
- Choose **"Production"** dataset
- Accept the default project path (or customize)
- Choose **"No"** for the example dataset

## Step 5: Start the Admin Panel

Run the Studio:

```bash
npm run studio
```

This will start Sanity Studio on `http://localhost:3333`

## Step 6: Create Your First Content

1. Open `http://localhost:3333` in your browser
2. You'll see the content structure we've set up:
   - **Hero Section** - Main landing page content
   - **About Section** - About me content
   - **Work Experience** - Your work history
   - **Projects** - Your portfolio projects
   - **Books** - Reading list
   - **Skills & Certifications** - Your skills
   - **Contact Information** - Contact details

3. Start creating content! Click on any section to add/edit content.

## Step 7: Update Your Components (Optional)

Currently, your components use hardcoded data. To fetch from Sanity:

1. Use the `client` from `sanity/lib/client.ts` to fetch data
2. Update components to use fetched data instead of hardcoded arrays
3. Use `urlFor()` from `sanity/lib/image.ts` for images

Example:

```typescript
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// Fetch hero data
const heroData = await client.fetch(`*[_type == "hero"][0]`)

// Use image URL
const imageUrl = urlFor(heroData.image).url()
```

## Image Upload

Sanity Studio automatically handles image uploads:
- Click the image field
- Upload from your computer
- Images are automatically optimized and hosted on Sanity's CDN
- No need to manage image files manually!

## Content Structure

### Hero Section
- Single document (ID: "hero")
- Contains headline, subheadline, CTA buttons, and stats

### About Section
- Single document (ID: "about")
- Contains personal statement, thinking principles, achievements

### Work Experience
- Multiple documents
- Ordered by "order" field
- Each has role, company, duration, story, learnings

### Projects
- Multiple documents
- Ordered by "order" field
- Supports images, categories, tags

### Books
- Multiple documents
- Categorized by type (current, shaping, technology, etc.)
- Supports cover images

### Skills
- Single document (ID: "skills")
- Contains arrays of skills and certifications

### Contact
- Single document (ID: "contact")
- Contains email, phone, LinkedIn, location

## Troubleshooting

### Studio won't start
- Make sure `.env` file exists with correct credentials
- Check that `VITE_SANITY_PROJECT_ID` is set correctly

### Can't see content types
- Make sure all schema files are in `sanity/schemas/`
- Check `sanity/schemas/index.ts` exports all schemas

### Images not showing
- Make sure you're using `urlFor()` helper for image URLs
- Check that images are uploaded in Sanity Studio

## Next Steps

1. **Migrate existing content**: Copy your current hardcoded content into Sanity Studio
2. **Update components**: Modify components to fetch from Sanity instead of using hardcoded data
3. **Deploy**: Deploy your portfolio and Sanity Studio separately
   - Portfolio: Deploy to Vercel/Netlify
   - Studio: Deploy to `your-site.com/admin` or run separately

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity React Guide](https://www.sanity.io/docs/react)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)

