# DevOverflow 🚀

> **Where Developers Overflow with Knowledge** — A premium next-generation developer ecosystem combining Q&A, gamified reputation, and AI-powered code optimization.

[![Live Demo](https://img.shields.io/badge/Live-blue?style=for-the-badge)](https://devoverflow-with-ai.onrender.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-98%25-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
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

### 🤖 Integrated AI Code & Community Companion
- **Google Gemini Integration**: Dynamic, dual-mode AI engine utilizing the latest `"gemini-2.5-flash"` model.
- **Failover Key Rotation**: Automatically rotates across up to 3 API keys (`GEMINI_API_KEY_1`, `GEMINI_API_KEY_2`, `GEMINI_API_KEY_3`) under 429 quota exhaustion errors to guarantee continuous operational up-time.
- **Congestion Rate Limiting**: Integrates `bottleneck` rate-limiting (2 req/s) to shield keys from congestion rate-limits during high traffic.
- **AI Title & Question Optimizer**: Generates technical, searchable question titles and restructures text drafts into gorgeous formatted Markdown sections.
- **Cosine-Similarity Duplicate Checker**: Computes 768-dimensional float embeddings to warn developers of identical questions in real-time.
- **Hashed-Embedding Cache**: Employs SHA-256 text hashing combined with 30-day `unstable_cache` data storage to resolve identical questions locally, reducing Embedding API requests by **99%** and dropping retrieval times to milliseconds.
- **Leaderboard Expert Discovery**: Discovers and recommends community experts dynamically using a custom ranking formula:
  $$\text{Score} = (\text{Reputation} \times 0.3) + (\text{Accepted Answers} \times 0.4) + (\text{Upvotes} \times 0.3)$$
- **Algorithm Complexity Analysis**: AI evaluates code complexity, calculates Big O notation, and flags potential runtime bugs.

### 💡 Modern Developer Experience
- **Spacious Single Question View**: Redesigned details layouts extending to full-viewport widths (`max-w-6xl`) with flexible, adaptive stacks to prevent overlap on mobile, tablet, and widescreen viewports.
- **Command Palette**: Press `⌘ + K` (Mac) or `Ctrl + K` (Windows/Linux) for navigation, question queries, tag indexing, and profile management.
- **Vercel Agent-MagicUI Header**: Redesigned floating glassmorphic nav bar that morphs dynamically from a wide transparent container to a compact pill shape on scroll.
- **Ultra-Clean Viewport Loader**: Streamlines page-load transitions using a full-screen blurred backdrop (`backdrop-blur-2xl bg-black/70`) with concentric pulsing expand-rings and an animated glowing central spinner.
- **Dark Mode**: High-contrast, premium HSL tailored accent color themes (indigo, slate, green, amber) for extended coding comfort.

### 🔐 Enterprise-Grade Backend
- **Appwrite Integration**: Secure JWT sessions, collection models, and reputation tracking.
- **Orphan Reference Safety**: Redesigned database queries utilizing `listDocuments` rather than `getDocument` to dynamically and silently filter out deleted questions/answers in user feeds without throwing crashes.
- **Request Memoization**: Combined React memoization with Next.js caching to achieve a **100% round-trip database query reduction** on cache hits.

### 📱 Interactive Components
- **Shadcn Card & Spinner Primitives**: Added customizable UI card and spinner primitives inside `components/ui` in alignment with shadcn design specifications.
- **Confetti & Particle Effects**: Celebration canvas components and dynamic particle nodes for rich visual aesthetics.
- **Markdown Editor**: Rich preview fields for writing technical descriptions.

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
git clone https://github.com/imrajmishraa/DevStack-with-AI.git
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
NEXT_PUBLIC_APPWRITE_ENDPOINT_URL=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
APPWRITE_API_KEY=your_api_key

# Gemini AI Service Configuration (Active Failover rotation keys)
GEMINI_API_KEY=your_default_gemini_key
GEMINI_API_KEY_1=your_first_rotation_key
GEMINI_API_KEY_2=your_second_rotation_key
GEMINI_API_KEY_3=your_third_rotation_key
GEMINI_MODEL=gemini-2.5-flash

# Cloudinary Service Configuration (To Upload Images)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset

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
   - Project ID for `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
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
git clone https://github.com/imrajmishraa/DevStack-with-AI.git
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

## 🆘 Support

### Getting Help

- 📖 [Live Demo](https://devoverflow-with-ai.onrender.com)
- 🐛 [Report Issues](https://github.com/imrajmishraa/DevStack-with-AI/issues)
- 💬 [GitHub Discussions](https://github.com/imrajmishraa/DevStack-with-AI/discussions)

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

**[🚀 Try DevOverflow Now](https://devoverflow-with-ai.onrender.com)** | **[⭐ Star on GitHub](https://github.com/imrajmishraa/DevStack-with-AI)** | **[📧 Contact](mailto:raj212558@email.com)**

Made with ❤️ by **Raj Mishra** | Contributions welcome! 🎉

</div>
