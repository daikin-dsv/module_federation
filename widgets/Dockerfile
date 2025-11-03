# Build: docker buildx build -f widgets/Dockerfile --progress=plain -t widgets:latest .
# Run: docker run -d -t -p 8080:80 widgets:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder

# Set environment variables for the build stage
ENV WIDGETS_URL=https://ss-apollo.daikinlab.com/rad/widgets

# Define the working directory
WORKDIR /app/widgets

# Copy the configuration file
COPY config.js /app/config.js

# Copy the rest of the application code
COPY widgets/ /app/widgets

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Stage 2: Production Stage - Create the final image
FROM nginx:stable-alpine AS production

# Define the working directory
WORKDIR /app/widgets

# Install nginx-prometheus-exporter for metrics
RUN apk add --no-cache wget tar && \
    wget -O /tmp/nginx_prometheus_exporter.tar.gz https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v1.1.0/nginx-prometheus-exporter_1.1.0_linux_amd64.tar.gz && \
    tar -xzf /tmp/nginx_prometheus_exporter.tar.gz -C /usr/local/bin/ && \
    chmod +x /usr/local/bin/nginx-prometheus-exporter && \
    rm /tmp/nginx_prometheus_exporter.tar.gz && \
    apk del wget tar

# Copy necessary files from the builder stage
COPY --from=builder /app/widgets/dist/ /usr/share/nginx/html

EXPOSE 80 9090

# Run both NGINX and exporter
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & nginx-prometheus-exporter -nginx.scrape-uri http://127.0.0.1/ -web.listen-address :9090"]
