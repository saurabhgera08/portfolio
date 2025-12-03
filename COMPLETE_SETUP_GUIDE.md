# Complete Setup Guide - From Zero to Live Portfolio

This is your **complete step-by-step guide** to get everything working. Follow in order!

## 🎯 What We're Building

- ✅ Professional portfolio website
- ✅ Admin panel to edit content (Sanity CMS)
- ✅ Image upload and management
- ✅ Free hosting on Vercel
- ✅ Automatic updates when you push to GitHub

---

## 📋 Part 1: Sanity CMS Setup (Content Management)

### Step 1.1: Create Sanity Account
1. Go to [sanity.io](https://sanity.io)
2. Click **"Start for free"**
3. Sign up with Google/GitHub or email
4. Verify your email

### Step 1.2: Create a Project
1. Click **"Create project"**
2. Name it: `Portfolio CMS` (or any name)
3. Choose **"Production"** dataset
4. Click **"Create"**

### Step 1.3: Get Your Project ID
1. In Sanity dashboard, click **"Settings"** (gear icon)
2. Click **"API"** in the left menu
3. Copy your **Project ID** (looks like: `abc123xyz`)
4. Note your **Dataset** name (usually `production`)

### Step 1.4: Set Up Environment Variables
1. In your project folder, create a file named `.env`
2. Add these lines (replace with YOUR values):
   ```
   VITE_SANITY_PROJECT_ID=your-project-id-here
   VITE_SANITY_DATASET=production
   ```
3. Save the file

### Step 1.5: Start Admin Panel
1. Open Terminal in your project folder
2. Run: `npm run studio`
3. Browser opens to `http://localhost:3333`
4. **You now have an admin panel!** 🎉

### Step 1.6: Add Your Content
1. In Sanity Studio, click on each section:
   - **Hero Section** - Add your headline, stats
   - **About Section** - Add your bio
   - **Work Experience** - Add your jobs
   - **Projects** - Add your projects
   - **Books** - Add your reading list
   - **Skills** - Add your skills
   - **Contact** - Add contact info

2. **Upload images** by clicking image fields
3. Content saves automatically!

---

## 📋 Part 2: GitHub Setup (Code Storage)

### Step 2.1: Create GitHub Account
1. Go to [github.com](https://github.com)
2. Click **"Sign up"**
3. Create account (free plan is fine)

### Step 2.2: Create Repository
1. Click **"+"** → **"New repository"**
2. Name: `portfolio` (or your choice)
3. Make it **Public**
4. **Don't** check "Add README"
5. Click **"Create repository"**

### Step 2.3: Install Git (if needed)
**Check if installed:**
```bash
git --version
```

**If not installed:**
- **Mac**: Usually pre-installed. If not: `xcode-select --install`
- **Windows**: Download from [git-scm.com](https://git-scm.com/download/win)

### Step 2.4: Configure Git (First Time)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 2.5: Push Your Code
1. Open Terminal in your project folder
2. Run these commands:

```bash
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial portfolio setup"

# Connect to GitHub (replace YOUR-USERNAME and YOUR-REPO)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If asked for password:** Use a GitHub Personal Access Token (see `GITHUB_SETUP.md` for details)

### Step 2.6: Verify
1. Refresh your GitHub repository page
2. You should see all your files!

---

## 📋 Part 3: Vercel Deployment (Free Hosting)

### Step 3.1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Click **"Continue with GitHub"**
4. Authorize Vercel

### Step 3.2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find your portfolio repository
3. Click **"Import"**

### Step 3.3: Configure Environment Variables
1. In project settings, click **"Environment Variables"**
2. Add these two:

   **Variable 1:**
   - Name: `VITE_SANITY_PROJECT_ID`
   - Value: Your Sanity Project ID
   - Environments: ✅ Production ✅ Preview ✅ Development

   **Variable 2:**
   - Name: `VITE_SANITY_DATASET`
   - Value: `production`
   - Environments: ✅ Production ✅ Preview ✅ Development

3. Click **"Save"** for each

### Step 3.4: Deploy!
1. Click **"Deploy"** button
2. Wait 1-2 minutes
3. **Done!** Your site is live! 🎉

### Step 3.5: Get Your URL
1. After deployment, you'll see a URL like: `your-portfolio.vercel.app`
2. **This is your live portfolio!** Share it with the world!

---

## ✅ You're Done! Here's What You Have:

1. ✅ **Live Portfolio**: `https://your-portfolio.vercel.app`
2. ✅ **Admin Panel**: Run `npm run studio` to edit content
3. ✅ **GitHub Repo**: All your code is saved
4. ✅ **Auto-Deploy**: Every GitHub push = automatic update

---

## 🔄 Daily Workflow

### To Update Content:
1. Run `npm run studio` locally
2. Edit content in the admin panel
3. Changes appear immediately!

### To Update Code:
1. Make changes to files
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "What you changed"
   git push
   ```
3. Vercel automatically deploys!

---

## 🆘 Troubleshooting

### Admin Panel Won't Start
- Check `.env` file exists with correct values
- Make sure you ran `npm install`

### Site Shows Old Content
- Clear browser cache (Ctrl+Shift+R)
- Check Vercel deployment logs
- Verify environment variables in Vercel

### Can't Push to GitHub
- Check your GitHub username/repo name
- Use Personal Access Token, not password
- See `GITHUB_SETUP.md` for details

### Build Fails on Vercel
- Check environment variables are set
- Look at build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`

---

## 📚 Detailed Guides

- **Sanity Setup**: See `SANITY_SETUP.md`
- **GitHub Setup**: See `GITHUB_SETUP.md`
- **Vercel Deployment**: See `VERCEL_DEPLOYMENT.md`
- **Quick Start**: See `QUICK_START.md`

---

## 🎉 Next Steps

1. ✅ Customize your portfolio content
2. ✅ Add your projects and work experience
3. ✅ Upload images
4. ✅ Share your portfolio URL!
5. ✅ (Optional) Add a custom domain

---

## 💡 Pro Tips

- **Backup**: Your code is safe on GitHub
- **Version Control**: Git tracks all changes
- **Free Forever**: Vercel free tier is generous
- **No Server**: Everything is serverless (no maintenance!)
- **Fast**: Vercel uses global CDN (fast worldwide)

---

**Questions?** Check the detailed guides or Vercel/Sanity documentation.

**You've got this!** 🚀

