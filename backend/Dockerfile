# Compile Typescript
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build          # → erzeugt dist/

# Run compiled js
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod   # nur production dependencies
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main"]
