# MediMonitor 💊

An accessibility-first medication adherence tracking application built for healthcare hackathons. MediMonitor helps patients remember to take their medications and enables caregivers to monitor adherence patterns.

## ✨ Features

- **Accessibility-First Design**: Large, high-contrast UI optimized for visibility
- **Text-to-Speech Integration**: Browser-based voice reminders and feedback
- **Simple Medication Logging**: One-click button to log medication intake
- **Caregiver Dashboard**: Monitor taken/missed medications with timestamps
- **No Authentication Required**: Quick setup with localStorage-based state
- **Fully Responsive**: Works on all devices and screen sizes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/diyasaxena17/MediMonitor.git
cd MediMonitor

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Pages

### Home Page (`/`)
- Large, high-contrast message: "Time to take your medication"
- Prominent button: "I took my medication"
- Automatic text-to-speech announcement
- Visual and audio confirmation on button click

### Caregiver Dashboard (`/caregiver`)
- Summary statistics (taken vs. missed medications)
- Chronological log of all medication events
- Visual status indicators with timestamps
- Easy navigation back to home page

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context + localStorage
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Deployment**: Vercel-ready

## 📦 Project Structure

```
MediMonitor/
├── app/
│   ├── caregiver/
│   │   └── page.tsx          # Caregiver dashboard
│   ├── MedicationContext.tsx # State management
│   ├── types.ts              # TypeScript interfaces
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── public/                   # Static assets
├── package.json
└── README.md
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click - no configuration needed!

Alternatively, you can deploy using the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## 🎯 Use Cases

- **Patients**: Simple reminders and logging for daily medications
- **Caregivers**: Monitor medication adherence for family members
- **Healthcare Providers**: Track patient compliance patterns
- **Clinical Trials**: Log medication intake with precise timestamps

## ♿ Accessibility Features

- High contrast black/white color scheme
- Large text (6xl-8xl for headings, 4xl-5xl for buttons)
- ARIA labels and roles for screen readers
- Browser text-to-speech integration
- Keyboard navigation support
- Responsive touch targets (minimum 44x44px)

## 🔐 Privacy & Data

- **No Backend**: All data stored locally in browser
- **No Authentication**: No user accounts or passwords
- **No Analytics**: No tracking or data collection
- **No Database**: Simple localStorage for state persistence

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Hackathon Ready

Built for **DeltaHacks 12** with:
- Clean, readable code
- Professional documentation
- Easy setup and deployment
- Polished UI/UX
- Accessibility compliance

## 🤝 Contributing

Contributions welcome! This is a hackathon project, so feel free to fork and customize for your needs.

## 👥 Team

Created for DeltaHacks 12

---

**Note**: This is a prototype application designed for hackathons and demonstrations. For production medical applications, please implement proper authentication, database storage, and comply with healthcare regulations (HIPAA, etc.).
