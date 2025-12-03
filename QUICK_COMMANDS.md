# Quick Commands Reference

## ⚠️ Important: Always Run Commands from the Project Folder!

Your project is located at:
```
/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main
```

## 🚀 Common Commands

### Navigate to Project Folder First:
```bash
cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
```

### Then Run These Commands:

#### Start Development Server (Portfolio)
```bash
npm run dev
```
Opens at: `http://localhost:8080`

#### Start Admin Panel (Sanity Studio)
```bash
npm run studio
```
Opens at: `http://localhost:3333`

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## 💡 Pro Tip: Create an Alias

Add this to your `~/.zshrc` file to make it easier:

```bash
alias portfolio='cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh'\''s Portfolio/saurabh-s-product-journey-main"'
```

Then you can just type `portfolio` to navigate there!

## 🔍 Troubleshooting

### "package.json not found" Error
- **Problem**: You're in the wrong directory
- **Solution**: Navigate to the project folder first (see above)

### "Port already in use" Error
- **Problem**: Another process is using the port
- **Solution**: 
  - Stop the other process, OR
  - Kill the process: `lsof -ti:3333 | xargs kill` (for port 3333)

### "Module not found" Error
- **Problem**: Dependencies not installed
- **Solution**: Run `npm install` first

## 📝 Quick Workflow

1. **Open Terminal**
2. **Navigate to project:**
   ```bash
   cd "/Volumes/T7/Saurabh Data Backup/App Development/Saurabh's Portfolio/saurabh-s-product-journey-main"
   ```
3. **Start what you need:**
   - `npm run dev` - View your portfolio
   - `npm run studio` - Edit content

## 🎯 Remember

**Always run commands from inside the project folder!**

The project folder is: `saurabh-s-product-journey-main`

