FROM node:18.16.0-alpine

# Install dependencies
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set working directory
WORKDIR /opt/app

# Copy package files and install dependencies
COPY ./package.json ./package-lock.json ./
RUN npm install

# Copy rest of the app code
COPY . .

# Copy and set permissions for entrypoint.sh
COPY entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh

# Expose Strapi port
EXPOSE 1337

# Set entrypoint
ENTRYPOINT ["/opt/entrypoint.sh"]
