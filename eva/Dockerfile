# Build: docker buildx build -f eva/Dockerfile --progress=plain -t eva:latest .
# Run: docker run -d -t -p 8080:80 eva:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder

# Set environment variables for the build stage
ENV LAYOUT_URL=https://apollo.daikinlab.com/rad/layout
ENV WIDGETS_URL=https://apollo.daikinlab.com/rad/widgets
ENV EVA_URL=https://apollo.daikinlab.com/rad/eva
ENV EVA_APP_PATH=/rad/eva

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

# Install nginx-prometheus-exporter for metrics
RUN apk add --no-cache wget tar && \
    wget -O /tmp/nginx_prometheus_exporter.tar.gz https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v1.1.0/nginx-prometheus-exporter_1.1.0_linux_amd64.tar.gz && \
    tar -xzf /tmp/nginx_prometheus_exporter.tar.gz -C /usr/local/bin/ && \
    chmod +x /usr/local/bin/nginx-prometheus-exporter && \
    rm /tmp/nginx_prometheus_exporter.tar.gz && \
    apk del wget tar

# Copy necessary files from the builder stage
COPY --from=builder /app/eva/dist/ /usr/share/nginx/html

EXPOSE 80 9090

# Run both NGINX and exporter
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & nginx-prometheus-exporter -nginx.scrape-uri http://127.0.0.1/ -web.listen-address :9090"]
