# OctoFit Tracker Frontend

A modern React 19 frontend for the OctoFit Tracker application built with Vite.

## Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: React 19
- **Build Tool**: Vite 8.x
- **Language**: JavaScript/JSX with TypeScript support
- **Port**: 5173

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

Dependencies are already installed. To reinstall:
```bash
npm install
```

## Running the Application

### Development Mode (with Hot Module Replacement)
```bash
npm run dev
```

The application will start at `http://localhost:5173/` with automatic hot reloading.

### Build
```bash
npm run build
```

Compiles the production-ready build to the `dist/` directory.

### Preview Build
```bash
npm run preview
```

Previews the production build locally.

## Project Structure

```
frontend/
├── public/                # Static assets
├── src/
│   ├── App.jsx           # Main App component
│   ├── App.css           # App styles
│   ├── main.jsx          # Application entry point
│   ├── index.css         # Global styles
│   ├── components/       # Reusable components (to be added)
│   ├── pages/            # Page components (to be added)
│   └── utils/            # Utility functions (to be added)
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Project dependencies and scripts
└── README.md            # This file
```

## API Integration

The frontend will connect to the backend API running on `http://localhost:8000`.

Update the API base URL in your environment or configuration:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

## Development

### File Structure
- Components should be placed in `src/components/`
- Pages should be placed in `src/pages/`
- Styles can be co-located with components or in `src/styles/`

### Adding Dependencies
```bash
npm install package-name
```

### Formatting & Linting
Install ESLint and Prettier as dev dependencies for code consistency:
```bash
npm install -D eslint prettier
```

## Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory, ready for deployment.

## Environment Variables

Create a `.env` file for environment-specific variables:
```
VITE_API_URL=http://localhost:8000
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Troubleshooting

- **Port 5173 already in use**: Vite will automatically use the next available port
- **Hot reload not working**: Ensure `npm run dev` is running and refresh the browser
- **Build errors**: Clear `node_modules` and `dist`, then run `npm install` and `npm run build`

## License

MIT
