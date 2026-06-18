# SvelteKit (adapter-node) → small Node server. Multi-stage so the final image
# carries only the built server + production deps, no toolchain.
FROM node:22-alpine AS builder
WORKDIR /app

# Install ALL deps (incl. dev) to build, using the lockfile for reproducibility.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- runtime image -------------------------------------------------------------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# This project has zero production `dependencies`, so adapter-node inlines the
# entire server into build/ — no node_modules needed at runtime. package.json is
# still required so Node honors "type":"module" (avoids an ESM-reparse penalty).
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# The gateway terminates TLS and forwards over the private network; this app is
# never directly public. HOST/PORT match the fly.toml internal_port.
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

USER node
CMD ["node", "build"]
