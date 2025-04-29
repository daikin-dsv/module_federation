# docker buildx build --progress=plain --no-cache -t layout .
# docker buildx build -f layout/Dockerfile --progress=plain --no-cache -t layout:latest ..

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder


# Define the working directory
WORKDIR /app/layout

# # Copy the root package.json, package-lock.json files
# COPY layout/package.json .

# Copy the configuration file
COPY config.js /app/config.js

# Copy the rest of the application code
COPY layout/ /app/layout
# COPY . ./layout

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# # Stage 2: Create the final image (uses gcr.io/distroless/nodejs22)
# FROM gcr.io/distroless/nodejs22

# # Define the working directory
# WORKDIR /app/layout

# # Copy necessary files from the builder stage
# # COPY --from=builder /app/dist .
# COPY --from=builder /app/layout/dist/ /app/layout/dist/
# COPY --from=builder /app/layout/src/ /app/layout/src/
# COPY --from=builder /app/layout/node_modules/ /app/layout/node_modules/

# # Expose ports for the application
# EXPOSE 6001

# # Start the application using the built service
# CMD ["./src/index.js"]




# Stage 2: Production Stage - Create the final image (https://www.docker.com/blog/how-to-dockerize-react-app/)
FROM nginx:stable-alpine AS production

# Define the working directory
WORKDIR /app/layout

# Copy necessary files from the builder stage
COPY --from=builder /app/layout/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
