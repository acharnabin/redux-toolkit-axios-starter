# React Router Example

A modern React application built with TypeScript, Redux Toolkit, and React Router, demonstrating best practices in React development.

## Project Structure

```
react-router-example/
├── src/
│   ├── api/            # API integration and services
│   ├── assets/         # Static assets (images, fonts, etc.)
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── layout/         # Layout components
│   ├── pages/          # Page components
│   ├── redux-toolkit/  # Redux store, slices, and reducers
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Public static files
├── index.html          # HTML entry point
└── package.json        # Project dependencies and scripts
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-router-example
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Available Scripts

- `npm run dev` or `yarn dev` - Start development server
- `npm run build` or `yarn build` - Build for production
- `npm run lint` or `yarn lint` - Run ESLint
- `npm run preview` or `yarn preview` - Preview production build

## Dependencies

### Main Dependencies
- React (^19.1.0)
- React DOM (^19.1.0)
- React Router (^7.6.0)
- Redux Toolkit (^2.8.2)
- React Redux (^9.2.0)
- Redux Persist (^6.0.0)
- Axios (^1.9.0)

### Development Dependencies
- TypeScript (~5.8.3)
- Vite (^6.3.5)
- ESLint (^9.25.0)
- Various TypeScript and React type definitions
- React development plugins

## Features

- TypeScript support
- Redux state management with Redux Toolkit
- React Router for navigation
- Axios for API requests
- Redux Persist for state persistence
- ESLint for code linting
- Vite for fast development and building

## Development

The project uses Vite as the build tool, which provides:
- Fast hot module replacement (HMR)
- Optimized production builds
- TypeScript support out of the box
- ESLint integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
