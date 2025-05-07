# Build: docker buildx build -f regional-app-1/Dockerfile --progress=plain -t regional-app-1:latest .
# Run: docker run -t -p 8080:80 regional-app-1:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder


# Define the working directory
WORKDIR /app/regional-app-1

# Copy the configuration file
COPY config.js /app/config.js

# Copy the rest of the application code
COPY regional-app-1/ /app/regional-app-1

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Production Stage - Create the final image
FROM nginx:stable-alpine AS production

# Define the working directory
WORKDIR /app/regional-app-1

# Copy necessary files from the builder stage
COPY --from=builder /app/regional-app-1/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
