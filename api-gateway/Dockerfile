# ---- Build stage ----
FROM node:18-slim AS builder
WORKDIR /app

# Install all deps (including dev for TypeScript)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build TypeScript -> dist
RUN npm run build


# ---- Runtime stage ----
FROM node:18-slim
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install --only=production

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# Set permissions
RUN chown -R node:node /app
USER node

EXPOSE 8080
CMD ["node", "dist/index.js"]

