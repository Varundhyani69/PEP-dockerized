# Deadline Slayer - Docker Setup Guide

## Overview
This application is containerized into two separate services:
- **Backend**: Node.js/Express API server
- **Frontend**: React SPA built with Vite, served via Node.js `serve` package

## Prerequisites
- Docker installed and running
- Docker Compose (optional, for local development)

## Directory Structure
```
.
├── backend/
│   ├── Dockerfile         # Backend container image
│   ├── .dockerignore      # Build context exclusions
│   ├── server.js
│   ├── package.json
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
├── frontend/
│   ├── Dockerfile         # Frontend container image
│   ├── .dockerignore      # Build context exclusions
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   └── ...
├── docker-compose.yml     # Local development orchestration
└── DOCKER_SETUP.md        # This file
```

## Building Docker Images

### Backend Image
```bash
cd backend
docker build -t deadline-slayer-backend:latest .
```

### Frontend Image
```bash
cd frontend
docker build -t deadline-slayer-frontend:latest .
```

## Running Containers Individually

### Backend Container
```bash
docker run -d \
  --name deadline-slayer-backend \
  -p 5000:5000 \
  -e MONGO_URI=mongodb://your-mongo-host:27017/deadline-slayer \
  -e CORS_ORIGIN=http://your-frontend-host \
  -e JWT_SECRET=your-secret-key \
  deadline-slayer-backend:latest
```

### Frontend Container
```bash
docker run -d \
  --name deadline-slayer-frontend \
  -p 5173:5173 \
  -e VITE_API_URL=http://your-backend-host:5000 \
  deadline-slayer-frontend:latest
```

## Running with Docker Compose (Local Development)
```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 5173

Access the application at `http://localhost:5173`

## Environment Variables

### Backend
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Server port |
| `MONGO_URI` | - | MongoDB connection string (required) |
| `CORS_ORIGIN` | http://localhost:5173 | Allowed CORS origin |
| `JWT_SECRET` | - | JWT signing secret (required) |
| `NODE_ENV` | development | Environment (development/production) |

### Frontend
| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | http://localhost:5000 | Backend API URL |

## Production Deployment

### Building for Production
```bash
docker build -t deadline-slayer-backend:v1.0.0 ./backend
docker build -t deadline-slayer-frontend:v1.0.0 ./frontend
```

### Container Registry
Push to your container registry:
```bash
docker push your-registry/deadline-slayer-backend:v1.0.0
docker push your-registry/deadline-slayer-frontend:v1.0.0
```

## Image Details

### Backend Image
- **Base Image**: `node:20-alpine` (production), multi-stage build
- **Size**: ~150-200MB
- **Port**: 5000
- **Entrypoint**: `node server.js`
- **Health Check**: Enabled

### Frontend Image
- **Base Image**: `node:20-alpine` (production), multi-stage build
- **Size**: ~150-200MB
- **Port**: 5173
- **Server**: Node.js `serve` package
- **Features**:
  - SPA routing supported
  - Static asset caching optimized
  - Health check enabled

## Troubleshooting

### Backend not connecting to MongoDB
- Ensure `MONGO_URI` environment variable is set correctly
- Check MongoDB service is accessible
- Verify network connectivity between containers

### Frontend showing blank page
- Check browser console for API errors
- Verify `VITE_API_URL` matches backend URL
- Ensure CORS is properly configured on backend

### Port conflicts
- Change port mappings in docker-compose.yml or runtime commands
- Example: `-p 3000:5000` maps container port 5000 to host port 3000

## Code Changes Made for Containerization

1. **backend/server.js**:
   - Made CORS origin configurable via `CORS_ORIGIN` env variable
   - Made port configurable via `PORT` env variable

2. **Files Created**:
   - `backend/Dockerfile` - Multi-stage build for optimized image
   - `backend/.dockerignore` - Build context optimization
   - `frontend/Dockerfile` - Multi-stage build with Node.js serve
   - `frontend/.dockerignore` - Build context optimization
   - `docker-compose.yml` - Local development setup

## Next Steps

1. **Environment Configuration**: Create `.env` files for different environments
2. **Container Registry**: Push images to Docker Hub, ECR, or Azure Container Registry
3. **Kubernetes**: Use `appmod-generate-k8s-manifest` to generate K8s manifests
4. **CI/CD**: Set up GitHub Actions or other CI/CD to build and push images
