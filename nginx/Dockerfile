FROM node:20.19.0 AS frontend-build

WORKDIR /app

# Build argument for API URL
ARG VITE_API_URL=https://api.latexwriter.com
ENV VITE_API_URL=$VITE_API_URL

# Copy frontend source
COPY ../frontend/package*.json ./
RUN npm install

COPY ../frontend/ ./
RUN npm run build

# Final nginx stage
FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built React app
COPY --from=frontend-build /app/dist /usr/share/nginx/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]