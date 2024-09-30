# Use the official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 19000 19001 19002 8081
# Start the Expo server
CMD ["yarn", "start"]