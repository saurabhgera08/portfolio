# How to Change the Favicon

## Quick Steps

### Option 1: Replace the Existing File (Easiest)

1. **Create or find your favicon image**
   - Size: 32x32 pixels or 16x16 pixels (square)
   - Format: `.ico` (best) or `.png`
   - You can use online tools like: https://favicon.io/ or https://realfavicongenerator.net/

2. **Replace the file**
   - Go to: `public/favicon.ico`
   - Delete the old `favicon.ico`
   - Copy your new favicon file and name it `favicon.ico`
   - Place it in the `public/` folder

3. **Clear browser cache**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Or clear browser cache

### Option 2: Use a PNG Image

If you have a `.png` file instead:

1. Place your image in `public/` folder (e.g., `public/favicon.png`)
2. Update `index.html` line 4 to:
   ```html
   <link rel="icon" type="image/png" href="/favicon.png" />
   ```

### Option 3: Generate Favicon Online

1. Go to: https://favicon.io/
2. Upload your logo/image
3. Download the generated favicon
4. Replace `public/favicon.ico` with the downloaded file

---

## After Changing

1. **Test locally**: `npm run dev` - check if favicon appears
2. **Commit and push**:
   ```bash
   git add public/favicon.ico
   git commit -m "Update favicon"
   git push origin main
   ```
3. **Wait for Vercel to redeploy** (2-3 minutes)
4. **Hard refresh** your site

---

## Tips

- **Best size**: 32x32 or 16x16 pixels
- **Format**: `.ico` works everywhere, `.png` also works
- **Multiple sizes**: You can add multiple favicon sizes for different devices (see favicon.io for options)

---

**That's it!** Your new favicon will appear after deployment. 🎨

