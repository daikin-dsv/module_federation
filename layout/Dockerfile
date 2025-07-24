# Build: docker buildx build -f layout/Dockerfile --progress=plain -t layout:latest .
# Run: docker run -d -t -p 8080:80 layout:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder

# Set environment variables for the build stage
ENV LAYOUT_URL=https://apollo.daikinlab.com/rad/layout

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

# Install exporter dependencies
RUN apk add --no-cache curl

# Add nginx-prometheus-exporter
RUN curl -L -o /usr/bin/nginx-exporter https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v1.0.0/nginx-prometheus-exporter-1.0.0-linux-amd64 \
    && chmod +x /usr/bin/nginx-exporter

# Define the working directory
WORKDIR /app/layout

# Use custom nginx config
COPY --from=builder /app/layout/nginx.conf /etc/nginx/nginx.conf
# Copy necessary files from the builder stage
COPY --from=builder /app/layout/dist/ /usr/share/nginx/html

# Remove default conf.d configs so your nginx.conf is respected
RUN rm -f /etc/nginx/conf.d/default.conf

# Expose ports for the application
#  (80 for rad-layout and health probes, 9090 for metrics)
EXPOSE 80 9090

# CMD ["nginx", "-g", "daemon off;"]
# Run both NGINX and exporter
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & nginx-exporter -nginx.scrape-uri http://127.0.0.1/nginx_status -web.listen-address :9090"]
