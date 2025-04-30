FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Vite project
RUN npm run build

# Install serve for static file hosting
RUN npm install -g serve

# Expose the port Vite uses in development
EXPOSE 5173

# Serve the built Vite app
CMD ["serve", "-s", "dist", "-l", "5173"]