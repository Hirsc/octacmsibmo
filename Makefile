.PHONY: help install start build lint fmt test test-unit test-e2e clean ios android sync

# Default target
help:
	@echo "OCTACMSIBMO Development Commands"
	@echo ""
	@echo "Setup & Installation:"
	@echo "  make install     - Install dependencies"
	@echo ""
	@echo "Development:"
	@echo "  make start       - Start development server with hot reload"
	@echo "  make build       - Build for production"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint        - Run ESLint and Prettier checks"
	@echo "  make fmt         - Format code and fix linting issues"
	@echo ""
	@echo "Testing:"
	@echo "  make test        - Run all tests"
	@echo "  make test-unit   - Run unit tests only"
	@echo "  make test-e2e    - Run end-to-end tests"
	@echo ""
	@echo "Mobile Development:"
	@echo "  make ios         - Open iOS project in Xcode"
	@echo "  make android     - Open Android project in Android Studio"
	@echo "  make sync        - Sync web build to native platforms"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean       - Clean build artifacts and dependencies"

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install

# Start development server
start:
	@echo "🚀 Starting development server..."
	npm start

# Build for production
build:
	@echo "🔨 Building for production..."
	npm run build

# Run linting
lint:
	@echo "🔍 Running ESLint and Prettier checks..."
	npm run lint

# Format code
fmt:
	@echo "✨ Formatting code..."
	npm run fmt

# Run all tests
test: test-unit test-e2e
	@echo "✅ All tests completed"

# Run unit tests
test-unit:
	@echo "🧪 Running unit tests..."
	npm run test.unit

# Run end-to-end tests
test-e2e:
	@echo "🧪 Running end-to-end tests..."
	npm run test.e2e

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist/
	rm -rf www/build/
	@echo "✨ Clean completed"

# Sync web build to Capacitor platforms
sync: build
	@echo "📱 Syncing build to native platforms..."
	npx cap sync ios
	npx cap sync android

# Open iOS project
ios: sync
	@echo "🍎 Opening iOS project in Xcode..."
	npx cap open ios

# Open Android project
android: sync
	@echo "🤖 Opening Android project in Android Studio..."
	npx cap open android

# Quick development workflow
dev: install start

# Production workflow
prod: lint fmt build test
	@echo "🎉 Production build completed successfully!"

# Watch mode for development
watch:
	@echo "👀 Starting watch mode..."
	npm start -- --watch

# Update dependencies
update:
	@echo "📦 Updating dependencies..."
	npm update
	@echo "✨ Dependencies updated. Run 'make install' if needed."

# Check for outdated packages
outdated:
	@echo "📋 Checking for outdated packages..."
	npm outdated
