# Vercel Deployment Guide

This Next.js application is optimized for Vercel deployment.

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/diyasaxena17/MediMonitor)

## Manual Deployment

### Option 1: Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New Project"
4. Import your repository: `diyasaxena17/MediMonitor`
5. Click "Deploy"

No configuration needed! Vercel automatically detects Next.js.

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Environment Variables

This app doesn't require any environment variables. All data is stored locally in the browser.

## Build Settings

Vercel will automatically use:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Performance

- Static generation for optimal performance
- No API routes or server-side functions
- All pages pre-rendered at build time
- Instant page loads

## Post-Deployment

After deployment, your app will be available at:
- Production: `https://your-project.vercel.app`
- Preview deployments for each PR

## Troubleshooting

If deployment fails:
1. Ensure `package.json` has all dependencies
2. Check build logs in Vercel dashboard
3. Verify Node.js version (should be 18+)

## Local Testing

Before deploying, test the production build locally:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` to preview.
