# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# COPY . .

# Exports
CMD [ "npm", "run", "start.dev" ]