# DevOverflow 🚀

> **Where Developers Overflow with Knowledge** — A premium next-generation developer ecosystem combining Q&A, gamified reputation, and AI-powered code optimization.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-devstack.appwrite.network-blue?style=for-the-badge)](https://devstack.appwrite.network)
[![TypeScript](https://img.shields.io/badge/TypeScript-98%25-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## About

**DevOverflow** is a modern Q&A platform reimagined for the developer community. Say goodbye to outdated forum styles and embrace a next-generation ecosystem where developers can:

- 💬 Ask questions and share knowledge
- 🏆 Build reputation through gamified rewards
- 🤖 Optimize code with AI-powered insights
- 🚀 Collaborate with a vibrant community
- 📊 Track progress on community leaderboards

Built with **Next.js 16**, **React 19**, **TypeScript**, and powered by **Appwrite**, DevOverflow delivers a seamless experience with instant reputation tracking, integrated AI companions, and modern UI components.

---

## ✨ Features

### 🎮 Gamified Developer Reputation
- **XP Points System**: Earn reputation for upvoting and contributing quality answers
- **Developer Levels**: Progress through ranks and unlock achievements
- **Custom Badges**: Unlock badges like "Bug Hunter," "Markdown Master," and more
- **Leaderboards**: Compete and showcase expertise across the community

### 🤖 Integrated AI Code Companion
- **Algorithm Complexity Analysis**: AI evaluates code complexity and calculates Big O notation
- **Bug Detection**: Intelligent spotting of potential issues in submitted code
- **Optimization Suggestions**: Get instant recommendations to convert O(N²) solutions to O(N)
- **Real-time Visualization**: Visual components for algorithm complexity insights

### 💡 Modern Developer Experience
- **Command Palette**: Press `⌘ + K` (Mac) or `Ctrl + K` (Windows/Linux) for lightning-fast navigation
  - Live question search
  - Tag indexing
  - Profile navigation
  - System commands
- **Dark Mode**: Optimized dark theme for extended coding sessions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates**: Cache revalidation for instant content synchronization

### 🔐 Enterprise-Grade Backend
- **Appwrite Integration**: Secure JWT authentication and session management
- **Fast Indexing**: Optimized database queries for lightning-fast searches
- **Scalable Architecture**: Built for growth with low-latency response times
- **Document Management**: Secure storage of questions, answers, and user data

### 📱 Interactive Components
- **Magic Cards**: Smooth animations and interactive UI elements
- **Confetti Effects**: Celebration animations for achievements
- **Markdown Editor**: Full-featured markdown support with live preview
- **Icon System**: Comprehensive icon library from Tabler Icons

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | Next.js 16.1.6 |
| **UI Library** | React 19.2.3 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, PostCSS 4 |
| **State Management** | Zustand 5.0 |
| **Backend** | Appwrite 22.4.1 (Backend: 22.1.2) |
| **UI Components** | Radix UI, shadcn, Tabler Icons |
| **Markdown Editor** | @uiw/react-md-editor 4.1.1 |
| **Animations** | Motion 12.40.0 |
| **Effects** | Canvas Confetti 1.9.4 |
| **Utilities** | Immer 11.1.8, clsx 2.1.1 |
| **Linting** | ESLint 9 |
| **Theme Management** | next-themes 0.4.6 |

### Language Composition
- **TypeScript**: 98%
- **CSS**: 1.8%
- **JavaScript**: 0.2%

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ 
- **npm** or **yarn** or **pnpm**
- **Appwrite Instance** (local or cloud)
- **Environment Variables** (see below)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Rajmishra-2125/DevStack-with-AI.git
cd DevStack-with-AI
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

4. **Set up environment variables**
```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_HOST_URL=your_appwrite_endpoint
APPWRITE_HOST_URL=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── answer/
│   │       └── route.ts          # Answer creation & deletion endpoints
│   ├── components/
│   │   ├── Header.tsx             # Navigation with Command Palette
│   │   ├── HeroSection.tsx         # Landing page hero
│   │   ├── AiPlayground.tsx        # AI code optimization demo
│   │   ├── FaqAccordion.tsx        # FAQ section
│   │   └── ...
│   ├── layout.tsx                 # Root layout with metadata
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles & animations
│   ├── env.ts                     # Environment configuration
│   └── actions.ts                 # Server actions for cache management
├── components/
│   ├── CommandPalette.tsx          # Command palette component
│   ├── ui/
│   │   ├── floating-navbar.tsx     # Floating navigation
│   │   ├── icon-cloud.tsx          # Technology cloud visualization
│   │   ├── magic-card.tsx          # Interactive magic cards
│   │   ├── shimmer-button.tsx      # Shimmer effect button
│   │   ├── particles.tsx           # Particle background
│   │   └── ...
│   └── Toaster.tsx                # Toast notifications
├── models/
│   ├── name.ts                    # Collection & database names
│   └── server/
│       └── config.ts              # Appwrite server configuration
├── store/
│   └── Auth.ts                    # Zustand auth store
└── lib/
    └── utils.ts                   # Utility functions
```

---

## 🔌 API Routes

### Answer Management

#### Create Answer
```
POST /api/answer
Content-Type: application/json

{
  "questionId": "string",
  "answer": "string",
  "authorId": "string"
}
```

**Response (201 Created)**
```json
{
  "id": "string",
  "content": "string",
  "authorId": "string",
  "questionId": "string",
  "$createdAt": "ISO-8601 timestamp"
}
```

**Features:**
- Automatically increments author reputation by +1
- Revalidates question and user caches

#### Delete Answer
```
DELETE /api/answer
Content-Type: application/json

{
  "answerId": "string"
}
```

**Response (200 OK)**
```json
{
  "data": {
    "id": "string"
  }
}
```

**Features:**
- Automatically decrements author reputation by -1
- Revalidates question and user caches

---

## ⚙️ Configuration

### Appwrite Setup

1. **Create Appwrite Project**
   - Project ID for `APPWRITE_PROJECT_ID`
   - Generate API Key for `APPWRITE_API_KEY`

2. **Database Collections**
   - Questions Collection
   - Answers Collection
   - User Preferences (for reputation tracking)

3. **Authentication**
   - Enable Email/Password authentication
   - Configure JWT settings
   - Set up OAuth providers (GitHub, Google)

### Tailwind CSS Customization

The project uses Tailwind CSS 4 with custom theme variables in `globals.css`:

```css
--color-primary: Primary brand color
--color-secondary: Secondary accent
--radius-*: Border radius scales
--animate-*: Custom animation definitions
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect Vercel**
   - Import repository from vercel.com/new
   - Add environment variables in dashboard

3. **Deploy**
```bash
vercel
```

### Deploy to Other Platforms

The project is optimized for any Node.js hosting supporting Next.js:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Render**
- **Self-hosted**

### Environment Variables for Production
Ensure all variables from `.env.local` are set in production environment.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
```bash
git clone https://github.com/YOUR-USERNAME/DevStack-with-AI.git
cd DevStack-with-AI
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Commit your changes**
```bash
git commit -m "Add amazing feature"
```

4. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

5. **Open a Pull Request**

### Development Guidelines
- Write TypeScript (no `any` types)
- Follow existing code style
- Test your changes locally
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

### Getting Help

- 📖 [Live Demo](https://devstack.appwrite.network)
- 🐛 [Report Issues](https://github.com/Rajmishra-2125/DevStack-with-AI/issues)
- 💬 [GitHub Discussions](https://github.com/Rajmishra-2125/DevStack-with-AI/discussions)

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

## 🙌 Acknowledgments

- **Next.js** for the amazing framework
- **Appwrite** for the backend infrastructure
- **React** and **TypeScript** communities
- **Tabler Icons** for beautiful icons
- **shadcn/ui** and **Radix UI** for component libraries

---

## 📊 Project Statistics

- **Language**: TypeScript (98%)
- **Repository Created**: February 24, 2026
- **Last Updated**: May 30, 2026
- **Stars**: ⭐ (Come star us!)
- **Type**: Public

---

<div align="center">

**[🚀 Try DevOverflow Now](https://devstack.appwrite.network)** | **[⭐ Star on GitHub](https://github.com/Rajmishra-2125/DevStack-with-AI)** | **[📧 Contact](mailto:your-email@example.com)**

Made with ❤️ by **Raj Mishra** | Contributions welcome! 🎉

</div>
