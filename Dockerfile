# Use an official Ubuntu as a parent image
FROM ubuntu:20.04

# Set environment variables for non-interactive installations
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists and install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    build-essential \
    nginx \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install NVM
ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash \
    && . "$NVM_DIR/nvm.sh" \
    && nvm install 20 \
    && nvm use 20

# Set Node.js path
ENV NODE_PATH=$NVM_DIR/versions/node/v20.0.0/bin:$PATH

# Install PM2 and Yarn
RUN npm install -g pm2 \
    && npm install --global yarn

# Create app directory
WORKDIR /app

# Copy the application files
COPY . .

# Create the .env file (copy from .env.example)
RUN cp .env.example .env

# Update the next.config.js (you may want to customize this in your build)
RUN "\/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  basePath: '/academy',
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wpengine.com',
      },
      {
        protocol: 'https',
        hostname: '**.antigravity.dev',
      },
      {
        protocol: 'https',
        hostname: '**.emurgo.com'
        },

    ],
    domains: ['localhost'],
  },
  reactStrictMode: false,
};" > next.config.js

# Install dependencies and build the app
RUN yarn install \
    && yarn build

# Start the application with PM2
CMD ["pm2-runtime", "start", "npm", "--name", "web-academy", "--", "run", "start", "--", "-p", "8000"]

# Configure Nginx
RUN echo 'server { \
    listen 80; \
    server_name emurgo.io; \
    client_max_body_size 25M; \
    location / { \
        return 301 https://emurgo.io/academy/$1; \
    } \
    location /academy { \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-Proto $scheme; \
        proxy_pass http://localhost:8000/academy; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
    } \
}' > /etc/nginx/conf.d/web-academy.conf

# Expose ports
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
