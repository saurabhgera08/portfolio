# Image Setup Guide for Portfolio

## Recommended Image Sizes

### Portfolio Project Banners (Hero Images)
- **Desktop**: 1920px × 1080px (16:9 aspect ratio)
- **Mobile**: Same image, will be cropped/resized automatically
- **Format**: JPG (for photos) or PNG (for graphics)
- **File Size**: Keep under 500KB for fast loading
- **Naming**: Use descriptive names like `project-zipowatt-banner.jpg`

### Book Cover Images
- **Size**: 400px × 600px (2:3 aspect ratio - standard book cover)
- **Format**: JPG or PNG
- **File Size**: Keep under 200KB each
- **Naming**: Use book title, e.g., `book-shoe-dog.jpg`, `book-steve-jobs.jpg`

### Profile/About Images (if needed)
- **Size**: 800px × 800px (square) or 1200px × 600px (banner)
- **Format**: JPG or PNG
- **File Size**: Keep under 300KB

---

## Where to Place Images

### Step 1: Create Image Folders

Create these folders in the `public` directory:

```
public/
├── images/
│   ├── projects/
│   │   ├── zipowatt-banner.jpg
│   │   ├── swnck-banner.jpg
│   │   └── [other-project-banners]
│   └── books/
│       ├── train-to-pakistan.jpg
│       ├── shoe-dog.jpg
│       ├── steve-jobs.jpg
│       ├── the-gene.jpg
│       ├── elon-musk.jpg
│       ├── master-algorithm.jpg
│       ├── superintelligence.jpg
│       ├── zen-motorcycle.jpg
│       ├── mans-search-meaning.jpg
│       ├── harry-potter.jpg
│       └── name-of-wind.jpg
```

### Step 2: Add Your Images

1. **Download or create your images** at the recommended sizes above
2. **Optimize them** (use tools like TinyPNG, Squoosh, or ImageOptim)
3. **Place them** in the appropriate folders:
   - Project banners → `public/images/projects/`
   - Book covers → `public/images/books/`

### Step 3: Update Code to Use Images

Images in the `public` folder are accessible via `/images/...` paths.

**Example:**
- File: `public/images/projects/zipowatt-banner.jpg`
- Use in code: `/images/projects/zipowatt-banner.jpg`

---

## Image Optimization Tips

### Before Adding Images:

1. **Resize** to recommended dimensions
2. **Compress** using:
   - [TinyPNG](https://tinypng.com/) - Free online tool
   - [Squoosh](https://squoosh.app/) - Google's image optimizer
   - [ImageOptim](https://imageoptim.com/) - Mac app
3. **Test** on both mobile and desktop

### Best Practices:

- ✅ Use JPG for photos (smaller file size)
- ✅ Use PNG for graphics/logos (transparency support)
- ✅ Keep file sizes small (< 500KB for banners, < 200KB for books)
- ✅ Use descriptive filenames
- ✅ Consider WebP format for even smaller sizes (modern browsers)

---

## Responsive Image Handling

The portfolio already handles responsive images:

- **Desktop**: Full-width banners, larger book covers
- **Mobile**: Automatically resized and optimized
- **Tablet**: Medium sizes

You don't need to create separate mobile/desktop versions - the CSS handles this automatically.

---

## Quick Checklist

- [ ] Create `public/images/projects/` folder
- [ ] Create `public/images/books/` folder
- [ ] Add project banner images (1920×1080px)
- [ ] Add book cover images (400×600px)
- [ ] Optimize all images (compress)
- [ ] Update code with image paths
- [ ] Test on mobile and desktop

---

## Need Help?

If you need help:
1. Finding book cover images: Try [Open Library](https://openlibrary.org/) or [Goodreads](https://www.goodreads.com/)
2. Creating project banners: Use tools like Canva, Figma, or Photoshop
3. Optimizing images: Use the tools mentioned above

**Let me know when you've added your images and I'll help update the code!** 🎨

