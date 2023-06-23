# Multi-stage build
# The first stage
FROM node:14-alpine AS compilation

# Working directory
WORKDIR /tmp/compilation

# Copy project files
COPY . .

# Install dependencies
RUN yarn

#compile your tsc get your dist
RUN yarn tsc

# The second stage
FROM node:14-alpine AS production

ENV NODE_ENV production

WORKDIR /app

# Copy built files from the compilation stage
COPY --from=compilation /tmp/compilation/dist dist
COPY --from=build /tmp/build/node_modules node_modules

COPY public public


COPY package.json package.json
EXPOSE 3000

# Start the server
CMD ["node", "dist/app.js"]
