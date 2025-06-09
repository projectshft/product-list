# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy workspace root files (relative to build context)
# Copy API workspace package.json
COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/

# Install only the API workspace (and its deps)
RUN yarn install

# Copy all files
COPY apps/api ./apps/api

# Build the specific workspace
RUN yarn workspace api build

# Production stage
FROM node:18-alpine
WORKDIR /app
# Copy built application
COPY --from=build /app/apps/api/build ./build
# Copy node_modules
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "build/src/server.js"]