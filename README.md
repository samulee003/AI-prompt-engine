# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Features

- ✅ **ESLint + TypeScript** - Modern linting with automatic fixes
- ✅ **Prettier** - Consistent code formatting
- ✅ **Vitest + Testing Library** - Comprehensive testing framework
- ✅ **Husky + lint-staged** - Pre-commit quality checks

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Development

- `npm run lint` - Check code quality
- `npm run format` - Format code
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
