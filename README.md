# DevBoard

A minimal Kanban board built for developers. Organize tasks, track progress, and stay focused on what matters.

**[Live App](https://devboard-io.netlify.app)**

---

## Features

- **Kanban Board** — Four columns: Backlog, In Progress, Review, Done
- **Task Management** — Create, edit and delete tasks with title, description, priority and due date
- **Drag & Drop** — Move tasks between columns intuitively
- **Authentication** — Register and login with Firebase Auth
- **Persistent Data** — Tasks stored per user in Firestore

## Tech Stack

| Area | Tech |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Forms & Validation | React Hook Form + Zod |
| Backend & Auth | Firebase (Auth + Firestore) |
| Testing | Vitest + React Testing Library |
| Deployment | Netlify |

## Getting Started

### Prerequisites
- Node.js 18+
- A Firebase project with Auth and Firestore enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/xhokcu/devboard.git
cd devboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Firebase config values in .env

# Start the dev server
npm run dev
```

### Environment Variables

Create a `.env` file in the root with the following:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run test      # Run tests
npm run lint      # Lint code
npm run format    # Format code with Prettier
```

## Project Structure

```
src/
├── assets/          # Static assets (logo, icons)
├── components/      # Reusable UI components
├── features/
│   ├── auth/        # Login, register, auth forms
│   ├── board/       # Board page, columns, task cards, modal
│   └── landing/     # Landing page, hero, features, footer
├── hooks/           # Custom React hooks
├── lib/             # Firebase setup
├── router/          # Route definitions and route guards
├── store/           # Zustand stores (auth, tasks)
├── tests/           # Test setup and test files
├── types/           # Shared TypeScript types
└── utils/           # Helper functions
```

## License

MIT
