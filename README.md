# AI Academy - Learning Platform

A modern, responsive learning platform built with React, TypeScript, and Tailwind CSS. Features a comprehensive course catalog, interactive quizzes, and progress tracking.

## Features

- 📚 **Course Management** - Browse and enroll in diverse courses
- 🧠 **Interactive Quizzes** - Test your knowledge with comprehensive exams
- 📊 **Progress Tracking** - Monitor your learning progress with detailed analytics
- 🎯 **Learning Paths** - Structured learning tracks for different specializations
- 🌍 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✨ **Modern UI** - Beautiful, accessible user interface with smooth animations

## Technologies

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ai-academy

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run build:dev   # Build in development mode
npm run lint        # Run ESLint
npm run preview     # Preview production build
```

## Project Structure

```
src/
├── components/
│   ├── courses/
│   ├── layout/
│   ├── modals/
│   ├── pages/
│   ├── sections/
│   └── ui/
├── context/
├── data/
├── hooks/
├── lib/
├── pages/
├── App.tsx
└── main.tsx
```

## Key Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type Safety** - Full TypeScript support
- **Component Library** - Pre-built UI components with shadcn/ui
- **Context API** - Efficient state management
- **Demo Data** - Pre-loaded with sample courses and progress

## Deployment

To build for production:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## License

This project is open source and available for portfolio and educational purposes.
