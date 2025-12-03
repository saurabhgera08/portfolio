# Vercel Deployment Settings

## Framework Preset

**Select: `Vite`**

Vercel should auto-detect this, but if it doesn't, manually select **"Vite"**.

---

## Complete Vercel Configuration

### Framework Preset
- **Select:** `Vite`

### Root Directory
- **Leave as:** `./` (default)

### Build Command
- **Should be:** `npm run build`
- (This is auto-filled, just verify)

### Output Directory
- **Should be:** `dist`
- (This is auto-filled, just verify)

### Install Command
- **Should be:** `npm install`
- (This is auto-filled, just verify)

---

## Environment Variables

Add these 3 variables:

1. **VITE_SANITY_PROJECT_ID** = `dju5bkf8`
2. **VITE_SANITY_DATASET** = `production`
3. **VITE_SANITY_TOKEN** = `your-sanity-token-here`

**For each variable, check all environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

---

## That's It!

Once you set Framework to **Vite** and add the environment variables, click **"Deploy"**!

Vercel will:
1. Install dependencies (`npm install`)
2. Build your project (`npm run build`)
3. Deploy to their CDN
4. Give you a live URL!

---

**Framework: Vite** ✅

