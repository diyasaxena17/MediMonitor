<div align="center">

# MediMonitor 💊

### Accessibility-First Medication Adherence Platform

A healthcare web application that bridges the gap between patients and caregivers through real-time medication tracking, voice reminders, and secure authentication.

**[Live Demo ↗](https://diyasaxena17-medimonitor-app.vercel.app/)** | **[View Source](https://github.com/diyasaxena17/MediMonitor)** | **[Devpost Article](https://devpost.com/software/medimonitor?ref_content=my-projects-tab&ref_feature=my_projects)**

---

</div>

## 🎯 Overview

MediMonitor is a full-stack medication adherence platform designed with accessibility at its core. Built for healthcare environments, it enables patients to log medications with one tap while providing caregivers real-time visibility into adherence patterns—all through a WCAG-compliant, high-contrast interface with text-to-speech support.


**Key Achievement**: Developed as a hackathon project (DeltaHacks 12) and deployed to production with Auth0 authentication, analytics, and protected routes in under 48 hours.


### AI Technologies Utilized
- **GitHub Copilot**: Code generation, auto-completion, and refactoring suggestions
- **GPT-4/Claude**: Complex problem-solving, architecture decisions, and debugging
- **AI-Driven Workflow**: Iterative prompt engineering for optimal code quality

### Demonstrated Skills
✅ **Effective Prompt Engineering**: Crafted precise prompts to generate production-ready TypeScript/React code  
✅ **AI-Augmented Architecture**: Leveraged LLMs for Auth0 setup, route protection, and state management  
✅ **Rapid Prototyping**: Used AI to accelerate development from concept to deployed product in <48 hours  
✅ **Code Quality**: AI-assisted refactoring for accessibility compliance and TypeScript best practices  


## ✨ Key Features

### Patient Experience
- **One-Tap Logging**: Instantly record medication as "taken" or "missed" with large, accessible buttons
- **Voice Feedback**: Browser-based text-to-speech confirms actions and provides gentle reminders
- **High-Contrast UI**: WCAG 2.1 AA compliant design optimized for visual accessibility
- **Instant Confirmation**: Audio and visual feedback for every action

### Caregiver Dashboard
- **Real-Time Monitoring**: Protected dashboard shows adherence patterns with timestamps
- **Calendar View**: Month-by-month calendar showing taken/missed days at a glance
- **Visual Analytics**: Summary statistics and chronological event log with status indicators
- **Secure Access**: Auth0 authentication for protected access control

### Technical Highlights
- **Modern Stack**: Next.js 16 App Router, TypeScript, Tailwind CSS v4
- **Authentication**: Auth0 with proxy-based middleware and session management
- **Analytics**: Vercel Analytics for usage insights and performance monitoring
- **Fully Responsive**: Mobile-first design that scales to desktop
- **Production-Ready**: Deployed on Vercel with edge functions and CDN

## 🚀 Local Development

### Prerequisites

- Node.js 20+ and npm
- Auth0 account (free tier works)

### Setup

```bash
# Clone the repository
git clone https://github.com/diyasaxena17/MediMonitor.git
cd MediMonitor

# Install dependencies
npm install

# Create environment variables file
cp .env.local.example .env.local  # then fill in your Auth0 values

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

Create a `.env.local` file from the example:

```env
AUTH0_DOMAIN=your-tenant.auth0.com
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_SECRET=run-openssl-rand-hex-32-to-generate
```

**Auth0 Setup**:
1. Create a **Regular Web Application** in the [Auth0 Dashboard](https://manage.auth0.com)
2. Copy the Domain, Client ID, and Client Secret into `.env.local`
3. Add to **Allowed Callback URLs**: `http://localhost:3000/auth/callback`
4. Add to **Allowed Logout URLs**: `http://localhost:3000`

## 📱 Pages

### Landing Page (`/`)
- Professional sign-in hero with product branding
- Auth0 authentication (sign in / sign up)
- Quick access to tracker and caregiver dashboard
- Feature highlights and value proposition

### Tracker Page (`/track`)
- Large, high-contrast medication reminder
- One-tap "I took my medication" and "I did not take it" buttons
- Automatic text-to-speech announcements
- Visual and audio confirmation on logging
- Link to caregiver dashboard

### Caregiver Dashboard (`/caregiver`)
- Protected route (requires sign-in)
- Summary statistics (taken vs. missed medications)
- Monthly calendar view of adherence
- Chronological log of all medication events with timestamps
- Reset and sign-out controls

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Authentication** | Auth0 (`@auth0/nextjs-auth0` v4) |
| **State Management** | React Context API, localStorage |
| **Analytics** | Vercel Analytics |
| **Deployment** | Vercel (Edge Functions, CDN) |
| **Accessibility** | ARIA labels, semantic HTML, keyboard navigation, TTS |


## 📦 Project Structure

```
MediMonitor/
├── app/
│   ├── caregiver/
│   │   └── page.tsx             # Protected dashboard (auth required)
│   ├── track/
│   │   └── page.tsx             # Medication tracker UI
│   ├── login/
│   │   └── page.tsx             # Standalone login page
│   ├── MedicationContext.tsx    # Global state management
│   ├── Providers.tsx            # Medication context provider
│   ├── types.ts                 # TypeScript interfaces
│   ├── layout.tsx               # Root layout + analytics
│   ├── page.tsx                 # Landing/sign-in page
│   └── globals.css              # Tailwind + custom styles
├── lib/
│   └── auth0.ts                 # Auth0Client instance
├── public/                      # Static assets
├── proxy.ts                     # Next.js 16 auth middleware
├── .env.local.example           # Environment variable template
├── package.json                 # Dependencies + scripts
├── tsconfig.json                # TypeScript config
├── next.config.ts               # Next.js configuration
└── DEPLOYMENT.md                # Deployment guide
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```


## 🎯 Use Cases & Impact

**Healthcare Settings**
- **Primary Care**: Track medication compliance between appointments
- **Elderly Care**: Large buttons and voice prompts aid memory and dexterity
- **Clinical Trials**: Precise timestamped logs support research protocols
- **Home Health**: Remote caregiver monitoring reduces in-person check-ins

**Target Users**
- Patients managing chronic conditions with multiple medications
- Family caregivers monitoring loved ones remotely
- Healthcare providers seeking compliance data
- Clinical researchers tracking adherence in studies

## 💡 Development Highlights

**Technical Challenges Solved**:
- Implemented protected routes with Auth0 session management via `proxy.ts`
- Built accessible UI meeting WCAG 2.1 AA standards (contrast ratios, keyboard nav)
- Designed real-time state synchronization between patient and caregiver views
- Integrated browser TTS API for cross-platform voice feedback
- Optimized for Edge deployment with sub-100ms API responses

**Development Methodology**:
- **AI-First Approach**: Leveraged LLMs for rapid iteration and code quality
- **Iterative Prompt Refinement**: Engineered prompts for optimal TypeScript/React patterns
- **Human-AI Collaboration**: Combined AI efficiency with strategic decision-making

**Future Enhancements**:
- Push notifications for scheduled medication times
- Multi-medication support with custom schedules
- Export adherence reports (PDF/CSV)
- Integration with pharmacy APIs
- Multi-language TTS support

## ♿ Accessibility Features

- High contrast dark color scheme
- Large text (6xl-8xl for headings, 4xl-5xl for buttons)
- ARIA labels and roles for screen readers
- Browser text-to-speech integration
- Keyboard navigation support
- Responsive touch targets (minimum 44x44px)

## 🔐 Security & Privacy

- **Auth0**: Industry-standard authentication and identity management
- **Session Management**: Secure encrypted session cookies via Auth0 SDK
- **No PHI Storage**: Medication logs stored locally (browser localStorage)
- **HTTPS Only**: All production traffic encrypted in transit
- **Protected Routes**: Auth0 middleware guards the caregiver dashboard
- **No Third-Party Tracking**: Analytics limited to Vercel's privacy-first solution

**Note**: This is a demonstration application. For production healthcare use, implement:
- HIPAA-compliant backend with encrypted database
- Audit logging for all access and modifications
- Two-factor authentication
- Data retention policies

## 📝 License

MIT License - see [LICENSE](LICENSE) for details.


**Skills Showcased**:
- ✅ Modern AI tool proficiency (GitHub Copilot, GPT-4, Claude)
- ✅ Effective prompt engineering for production code
- ✅ Full-stack TypeScript/Next.js development
- ✅ Auth0 implementation and security best practices
- ✅ WCAG accessibility compliance
- ✅ Rapid prototyping and deployment (0→production in 48hrs)

---

<div align="center">

**Built with ❤️ for accessible healthcare**

[Live Demo](https://diyasaxena17-medimonitor-app.vercel.app/) • [Report Bug](https://github.com/diyasaxena17/MediMonitor/issues) • [Request Feature](https://github.com/diyasaxena17/MediMonitor/issues)

</div>

## 👥 Team

Created for DeltaHacks 12

---

**Note**: This is a prototype application designed for hackathons and demonstrations. For production medical applications, please implement proper authentication, database storage, and comply with healthcare regulations (HIPAA, etc.).
