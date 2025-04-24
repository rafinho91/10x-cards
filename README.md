# 10x-cards

A web application for quickly creating educational flashcards with the help of artificial intelligence.

## Project Description

10x-cards enables users to significantly speed up the process of creating flashcards, encouraging the use of the effective spaced repetition learning method. The application allows:

- AI generation of flashcards from text input
- Manual flashcard creation
- Viewing, editing, and deleting flashcards
- Storing flashcards in user accounts
- Learning with a spaced repetition algorithm

The target audience is anyone interested in learning with flashcards, without limitations to specific knowledge domains. The application will be available in multiple languages, initially only as a browser version.

## Tech Stack

### Frontend
- [Astro 5](https://astro.build/) - For building fast, efficient pages with minimal JavaScript
- [React 19](https://react.dev/) - For interactive components
- [TypeScript 5](https://www.typescriptlang.org/) - For static typing and better IDE support
- [Tailwind 4](https://tailwindcss.com/) - For convenient styling
- [Shadcn/ui](https://ui.shadcn.com/) - For accessible React components

### Backend
- [Supabase](https://supabase.io/) - As a comprehensive backend solution providing:
  - PostgreSQL database
  - SDK in multiple languages (Backend-as-a-Service)
  - Built-in user authentication

### AI
- [Openrouter.ai](https://openrouter.ai/) - For communication with AI models:
  - Access to a wide range of models (OpenAI, Anthropic, Google, and others)
  - Financial limit settings for API keys

### CI/CD & Hosting
- GitHub Actions - For CI/CD pipelines
- DigitalOcean - For application hosting via Docker

## Getting Started Locally

### Prerequisites
- Node.js v22.14.0 (use .nvmrc for version management)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/rafinho91/10x-cards.git
cd 10x-cards
```

2. Install Node.js version using nvm
```bash
nvm use
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env` file based on `.env.example` and add your environment variables
```bash
cp .env.example .env
```

5. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Previews the production build locally
- `npm run astro` - Run Astro CLI commands
- `npm run lint` - Checks for linting errors
- `npm run lint:fix` - Fixes linting errors
- `npm run format` - Formats code using Prettier

## Project Scope

### Core Features
- User registration and authentication
- AI-based flashcard generation from text
- Manual flashcard creation
- Flashcard management (viewing, editing, deleting)
- Learning with spaced repetition algorithm
- Autosave functionality to prevent work loss

### Out of Scope for MVP
- Advanced spaced repetition algorithm (like SuperMemo, Anki)
- Multiple file format imports (PDF, DOCX, etc.)
- Flashcard sharing between users
- Integrations with other educational platforms
- Mobile applications (web-only initially)
- Flashcard decks/sets categorization
- Customization of generated flashcard "style"
- Integrated flashcard translation tools
- Advanced flashcard metadata

## Project Status

This project is currently in early development. The MVP is under active development, with a focus on the core features listed above.

## License

[MIT](https://choosealicense.com/licenses/mit/) 