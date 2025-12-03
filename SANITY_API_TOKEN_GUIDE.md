# Sanity API Token Guide

## Do You Need an API Token?

### Short Answer: **NO, you don't need one for a portfolio!**

Here's why:

## For Your Portfolio Website (Reading Content)

**You DON'T need a token** because:
- Your portfolio content is **public** (meant to be seen by everyone)
- Sanity allows **public read access** by default
- The website only **reads** content (doesn't write)
- No authentication needed for public content

## For the Admin Panel (Editing Content)

**You DON'T need a token** because:
- Sanity Studio uses **OAuth login** (you log in with your Sanity account)
- Authentication is handled automatically
- You're already logged in when you use `npm run studio`

## When WOULD You Need a Token?

You'd only need a token if:
- ❌ You want to **secure** your API (make it private)
- ❌ You're building a **server-side** application
- ❌ You need **write access** from your website (not Studio)

**For a portfolio, none of these apply!**

---

## If You Still Want to Add a Token (Optional)

If you want extra security or plan to add server-side features later:

### Step 1: Create a Read Token
1. Go to Sanity Dashboard → Your Project → **Settings** → **API**
2. Scroll to **"Tokens"** section
3. Click **"Add API token"**
4. Name it: `Portfolio Read Token`
5. Choose **"Viewer"** permission (read-only)
6. Click **"Save"**
7. **Copy the token** (you won't see it again!)

### Step 2: Add to .env File
Add this line to your `.env` file:
```
VITE_SANITY_TOKEN=your-token-here
```

### Step 3: Update Client (Optional)
If you add a token, update `sanity/lib/client.ts`:
```typescript
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
  token: import.meta.env.VITE_SANITY_TOKEN, // Add this line
})
```

**But again, you don't need this for a basic portfolio!**

---

## Token Types Explained

If you're curious about the different token types:

- **Viewer** - Read-only access (perfect for portfolios)
- **Editor** - Can read and write content
- **Developer** - Full access (for building tools)
- **Contributor** - Can create/edit content
- **Deploy Studio** - For deploying Studio to production

**For your portfolio: None needed!** ✅

---

## Summary

✅ **What you need:**
- Project ID (from Settings → API)
- Dataset name (usually "production")

❌ **What you DON'T need:**
- API Token (for a public portfolio)
- Any special permissions
- Server-side setup

**Your portfolio will work perfectly without a token!**

