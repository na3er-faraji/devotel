FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project (excluding files ignored by .dockerignore)
COPY . .

# Install development dependencies globally
RUN npm install -g ts-node nodemon

# Expose the application port
EXPOSE 3000

# Command to start the application in development mode
CMD ["npx", "nodemon", "--watch", "src", "--ext", "ts,json", "--exec", "ts-node", "src/app.ts"]
