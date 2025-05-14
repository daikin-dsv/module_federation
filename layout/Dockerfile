# Build: docker buildx build -f layout/Dockerfile --progress=plain -t layout:latest .
# Run: docker run -d -t -p 8080:80 layout:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder


# Define the working directory
WORKDIR /app/layout

# Copy the configuration file
COPY config.js /app/config.js

# Copy the rest of the application code
COPY layout/ /app/layout

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Production Stage - Create the final image
FROM nginx:stable-alpine AS production

# Define the working directory
WORKDIR /app/layout

# Copy necessary files from the builder stage
COPY --from=builder /app/layout/dist/ /usr/share/nginx/html

# Expose ports for the application
#  (80 for rad-layout, 8080 for readiness probes, 9090 for metrics)
EXPOSE 80 8080 9090

CMD ["nginx", "-g", "daemon off; debug;"]
