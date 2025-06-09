# Containerization and Google Cloud Run Deployment Plan

## Overview
This plan outlines how to containerize the monorepo project (React frontend + Express.js API + MongoDB) and deploy it to Google Cloud Run.

## Project Analysis
- **Monorepo structure**: Frontend (React + Vite) and Backend (Express.js + TypeScript)
- **Database**: MongoDB with Mongoose
- **Build tools**: Yarn workspaces, TypeScript, Vite
- **Current ports**: API runs on port 3000 (configurable via PORT env var)

## Step-by-Step Implementation Plan

### Phase 1: Prepare for Containerization

#### 1.1 Create Docker Configuration Files
- [x] Create `Dockerfile` in the root directory for multi-stage build
- [x] Create `.dockerignore` file to exclude unnecessary files
- [x] Create `docker-compose.yml` for local development with MongoDB

#### 1.2 Environment Configuration
- [x] Create `.env.example` files for both API and web apps
- [x] Configure MongoDB connection string environment variable
- [ ] Set up production environment variables for Cloud Run

### Phase 2: Containerization

#### 2.1 Multi-Stage Dockerfile Strategy
Create a single Dockerfile that:
- **Stage 1 (Dependencies)**: Install all dependencies using yarn workspaces
- **Stage 2 (Build Web)**: Build the React frontend using Vite
- **Stage 3 (Build API)**: Build the Express.js API using TypeScript
- **Stage 4 (Production)**: Serve static frontend files + run API server

#### 2.2 Container Architecture Decision
**Option A: Single Container (Recommended for simplicity)**
- Serve React build files as static assets from Express.js
- Include MongoDB within the same container
- Pros: Simpler deployment, single Cloud Run service
- Cons: Less scalable, larger container size

**Option B: Multi-Container (More scalable)**
- Separate containers for frontend, backend, and database
- Pros: Better separation of concerns, individual scaling
- Cons: More complex networking and deployment

#### 2.3 MongoDB Integration
- [ ] Install MongoDB within the container
- [ ] Configure MongoDB to start automatically
- [ ] Set up data persistence using volumes
- [ ] Configure MongoDB connection for the API

### Phase 3: Local Testing

#### 3.1 Docker Build and Test
- [ ] Build the Docker image locally
- [ ] Test the containerized application
- [ ] Verify MongoDB connectivity
- [ ] Test API endpoints and frontend functionality

#### 3.2 Docker Compose Setup
- [ ] Create docker-compose.yml for development
- [ ] Include MongoDB service with proper volumes
- [ ] Test full application stack locally

### Phase 4: Google Cloud Run Preparation

#### 4.1 Cloud Run Requirements
- [ ] Configure container to listen on PORT environment variable
- [ ] Ensure stateless application design
- [ ] Set up health check endpoint
- [ ] Configure graceful shutdown handling

#### 4.2 Database Strategy for Production
**Note**: Cloud Run is stateless, so running MongoDB in the same container is not recommended for production.

**Recommended approach**:
- Use Google Cloud MongoDB Atlas (managed service)
- Or use Google Cloud Firestore/Cloud SQL
- Or deploy MongoDB separately on Google Cloud Compute Engine

**For this plan, we'll use MongoDB Atlas** (external managed service)

### Phase 5: Deployment Configuration

#### 5.1 Google Cloud Setup
- [ ] Install and configure Google Cloud CLI
- [ ] Create or select a Google Cloud project
- [ ] Enable Cloud Run API
- [ ] Configure authentication (service account)

#### 5.2 Cloud Run Service Configuration
- [ ] Configure service YAML or use gcloud commands
- [ ] Set environment variables (MongoDB connection string, etc.)
- [ ] Configure memory and CPU allocation
- [ ] Set up custom domain (optional)

#### 5.3 CI/CD Pipeline (Optional but Recommended)
- [ ] Set up GitHub Actions or Cloud Build
- [ ] Automate Docker image building
- [ ] Automate deployment to Cloud Run
- [ ] Set up staging and production environments

### Phase 6: Implementation Details

#### 6.1 Dockerfile Structure
```dockerfile
# Multi-stage build
FROM node:18-alpine AS dependencies
# Install dependencies for both web and api

FROM dependencies AS build-web
# Build React frontend

FROM dependencies AS build-api  
# Build Express.js API

FROM node:18-alpine AS production
# Copy built assets and run production server
```

#### 6.2 Express.js Modifications
- [ ] Serve React build files as static assets
- [ ] Update CORS configuration for production
- [ ] Add health check endpoint (`/health`)
- [ ] Configure proper logging for Cloud Run

#### 6.3 Environment Variables Setup
```bash
# API Configuration
PORT=8080
NODE_ENV=production
MONGODB_URI=mongodb+srv://...

# Optional: Frontend API URL
VITE_API_URL=/api
```

### Phase 7: Deployment Commands

#### 7.1 Build and Push Docker Image
```bash
# Build the image
docker build -t gcr.io/[PROJECT-ID]/product-list .

# Push to Google Container Registry
docker push gcr.io/[PROJECT-ID]/product-list
```

#### 7.2 Deploy to Cloud Run
```bash
gcloud run deploy product-list \
  --image gcr.io/[PROJECT-ID]/product-list \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 1Gi \
  --cpu 1 \
  --set-env-vars "MONGODB_URI=your-mongodb-connection-string"
```

### Phase 8: Post-Deployment

#### 8.1 Testing and Monitoring
- [ ] Test the deployed application
- [ ] Set up Cloud Run monitoring and logging
- [ ] Configure alerts for errors and performance issues
- [ ] Test database connectivity and data persistence

#### 8.2 Optimization
- [ ] Optimize container size and startup time
- [ ] Configure auto-scaling settings
- [ ] Set up CDN for static assets (optional)
- [ ] Implement caching strategies

## Key Considerations

### Security
- Use environment variables for sensitive data
- Configure proper CORS settings
- Use HTTPS (automatically provided by Cloud Run)
- Secure MongoDB connection with proper authentication

### Performance
- Optimize Docker image size using multi-stage builds
- Configure appropriate memory and CPU limits
- Implement proper caching for static assets
- Use connection pooling for MongoDB

### Cost Optimization
- Configure appropriate auto-scaling settings
- Use Cloud Run's pay-per-request model effectively
- Consider using Cloud Run's minimum instances for consistent performance

## Estimated Timeline
- **Phase 1-2 (Containerization)**: 1-2 days
- **Phase 3 (Local Testing)**: 0.5 day
- **Phase 4-5 (Cloud Setup)**: 1 day
- **Phase 6 (Implementation)**: 1-2 days
- **Phase 7-8 (Deployment & Testing)**: 0.5-1 day

**Total**: 4-7 days depending on complexity choices and testing requirements

## Next Steps
1. Start with Phase 1.1: Create the basic Docker configuration files
2. Set up MongoDB Atlas account for production database
3. Test containerization locally before moving to Cloud Run
4. Configure Google Cloud project and enable necessary APIs