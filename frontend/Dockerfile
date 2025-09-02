FROM node:18 AS build
WORKDIR /app
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# The build outputs to /app/dist
