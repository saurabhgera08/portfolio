# Deployment Checklist - Step by Step

## ✅ Pre-Deployment Checklist

- [x] Portfolio works locally with fallback content
- [x] Sanity configured (can add content later)
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set in Vercel

---

## Step 1: Push to GitHub

### 1.1: Initialize Git (if not done)
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
git init
```

### 1.2: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `portfolio` (or your choice)
3. Make it **Public** (required for free Vercel)
4. **Don't** check "Add README" (we have files)
5. Click **"Create repository"**

### 1.3: Add and Commit Files
```bash
git add .
git commit -m "Initial portfolio deployment"
```

### 1.4: Connect to GitHub
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

**Replace:**
- `YOUR-USERNAME` with your GitHub username
- `YOUR-REPO-NAME` with your repository name

---

## Step 2: Deploy to Vercel

### 2.1: Create Vercel Account
1. Go to: https://vercel.com
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel

### 2.2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find your repository
3. Click **"Import"**

### 2.3: Configure Project
- **Framework Preset**: Vite (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)

### 2.4: Add Environment Variables
Click **"Environment Variables"** and add:

1. **VITE_SANITY_PROJECT_ID**
   - Value: `dju5bkf8`
   - Environments: ✅ Production ✅ Preview ✅ Development

2. **VITE_SANITY_DATASET**
   - Value: `production`
   - Environments: ✅ Production ✅ Preview ✅ Development

3. **VITE_SANITY_TOKEN** (optional)
   - Value: `sk7McYuVk3Q8DZR614p7YWqAFi8y00CYvQzfRKFOyARPRXuv3ar1iwQ71h8NhTRw0n3lUHN3gUN0YKtuVjyL7rYjAIAsBMgdsWIPGt3sM6tpM6UWtSYRUbcdcHOB0FfzCHLTG3jr8YYuj3oRfOAVDLwiveX6zOmUZRSwOcAMG5oONZtYwjry`
   - Environments: ✅ Production ✅ Preview ✅ Development

### 2.5: Deploy!
1. Click **"Deploy"**
2. Wait 1-2 minutes
3. **Your site is live!** 🎉

---

## Step 3: Get Your Live URL

After deployment, Vercel will give you a URL like:
`https://your-portfolio.vercel.app`

**This is your live portfolio!** Share it with the world!

---

## Step 4: Test Your Site

1. Visit your Vercel URL
2. Check all sections load correctly
3. Test on mobile (Vercel is responsive)
4. Share with friends!

---

## Future: Add Sanity Content

When you're ready to add Sanity content:
1. Use Sanity web dashboard: https://sanity.io/manage
2. Create documents (Hero, About, Projects, etc.)
3. Your portfolio will automatically fetch and display them!

---

## Troubleshooting

### Build Fails
- Check environment variables are set
- Check build logs in Vercel dashboard

### Site Shows Old Content
- Clear browser cache
- Check Vercel deployment logs

### Environment Variables Not Working
- Make sure they start with `VITE_`
- Redeploy after adding variables

---

## 🎉 You're Done!

Your portfolio is now live and accessible to the world!

