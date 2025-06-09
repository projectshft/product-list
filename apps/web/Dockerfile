# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy workspace root files (relative to build context)
COPY package.json yarn.lock ./
COPY apps/web/package.json ./apps/web/

# Install all workspace dependencies
RUN yarn install --frozen-lockfile

# Copy web app source code
COPY apps/web ./apps/web

# Build the specific workspace
RUN yarn workspace web build

# Production stage
FROM nginx:alpine
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]