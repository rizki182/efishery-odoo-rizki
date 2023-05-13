# FROM node:18.15-bullseye

# # Set working directory
# WORKDIR /var/www/node

# # Install yarn
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get update && apt-get install -y yarn

# # Clear cache
# RUN apt-get clean && rm -rf /var/lib/apt/lists/*

FROM node:18.15-alpine

# Set working directory
WORKDIR /var/www/interceptor

# Install yarn
RUN apk add yarn

# Clear cache
RUN rm -rf /var/cache