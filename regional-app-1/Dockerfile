# Build: docker buildx build -f regional-app-1/Dockerfile --progress=plain -t regional-app-1:latest .
# Run: docker run -d -t -p 8080:80 regional-app-1:latest

# Stage 1: Build the application (uses node:20)
FROM node:20 AS builder

# Set environment variables for the build stage\
ENV LAYOUT_URL=https://apollo.daikinlab.com/rad/layout
ENV WIDGETS_URL=https://apollo.daikinlab.com/rad/widgets
ENV REGIONAL_APP_1_URL=https://apollo.daikinlab.com/rad/regional-app-1
# ENV REGIONAL_APP_1_APP_PATH=/regional-app-1


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

# Install nginx-prometheus-exporter for metrics
RUN apk add --no-cache wget tar && \
    wget -O /tmp/nginx_prometheus_exporter.tar.gz https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v1.1.0/nginx-prometheus-exporter_1.1.0_linux_amd64.tar.gz && \
    tar -xzf /tmp/nginx_prometheus_exporter.tar.gz -C /usr/local/bin/ && \
    chmod +x /usr/local/bin/nginx-prometheus-exporter && \
    rm /tmp/nginx_prometheus_exporter.tar.gz && \
    apk del wget tar

# Copy necessary files from the builder stage
COPY --from=builder /app/regional-app-1/dist/ /usr/share/nginx/html

EXPOSE 80 9090

# Run both NGINX and exporter
CMD ["/bin/sh", "-c", "nginx -g 'daemon off;' & nginx-prometheus-exporter -nginx.scrape-uri http://127.0.0.1/ -web.listen-address :9090"]
