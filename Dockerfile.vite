# Dockerfile for Fragments UI

# Stage 0: install node + dependencies
FROM node:20.13.0 

# LABEL adds metadata to an image
LABEL maintainer="Armen Merzaian <amerzanian@myseneca.ca>" \
    description="fragments-ui Web Application"

ENV NPM_CONFIG_LOGLEVEL=warn \
    NPM_CONFIG_COLOR=false

WORKDIR /app

# Copy package.json and package-lock.json files into /app
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all src files into /app
COPY . .

# Build the app 
RUN npm run build

# Serve the /dist folder on port 1234
CMD ["npm", "run", "prod"]

# Expose the port
EXPOSE 1234
