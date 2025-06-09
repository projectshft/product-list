# Product List Web App

A modern React web application for browsing and managing products, built with Vite, Redux Toolkit, and Tailwind CSS.

## Features

- **Product Browsing**: View products with pagination support
- **Search Functionality**: Search products with debounced input
- **Category Filtering**: Filter products by category using dropdown
- **Sorting**: Sort products by various criteria
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## Tech Stack

- **React 19** - UI framework
- **Redux Toolkit** - State management
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Flowbite React** - UI components

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/           # Redux store configuration
├── components/    # Reusable UI components
│   └── navbar/    # Navigation components
├── features/      # Feature-based modules
│   └── products/  # Product-related components and logic
└── main.tsx       # Application entry point
```

## Features Overview

### Products
- View paginated product listings
- Search products with real-time filtering
- Filter by categories
- Sort by different criteria (price, name, etc.)

### UI/UX
- Responsive design for all screen sizes
- Dark/light mode toggle
- Clean, modern interface with Tailwind CSS
- Accessible components with Flowbite React

## Development

The app uses absolute imports configured in `vite.config.ts`:
- `@app` - App configuration and store
- `@features` - Feature modules
- `@components` - Reusable components

## API Integration

This web app connects to a backend API for product data. Ensure the API server is running for full functionality.