# Check Sanity Project Access

## Current Project Details

- **Project ID**: `dju5bkf8`
- **Dataset**: `production`
- **Expected Email**: `saurabhgera08@gmail.com`

---

## Steps to Fix Permissions

### Step 1: Verify Login

Run this command:
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
npx sanity whoami
```

**Expected output**: `saurabhgera08@gmail.com`

If it shows a different email, that's the problem!

### Step 2: Log Out and Log Back In

```bash
npx sanity logout
npx sanity login
```

**Important**: When logging in, make sure to use `saurabhgera08@gmail.com`

### Step 3: Check Project Access

After logging in, try:
1. Go to: https://sanity.io/manage
2. You should see your project listed
3. Click on it - you should have access

---

## If Project Doesn't Exist

If you don't see the project `dju5bkf8`:

### Option 1: Create New Project

1. Go to: https://sanity.io/manage
2. Click **"Create Project"**
3. Name: `Portfolio CMS`
4. Copy the **new Project ID**
5. Update your `.env` file:
   ```
   VITE_SANITY_PROJECT_ID=new-project-id-here
   ```
6. Update `sanity.config.ts` and `sanity.cli.ts` with new Project ID

### Option 2: Check Other Accounts

The project might be under a different Google account:
- Check other Google accounts you have
- Try logging in with different accounts
- Check if you received any project invitations

---

## Direct Project URL

Try accessing directly:
- https://sanity.io/manage/personal/project/dju5bkf8

If this gives permissions error, the project is either:
1. Under a different account
2. Doesn't exist
3. You need to be invited

---

## Quick Test

1. **Log out**: `npx sanity logout`
2. **Log in**: `npx sanity login`
3. **Check account**: `npx sanity whoami`
4. **Access dashboard**: https://sanity.io/manage

**If you still see permissions error, the project is likely under a different account or doesn't exist.**

---

## Next Steps

If you can't access the project:
1. **Create a new project** (takes 2 minutes)
2. **Update Project ID** in your code
3. **Start adding content**

**Let me know what `npx sanity whoami` shows and I'll help you fix it!** 🔧

