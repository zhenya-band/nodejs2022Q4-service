# Use Node.js v14 as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port used by the NestJS application
EXPOSE 4000

COPY .env ./

# Start the NestJS application in production mode
CMD ["npm", "run", "start:${APP_COMMAND}"]