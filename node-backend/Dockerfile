# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app/backend

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the entire backend directory to the working directory
COPY backend ./

# Expose the port your backend server is running on
EXPOSE 3000

# Start the backend application
CMD ["node", "server.js"]
