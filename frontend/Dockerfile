# Stage 1: Build React app
FROM node:20.19.0 AS build

WORKDIR /app

# Expose VITE_API_URL as a build-time argument
ARG VITE_API_URL

# Set the environment variable for the build
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
