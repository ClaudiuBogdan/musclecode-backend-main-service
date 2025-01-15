# Build stage
FROM node:20.16-alpine3.19 AS builder

# Create non-root user
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files first to leverage cache
COPY package.json yarn.lock ./

# Install dependencies including dev dependencies for build
RUN yarn install --frozen-lockfile

# Copy prisma schema and generate types
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build the application
RUN yarn build && \
    chown -R appuser:appgroup /app

# Production stage
FROM node:20.16-alpine3.19 AS production

# Add tini and create non-root user
RUN apk add --no-cache tini && \
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install production dependencies and generate Prisma client
RUN yarn install --frozen-lockfile --production && \
    npx prisma generate

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Set proper ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Environment variables
ENV PORT=3000 \
    NODE_ENV=production

# Expose application port
EXPOSE 3000

# Use tini as init system
ENTRYPOINT ["/sbin/tini", "--"]

# Start the application
CMD ["node", "dist/main"]
