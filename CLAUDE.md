# OCTACMSIBMO - Calories Tracking App

A mobile calories tracking application built with Ionic, Capacitor, and Stencil. The app helps users track daily calorie intake and macros by scanning food barcodes and manually adding entries.

## Project Overview

- **Purpose**: Personal calories tracking app (alternative to paid solutions)
- **Platform**: Mobile (iOS/Android via Capacitor)
- **UI Framework**: Ionic 6
- **Build Tool**: Stencil 2.14
- **Language**: TypeScript 4.5

## Tech Stack

- **Frontend**: Stencil components with Ionic 6
- **Mobile**: Capacitor 3.4 for iOS/Android
- **State Management**: @stencil/store
- **Routing**: @stencil/router
- **Storage**: @capacitor/storage
- **Utilities**: date-fns, @zxing/library (barcode scanning), tesseract.js (OCR)
- **Testing**: Jest for unit tests, Puppeteer for E2E tests
- **Code Quality**: ESLint (@ionic/eslint-config), Prettier (@ionic/prettier-config), Husky pre-commit hooks

## Project Structure

```
src/
├── components/           # Stencil components
│   ├── app-root/        # Root application component
│   ├── calories-tracker/# Main tracking features
│   ├── toasts/          # Toast notifications
│   ├── date-reader/     # Date input components
│   └── barcode-reader/  # Barcode scanning functionality
├── utils/               # Utility functions (date/time, formatting)
├── services/            # App services
├── entities/            # Data models/entities
├── open-food-facts/     # Open Food Facts API integration
├── global/              # Global styles and configs
└── assets/              # Static assets (icons, images)
```

## Development Workflow

### Build Commands

```bash
npm start              # Development server with watch and hot-reload
npm run build          # Production build
npm run generate       # Generate new components
```

### Code Quality

```bash
npm run lint           # Run ESLint and Prettier checks
npm run fmt            # Auto-fix linting issues and format code
```

### Testing

```bash
npm run test.unit      # Run unit tests with Jest
npm run test.e2e       # Run E2E tests with Stencil
```

### Pre-commit Hooks

Husky is configured to run `npm run lint` before commits. If linting fails, the commit will be blocked.

## Code Conventions

- **Linting**: Follows @ionic/eslint-config/recommended
- **Formatting**: Uses @ionic/prettier-config
- Always run `npm run fmt` before committing to ensure consistent formatting
- Pre-commit hooks enforce linting - fix issues before committing

## Key Features

- **Barcode Scanning**: Scan food barcodes using device camera
- **Manual Entry**: Manually add food items
- **Daily Tracking**: Track calories and macros per day
- **Date Navigation**: View and manage entries for different dates
- **Data Persistence**: Local storage using Capacitor Storage API

## Development Notes

- This is a private project for personal use
- Focus on simplicity and functionality over complex features
- Mobile-first design approach
- Uses Open Food Facts API for food database lookup
