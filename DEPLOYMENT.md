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

Copy `.env.local.example` to `.env.local` and fill in your Auth0 values. Create a **Regular Web Application** in the [Auth0 Dashboard](https://manage.auth0.com) and set:

- `AUTH0_DOMAIN` — your Auth0 tenant domain (e.g. `dev-xxxx.us.auth0.com`)
- `AUTH0_CLIENT_ID` — from Auth0 application settings
- `AUTH0_CLIENT_SECRET` — from Auth0 application settings
- `AUTH0_SECRET` — random 32-byte hex string (`openssl rand -hex 32`)

In the Auth0 Dashboard, configure your application's:
- **Allowed Callback URLs**: `https://medimonitor-app.vercel.app/auth/callback`, `http://localhost:3000/auth/callback`
- **Allowed Logout URLs**: `https://medimonitor-app.vercel.app`, `http://localhost:3000`

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
- Production: https://medimonitor-app.vercel.app
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
