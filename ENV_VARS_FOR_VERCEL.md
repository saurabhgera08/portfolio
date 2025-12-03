# Environment Variables for Vercel

**Keep this file local - don't push tokens to GitHub!**

## Add These in Vercel Dashboard

Go to: Vercel → Your Project → Settings → Environment Variables

### Variable 1:
- **Name:** `VITE_SANITY_PROJECT_ID`
- **Value:** `dju5bkf8`
- **Environments:** ✅ Production ✅ Preview ✅ Development

### Variable 2:
- **Name:** `VITE_SANITY_DATASET`
- **Value:** `production`
- **Environments:** ✅ Production ✅ Preview ✅ Development

### Variable 3 (Optional):
- **Name:** `VITE_SANITY_TOKEN`
- **Value:** Get from your `.env` file (starts with `ghp_`)
- **Environments:** ✅ Production ✅ Preview ✅ Development

---

## How to Get Your Token

1. Check your `.env` file locally
2. Or create a new one at: https://github.com/settings/tokens/new
3. Copy the token (starts with `ghp_`)
4. Paste it in Vercel (never commit it to git!)

---

**Remember:** Never commit tokens to GitHub! Always add them in Vercel's dashboard.

