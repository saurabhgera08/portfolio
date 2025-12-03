# Vercel Deployment Guide - Step by Step

This guide will help you deploy your portfolio to Vercel for free hosting.

## Prerequisites

✅ Your code is on GitHub (see `GITHUB_SETUP.md` if not done yet)
✅ You have a GitHub account

## Step 1: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** in the top right
3. Click **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub account
5. Complete your profile (name, etc.)

## Step 2: Import Your Repository

1. Once logged in, you'll see the Vercel dashboard
2. Click **"Add New..."** → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find your portfolio repository and click **"Import"**

## Step 3: Configure Your Project

Vercel will auto-detect your project settings, but verify:

### Project Settings:
- **Framework Preset**: Should be "Vite" (auto-detected)
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `dist` (should be auto-filled)
- **Install Command**: `npm install` (should be auto-filled)

### Environment Variables:
Click **"Environment Variables"** and add:

1. **VITE_SANITY_PROJECT_ID**
   - Value: Your Sanity Project ID (from `.env` file)
   - Environment: Production, Preview, Development (check all)

2. **VITE_SANITY_DATASET**
   - Value: `production` (or your dataset name)
   - Environment: Production, Preview, Development (check all)

### Important:
- **DO NOT** add your `.env` file to GitHub (it's in `.gitignore`)
- Add environment variables in Vercel instead

## Step 4: Deploy!

1. Click **"Deploy"** button at the bottom
2. Wait 1-2 minutes for the build to complete
3. You'll see "Congratulations! Your deployment is ready"

## Step 5: Access Your Live Site

1. After deployment, you'll see a URL like: `your-portfolio.vercel.app`
2. Click the URL to see your live site!
3. **Bookmark this URL** - this is your portfolio!

## Step 6: Custom Domain (Optional)

If you want your own domain (like `yourname.com`):

1. In Vercel dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Enter your domain name
4. Follow Vercel's instructions to configure DNS

**Note**: You need to purchase a domain first (from Namecheap, GoDaddy, etc.)

## Automatic Deployments

🎉 **The best part**: Every time you push to GitHub, Vercel automatically:
- Detects the changes
- Rebuilds your site
- Deploys the new version
- Updates your live site!

No manual steps needed after the first deployment.

## Updating Your Site

### Method 1: Through GitHub (Recommended)
1. Make changes locally
2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio content"
   git push
   ```
3. Vercel automatically deploys (check Vercel dashboard)

### Method 2: Through Sanity CMS
1. Edit content in Sanity Studio (`npm run studio`)
2. Changes appear immediately (no rebuild needed!)

## Environment Variables Management

### Adding New Variables:
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Add new variable
3. Redeploy (or wait for next push)

### Updating Existing Variables:
1. Edit the variable in Vercel dashboard
2. Click "Save"
3. Redeploy (or wait for next push)

## Troubleshooting

### Build Failed
- Check the build logs in Vercel dashboard
- Common issues:
  - Missing environment variables
  - Build command errors
  - Missing dependencies

### Site Shows Old Content
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check Vercel deployment logs
- Verify environment variables are set

### Environment Variables Not Working
- Make sure variables start with `VITE_` (required for Vite)
- Check that variables are set for all environments
- Redeploy after adding variables

### Sanity Data Not Showing
- Verify `VITE_SANITY_PROJECT_ID` is set correctly
- Check that `VITE_SANITY_DATASET` matches your Sanity dataset
- Make sure you've added content in Sanity Studio

## Vercel Dashboard Features

### Deployments Tab
- See all deployments
- View build logs
- Rollback to previous versions

### Analytics Tab
- View visitor statistics (on Pro plan)
- See performance metrics

### Settings Tab
- Environment variables
- Domain configuration
- Build settings

## Free Tier Limits

Vercel's free tier includes:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Preview deployments for every push

**More than enough for a portfolio!**

## Next Steps

1. ✅ Share your portfolio URL with others
2. ✅ Add it to your resume/LinkedIn
3. ✅ Update content through Sanity Studio
4. ✅ Customize your domain (optional)

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Quick Reference

**Your Portfolio URL**: `https://your-portfolio.vercel.app`
**Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
**Sanity Studio**: Run `npm run studio` locally

