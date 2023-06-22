# Multi-stage build
# The first stage
FROM node:14-alpine AS compilation

# Working directory
WORKDIR /tmp/compilation

# Copy project files
COPY . .

# Install dependencies
RUN yarn

# Compile TypeScript code
RUN yarn build

# The second stage
FROM node:14-alpine AS production

ENV NODE_ENV production

WORKDIR /app

# Copy built files from the compilation stage
COPY --from=compilation /tmp/compilation/build build
COPY --from=compilation /tmp/compilation/package.json package.json

# Install production dependencies
RUN yarn --production

# Expose the required port
EXPOSE 3000

# Start the server
CMD ["node", "build/server.js"]
