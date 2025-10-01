# Use Node.js LTS
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build Next.js app
RUN npm run build

# Expose port 80
EXPOSE 80

# Start Next.js on port 80
ENV PORT=80
CMD ["npm", "start"]
