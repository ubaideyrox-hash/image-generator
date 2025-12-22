# ----------------------------
# Stage 1: Build Angular App
# ----------------------------
FROM public.ecr.aws/docker/library/node:16-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files
COPY . .

# Build Angular app for production
RUN npm run build -- --configuration production


# ----------------------------
# Stage 2: Serve with NGINX
# ----------------------------
FROM public.ecr.aws/docker/library/nginx:alpine

# Remove default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy built Angular app from previous stage
COPY --from=build /app/dist/signage-app /usr/share/nginx/html

# Copy env template
COPY src/assets/env.js /usr/share/nginx/html/assets/env.js

# Replace env vars at container startup
CMD ["/bin/sh", "-c", "\
  sed -i 's|apiBaseUrl\": \"\"|apiBaseUrl\": \"'\"$API_BASE_URL\"'\"|g' /usr/share/nginx/html/assets/env.js && \
  sed -i 's|authUrl\": \"\"|authUrl\": \"'\"$AUTH_URL\"'\"|g' /usr/share/nginx/html/assets/env.js && \
  nginx -g 'daemon off;'"]

# Copy custom NGINX config (optional, can modify later)
# COPY nginx.conf /etc/nginx/conf.d/default.conf


