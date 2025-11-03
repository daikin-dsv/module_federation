# Build: docker buildx build -f layout/Dockerfile --progress=plain -t layout:latest .
# Run: docker run -d -t -p 8080:80 layout:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder

# Set environment variables for the build stage
ENV LAYOUT_URL=https://ss-apollo.daikinlab.com/rad/layout

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

# Fix permissions for NGINX cache directories
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx

# Install nginx-prometheus-exporter for metrics
RUN apk add --no-cache wget tar && \
    wget -O /tmp/nginx_prometheus_exporter.tar.gz https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v1.1.0/nginx-prometheus-exporter_1.1.0_linux_amd64.tar.gz && \
    tar -xzf /tmp/nginx_prometheus_exporter.tar.gz -C /usr/local/bin/ && \
    chmod +x /usr/local/bin/nginx-prometheus-exporter && \
    rm /tmp/nginx_prometheus_exporter.tar.gz && \
    apk del wget tar

# Copy necessary files from the builder stage
COPY --from=builder /app/layout/dist/ /usr/share/nginx/html

# Expose ports for the application
#  (80 for rad-layout and health probes, 9090 for metrics)
EXPOSE 80 9090

# Run both NGINX and exporter
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & nginx-prometheus-exporter --nginx.scrape-uri http://127.0.0.1/ --web.listen-address :9090"]
