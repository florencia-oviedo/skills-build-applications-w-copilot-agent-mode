# OctoFit Tracker - Multi-Tier Application

A modern, full-stack fitness tracking application built with React 19, Express.js, TypeScript, and MongoDB.

## 📋 Project Overview

OctoFit Tracker is a comprehensive fitness tracking application featuring:
- **Modern Frontend**: React 19 with Vite for fast development and optimized builds
- **Robust Backend**: Express.js with TypeScript for type-safe API development
- **Data Persistence**: MongoDB with Mongoose ODM for reliable data management

## 🏗️ Architecture

```
octofit-tracker/
├── frontend/                 # React 19 + Vite frontend
│   ├── src/                 # Source code
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
│
├── backend/                 # Express + TypeScript backend
│   ├── src/
│   │   └── index.ts         # Main server entry point
│   ├── package.json         # Backend dependencies
│   ├── tsconfig.json        # TypeScript configuration
│   └── .env                 # Environment variables
│
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** running locally (port 27017) or accessible via connection string

### Setup Instructions

#### 1. Frontend Setup

```bash
cd octofit-tracker/frontend
npm install  # Dependencies already installed by create-vite
npm run dev
```

Frontend will be available at: **http://localhost:5173**

#### 2. Backend Setup

```bash
cd octofit-tracker/backend
npm install  # Install dependencies
npm run dev
```

Backend will be available at: **http://localhost:8000**

#### 3. MongoDB Setup

Ensure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or update MONGO_URI in backend/.env for remote MongoDB
```

## 📦 Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI Framework |
| Vite | 8.x | Build tool & Dev server |
| Node.js | 18+ | Runtime |

**Port**: 5173

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Express.js | 4.18.x | Web framework |
| TypeScript | 5.x | Type-safe JavaScript |
| Mongoose | 8.x | MongoDB ODM |
| Node.js | 18+ | Runtime |

**Port**: 8000

### Database
| Technology | Version | Purpose |
|---|---|---|
| MongoDB | Latest | NoSQL Database |

**Port**: 27017 (default)

## 🔌 API Endpoints

### Health Check
```
GET /api/health
```

Returns application health status and timestamp.

### Root Endpoint
```
GET /
```

Returns API information and available endpoints.

## 🛠️ Development

### Available Scripts

#### Frontend
```bash
npm run dev      # Start development server with HMR
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint (if configured)
```

#### Backend
```bash
npm run dev      # Start dev server with ts-node (auto-reload)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
npm run lint     # Run ESLint
```

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/octofit-tracker
NODE_ENV=development
```

## 📁 Project Structure Details

### Frontend (`frontend/`)
- React components and pages in `src/`
- Hot Module Replacement (HMR) for instant updates during development
- Optimized production builds with code splitting

### Backend (`backend/`)
- Express routes and middleware in `src/`
- TypeScript for type safety and better developer experience
- Mongoose models for MongoDB schema management
- Automatic recompilation during development with ts-node

## 🚨 Troubleshooting

### Port Already in Use
- **Frontend (5173)**: Vite will auto-increment to next available port
- **Backend (8000)**: Update `PORT` in `backend/.env`
- **MongoDB (27017)**: Update `MONGO_URI` in `backend/.env`

### MongoDB Connection Refused
- Ensure MongoDB service is running
- Check connection string in `backend/.env`
- Verify MongoDB is accessible at specified host/port

### Dependencies Installation Issues
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Compilation Errors
```bash
# In backend directory
npm run build  # Check for TypeScript errors
```

## 📝 Next Steps

- [ ] Implement authentication system
- [ ] Create data models and schemas
- [ ] Build API endpoints for fitness tracking
- [ ] Develop frontend components and pages
- [ ] Set up automated testing
- [ ] Configure deployment pipeline

## 📄 License

MIT

## 👥 Contributing

Guidelines for contributing to this project will be added soon.

---

**Happy Coding! 🎉**
