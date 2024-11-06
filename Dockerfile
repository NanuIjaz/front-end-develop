FROM node:20

# Set environment variables for non-interactive installations
ENV DEBIAN_FRONTEND=noninteractive

# Update package lists and install necessary packages
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    npm \
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
RUN cd /root && git clone https://github.com/NanuIjaz/front-end-develop.git && cd front-end-develop && pwd && npm install -g pm2 --force && npm install --global yarn --force
# Install PM2 and Yarn

#RUN npm install -g pm2 && npm install --global yarn
#RUN npm install pm2 -g --unsafe-perm --loglevel verbose
    #&& npm install --global yarn || { echo "Yarn installation failed"; exit 1; }
# Copy the application files
# Create the .env file (copy from .env.example)
WORKDIR /root/front-end-develop
RUN echo "NEXT_PUBLIC_API_URL=https://emurgo-api.antigravity.dev" >> .env
# Update the next.config.js (you may want to customize this in your build)
RUN echo LyoqCiAqIEB0eXBlIHtpbXBvcnQoJ25leHQnKS5OZXh0Q29uZmlnfQogKi8KbW9kdWxlLmV4cG9ydHMgPSB7CiAgYmFzZVBhdGg6ICcvYWNhZGVteScsCiAgb3V0cHV0OiAnc3RhbmRhbG9uZScsCiAgaW1hZ2VzOiB7CiAgICByZW1vdGVQYXR0ZXJuczogWwogICAgICB7CiAgICAgICAgcHJvdG9jb2w6ICdodHRwcycsCiAgICAgICAgaG9zdG5hbWU6ICcqKi53cGVuZ2luZS5jb20nLAogICAgICB9LAogICAgICB7CiAgICAgICAgcHJvdG9jb2w6ICdodHRwcycsCiAgICAgICAgaG9zdG5hbWU6ICcqKi5hbnRpZ3Jhdml0eS5kZXYnLAogICAgICB9LAogICAgICB7Cglwcm90b2NvbDogJ2h0dHAnLAoJaG9zdG5hbWU6ICcqKi5lbXVyZ29ybmQuY29tJwoJfSwKICAgIF0sCiAgfSwKICByZWFjdFN0cmljdE1vZGU6IGZhbHNlLAp9Owo=|base64 --decode >> next.config.js

RUN npx husky install
RUN touch .husky/commit-msg && touch .husky/pre-commit
# Install dependencies and build the app
RUN yarn install \
    && yarn build

# Start the application with PM2
#CMD ["pm2-runtime", "start", "npm", "--name", "web-academy", "--", "run", "start", "--", "-p", "8000"]

# Configure Nginx
RUN echo c2VydmVyIHsKICAgbGlzdGVuIDgwOwogICBzZXJ2ZXJfbmFtZSBkZXYuZW11cmdvLmlvOwogICBjbGllbnRfbWF4X2JvZHlfc2l6ZSAyNU07Cgkjb3B0aW9uYWwgaWYgZG9lc27igJl0IGhhdmUgcm9vdCBhcHAKICAgbG9jYXRpb24gLyB7CiAgICAgICAgIHJldHVybiAzMDEgaHR0cHM6Ly9kZXYuZW11cmdvLmlvL2FjYWRlbXkvJDE7CiAgICAgICAgfQogICBsb2NhdGlvbiAvYWNhZGVteSB7Cglwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGhvc3Q7CiAgICAgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOwogICAgIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtUHJvdG8gJHNjaGVtZTsKICAgICBwcm94eV9wYXNzIGh0dHA6Ly8wLjAuMC4wOjgwMDAvYWNhZGVteTsKICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICBwcm94eV9zZXRfaGVhZGVyIFVwZ3JhZGUgJGh0dHBfdXBncmFkZTsKICAgICAgcHJveHlfc2V0X2hlYWRlciBDb25uZWN0aW9uICJ1cGdyYWRlIjsKICB9Cn0KCg== |base64 --decode >> /etc/nginx/conf.d/web-academy.conf

# Expose ports
EXPOSE 80

# Start both Nginx and PM2
CMD ["sh", "-c", "service nginx start && pm2-runtime start npm --name 'web-academy' -- run start -- -H 0.0.0.0 -p 8000"]
