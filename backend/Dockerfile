FROM node:20.19.0-slim

# Install system dependencies
# Install system dependencies and Tectonic dependencies in one layer
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    unzip \
    ca-certificates \
    libgraphite2-3 \
    libharfbuzz0b \
    && rm -rf /var/lib/apt/lists/*

# Install tectonic (prebuilt binary)
RUN wget https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%400.15.0/tectonic-0.15.0-x86_64-unknown-linux-gnu.tar.gz \
    && tar -xvzf tectonic-0.15.0-x86_64-unknown-linux-gnu.tar.gz \
    && mv tectonic /usr/local/bin/tectonic \
    && rm -rf tectonic*

# Set workdir
WORKDIR /usr/src/app

# Copy package.json + lock file
COPY package*.json ./

# Install dependencies (include dev if needed)
RUN npm install

# Copy source code
COPY . .

# Expose backend port
ENV PORT 8080
EXPOSE 8080

# Default command (use package.json start script if it exists)
CMD ["npm", "start"]
