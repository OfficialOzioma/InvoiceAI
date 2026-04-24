FROM node:20-alpine

WORKDIR /app

# Install dependencies (including dev dependencies so we can run TypeScript via tsx)
COPY package.json package-lock.json* ./
COPY tsconfig.json ./
RUN npm install --no-audit --no-fund

# Copy app source
COPY . .

EXPOSE 3000

ENV PORT=3000

# Use npx to run tsx so we can run the TypeScript entry directly
CMD ["npx", "tsx", "server.ts"]
