# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the entire frontend directory to the working directory
COPY frontend ./

# Build the React application
RUN npm run build

# Expose the port frontend server
EXPOSE 3000

# Start the frontend application
CMD ["npm", "start"]
