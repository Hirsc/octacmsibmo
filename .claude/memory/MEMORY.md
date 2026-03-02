# Project Memory - OCTACMSIBMO

## Project Overview
- Personal calories tracking mobile app built with Ionic, Capacitor, and Stencil
- Alternative to paid calorie tracking apps
- Platform: iOS/Android via Capacitor 3.4

## Key Technical Details
- **Build System**: Stencil 2.14 with TypeScript 4.5
- **UI Framework**: Ionic 6 components
- **State Management**: @stencil/store
- **Storage**: @capacitor/storage (local persistence)
- **External APIs**: Open Food Facts for food database

## Important Commands
- Development: `npm start` (watch + serve)
- Build: `npm run build`
- Lint: `npm run lint` (required before commits via Husky)
- Format: `npm run fmt` (auto-fix linting issues)
- Test: `npm run test.unit` (Jest), `npm run test.e2e` (Stencil E2E)

## Code Quality Standards
- ESLint: @ionic/eslint-config/recommended
- Prettier: @ionic/prettier-config
- Pre-commit hooks enforce linting via Husky
- Always format code before committing

## Architecture Patterns
- Component-based architecture with Stencil
- Services layer for business logic
- Utilities for common functions (date/time, formatting)
- Entities for data models

## Development Context
- Private personal project
- Focus on simplicity and core functionality
- Mobile-first design approach
- Uses barcode scanning and OCR for food entry
