# GitHub Setup Guide - Step by Step

This guide will help you push your portfolio to GitHub so you can deploy it to Vercel.

## Step 1: Create a GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com)
2. Click **"Sign up"** in the top right
3. Enter your email, create a password, and verify your account
4. Choose the **free plan** (it's all you need!)

## Step 2: Create a New Repository

1. Once logged in, click the **"+"** icon in the top right
2. Click **"New repository"**
3. Fill in:
   - **Repository name**: `portfolio` (or any name you like)
   - **Description**: "My professional portfolio website"
   - **Visibility**: Choose **Public** (free hosting requires public repos)
   - **DO NOT** check "Add a README file" (we already have files)
4. Click **"Create repository"**

## Step 3: Install Git (if not already installed)

### Check if Git is installed:
Open Terminal (Mac) or Command Prompt (Windows) and type:
```bash
git --version
```

If you see a version number, you're good! Skip to Step 4.

### If Git is NOT installed:

**On Mac:**
- Git usually comes pre-installed. If not, install Xcode Command Line Tools:
```bash
xcode-select --install
```

**On Windows:**
- Download from [git-scm.com](https://git-scm.com/download/win)
- Run the installer (use default options)

## Step 4: Configure Git (First Time Only)

Open Terminal/Command Prompt and run these commands (replace with YOUR info):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 5: Initialize Git in Your Project

1. Open Terminal/Command Prompt
2. Navigate to your project folder:
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
```

3. Initialize Git:
```bash
git init
```

## Step 6: Add Your Files

```bash
# Add all files
git add .

# Check what will be committed (optional)
git status
```

## Step 7: Create Your First Commit

```bash
git commit -m "Initial commit: Portfolio website with Sanity CMS"
```

## Step 8: Connect to GitHub

1. Go back to your GitHub repository page
2. You'll see instructions, but copy the repository URL (looks like: `https://github.com/yourusername/portfolio.git`)

3. In Terminal, run:
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name.

## Step 9: Push Your Code

```bash
git branch -M main
git push -u origin main
```

You'll be asked for your GitHub username and password (or a Personal Access Token).

### If asked for a password:
GitHub no longer accepts passwords. You need a **Personal Access Token**:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token (classic)"**
3. Give it a name like "Portfolio Upload"
4. Check **"repo"** scope
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)
7. Use this token as your password when pushing

## Step 10: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files!

## Common Commands for Future Updates

When you make changes and want to update GitHub:

```bash
# 1. See what changed
git status

# 2. Add changes
git add .

# 3. Commit changes
git commit -m "Description of what you changed"

# 4. Push to GitHub
git push
```

## Troubleshooting

### "Repository not found" error
- Check that your repository URL is correct
- Make sure the repository exists on GitHub
- Verify your username is correct

### "Permission denied" error
- Make sure you're using a Personal Access Token, not password
- Check that the token has "repo" permissions

### "Already up to date" message
- This means everything is already pushed - you're good!

## Next Steps

Once your code is on GitHub, you can:
1. ✅ Deploy to Vercel (see `VERCEL_DEPLOYMENT.md`)
2. ✅ Share your code with others
3. ✅ Keep track of changes over time

## Need Help?

- GitHub Docs: [docs.github.com](https://docs.github.com)
- Git Basics: [git-scm.com/book](https://git-scm.com/book)

