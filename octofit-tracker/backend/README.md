# OctoFit Tracker Backend

A modern backend service for the OctoFit Tracker application built with Express.js, TypeScript, and MongoDB using Mongoose.

## Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 4.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB with Mongoose ODM
- **Port**: 8000

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB running locally or accessible via connection string

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

This uses `ts-node` to run TypeScript directly without compilation.

### Build
```bash
npm run build
```

This compiles TypeScript to JavaScript in the `dist/` directory.

### Production Mode
```bash
npm start
```

Runs the compiled JavaScript from the `dist/` directory.

## Project Structure

```
backend/
├── src/
│   ├── index.ts           # Main application entry point
│   ├── models/            # Mongoose data models (to be added)
│   ├── routes/            # API route handlers (to be added)
│   ├── middleware/        # Express middleware (to be added)
│   └── utils/             # Utility functions (to be added)
├── dist/                  # Compiled JavaScript output
├── .env                   # Environment variables (gitignored)
├── .env.example           # Environment variables template
├── tsconfig.json          # TypeScript configuration
├── package.json           # Project dependencies and scripts
└── README.md             # This file
```

## API Endpoints

### Health Check
```
GET /api/health
```

Returns:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "OctoFit Tracker Backend is running"
}
```

### Root Endpoint
```
GET /
```

Returns API information and available endpoints.

## MongoDB Connection

The application automatically connects to MongoDB using the `MONGO_URI` from environment variables. Ensure MongoDB is running or accessible at the specified connection string before starting the server.

## Development

### Code Quality
```bash
npm run lint
```

Runs ESLint to check code quality and style.

## Troubleshooting

- **Port already in use**: Change the PORT in `.env` file
- **MongoDB connection refused**: Ensure MongoDB service is running on localhost:27017
- **Module not found errors**: Run `npm install` to ensure all dependencies are installed

## License

MIT
