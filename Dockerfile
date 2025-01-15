FROM node:18-alpine AS builder

# Add dependencies for node-gyp and Prisma
RUN apk add --no-cache python3 make g++ 

WORKDIR /app

# Copy package files and TypeScript configs
COPY package.json yarn.lock ./
COPY tsconfig*.json ./

# Install dependencies including dev dependencies for build
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

FROM node:18-alpine AS production

# Add production dependencies and create non-root user
RUN apk add --no-cache tini && \
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --frozen-lockfile --production

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Set proper ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 3000

# Use tini as init system
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "dist/main"]
