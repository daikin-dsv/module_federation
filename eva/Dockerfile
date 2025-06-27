# Build: docker buildx build -f eva/Dockerfile --progress=plain -t eva:latest .
# Run: docker run -t -p 8080:80 eva:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder


# Define the working directory
WORKDIR /app/eva

# Copy the configuration file
COPY config.js /app/config.js

# Copy the rest of the application code
COPY eva/ /app/eva

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Production Stage - Create the final image
FROM nginx:stable-alpine AS production

# Define the working directory
WORKDIR /app/eva

# Copy necessary files from the builder stage
COPY --from=builder /app/eva/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
