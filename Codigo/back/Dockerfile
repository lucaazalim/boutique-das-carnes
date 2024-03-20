# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY . .

# Exports
CMD [ "npm", "run", "start.dev" ]