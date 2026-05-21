# Deadline Slayer

## Overview
Deadline Slayer is a two-service web application with:
- **Backend**: Node.js + Express API server
- **Frontend**: React + Vite single-page app
- **Database**: MongoDB used by the backend

## Architecture
- **Frontend** builds a production SPA and serves static assets using the Node.js `serve` package inside Docker.
- **Backend** runs an Express API on port `5000` and connects to MongoDB via `MONGO_URI`.
- **Frontend** consumes the backend via `VITE_API_URL`.
- Both services can run together using Docker Compose or separate Docker containers on a shared network.

## Run Locally
### Option 1: Docker Compose (recommended)
```bash
cd "D:/My Projects/Deadline Slayer"
docker-compose up -d
```
Then open:
```text
http://localhost:5173
```

### Option 2: Manual Docker commands
#### Build images
```bash
docker build -t deadline-slayer-backend:latest ./backend
docker build -t deadline-slayer-frontend:latest ./frontend
```

#### Create network
```bash
docker network create deadline-slayer-network
```

#### Run backend
```bash
docker run -d \
  --name deadline-slayer-backend \
  --network deadline-slayer-network \
  -p 5000:5000 \
  -e MONGO_URI=mongodb://host.docker.internal:27017/deadline-slayer \
  -e CORS_ORIGIN=http://localhost:5173 \
  -e JWT_SECRET=your-secret-key \
  deadline-slayer-backend:latest
```

#### Run frontend
```bash
docker run -d \
  --name deadline-slayer-frontend \
  --network deadline-slayer-network \
  -p 5173:5173 \
  -e VITE_API_URL=http://localhost:5000 \
  deadline-slayer-frontend:latest
```

## Docker Commands Used
- Build backend image: `docker build -t deadline-slayer-backend:latest ./backend`
- Build frontend image: `docker build -t deadline-slayer-frontend:latest ./frontend`
- Create network: `docker network create deadline-slayer-network`
- Run backend container: see backend run command above
- Run frontend container: see frontend run command above
- Stop containers:
  ```bash
docker stop deadline-slayer-backend deadline-slayer-frontend
  ```
- Remove containers:
  ```bash
docker rm deadline-slayer-backend deadline-slayer-frontend
  ```

## Deployment Link
> Deployment link is not yet available. Update this section once the application is deployed.

## Application URLs
- Frontend (local): `http://localhost:5173`
- Backend API (local): `http://localhost:5000`

## Notes
- The backend expects `MONGO_URI` and `JWT_SECRET` at runtime.
- The frontend uses `VITE_API_URL` to connect to the backend.
- For local development, `docker-compose up -d` starts MongoDB, backend, and frontend together.
