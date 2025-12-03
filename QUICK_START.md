# Quick Start: Admin Panel Setup

## 🚀 Get Started in 5 Minutes

### 1. Create Sanity Account & Project
- Visit [sanity.io](https://sanity.io) and sign up (free)
- Create a new project
- Copy your **Project ID** from Settings → API

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:

```env
VITE_SANITY_PROJECT_ID=your-project-id-here
VITE_SANITY_DATASET=production
```

### 3. Initialize Sanity Studio
```bash
npx sanity init
```

When prompted:
- ✅ Use existing project (select the one you just created)
- ✅ Production dataset
- ✅ Default project path

### 4. Start the Admin Panel
```bash
npm run studio
```

Open `http://localhost:3333` in your browser - you now have a full admin interface! 🎉

## 📝 What You Can Edit

The admin panel lets you edit:

- ✅ **Hero Section** - Headlines, CTAs, statistics
- ✅ **About Section** - Personal statement, principles, achievements
- ✅ **Work Experience** - Add/edit job history
- ✅ **Projects** - Portfolio projects with images
- ✅ **Books** - Reading list with cover images
- ✅ **Skills** - Skills and certifications
- ✅ **Contact** - Contact information

## 🖼️ Image Management

- Click any image field in the admin panel
- Upload images directly from your computer
- Images are automatically optimized and hosted
- No need to manage image files manually!

## 🔄 Next Steps

1. **Add your content**: Start adding content through the admin panel
2. **Update components**: Modify components to fetch from Sanity (see `src/lib/sanity-queries.ts` for examples)
3. **Deploy**: Deploy your portfolio and admin panel

## 📚 Full Documentation

See `SANITY_SETUP.md` for detailed setup instructions and troubleshooting.

## 💡 Tips

- The admin panel runs separately from your portfolio (`npm run studio`)
- Your portfolio runs with `npm run dev` (port 8080)
- Changes in Sanity appear immediately (no rebuild needed)
- Images are automatically optimized and served from Sanity's CDN

