# Product List Monorepo

A full-stack product management application with a React frontend and Express.js API backend.

## Structure

```
apps/
├── web/         # React + Redux Toolkit frontend
├── api/         # Express.js + MongoDB backend
```

## Quick Start

### Prerequisites

- [Docker Desktop](https://docs.docker.com/get-started/get-docker/)

### Docker Setup

```bash
# Build and start all services
yarn docker:build

# Generate seed data (run after build)
curl http://localhost:3000/generate
```

**Access points:**
- Web app: http://localhost:8080
- API docs: http://localhost:3000/docs

### Development

```bash
# Individual services
yarn docker:web:build && yarn docker:web    # Web only
yarn docker:api:build && yarn docker:api    # API only

# Local development (requires MongoDB)
yarn dev
```

## Tech Stack

**Frontend (web):**

- React 19 + Redux Toolkit
- Vite + TypeScript
- Tailwind CSS + Flowbite React

**Backend (api):**

- Express.js + TypeScript
- MongoDB + Mongoose
- TSOA (auto-generated routes/docs)

## Features

- Product browsing with search, filtering, and pagination
- Product reviews and ratings
- Dark/light mode toggle
- Responsive design
- Auto-generated API documentation

For detailed setup and development information, see the README files in each app directory.
