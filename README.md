# Saurabh's Portfolio

A modern, professional portfolio website built with React, TypeScript, and Sanity CMS.

## ✨ Features

- 🎨 **Beautiful Design** - Modern, clean, and professional
- 📝 **Content Management** - Edit everything through Sanity CMS admin panel
- 🖼️ **Image Management** - Upload and manage images easily
- 🚀 **Fast & Free** - Hosted on Vercel with global CDN
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Auto-Deploy** - Updates automatically when you push to GitHub

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Sanity CMS
1. Create account at [sanity.io](https://sanity.io)
2. Create a project
3. Create `.env` file with your Sanity credentials:
   ```
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   ```

### 3. Start Development Server
```bash
npm run dev
```
Visit `http://localhost:8080`

### 4. Start Admin Panel
```bash
npm run studio
```
Visit `http://localhost:3333` to edit content

## 📚 Documentation

- **[Complete Setup Guide](./COMPLETE_SETUP_GUIDE.md)** - Start here! Everything step-by-step
- **[Sanity Setup](./SANITY_SETUP.md)** - Detailed CMS setup
- **[GitHub Setup](./GITHUB_SETUP.md)** - Push code to GitHub
- **[Vercel Deployment](./VERCEL_DEPLOYMENT.md)** - Deploy for free
- **[Quick Start](./QUICK_START.md)** - 5-minute setup

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Sanity CMS** - Content management
- **Vercel** - Hosting

## 📝 Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run studio` - Start Sanity admin panel (port 3333)
- `npm run preview` - Preview production build

## 🎯 Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities and queries
│   └── ...
├── sanity/
│   ├── schemas/        # Content schemas
│   └── lib/            # Sanity client
└── ...
```

## 🔄 Updating Content

### Through Admin Panel (Recommended)
1. Run `npm run studio`
2. Edit content in the web interface
3. Changes appear immediately!

### Through Code
1. Edit files in `src/components/`
2. Push to GitHub
3. Vercel auto-deploys

## 🌐 Deployment

This project is configured for Vercel deployment:

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
4. Deploy!

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for details.

## 📖 Learn More

- [React Documentation](https://react.dev)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📄 License

Personal portfolio project - feel free to use as inspiration!

---

**Built with ❤️ using modern web technologies**
