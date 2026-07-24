# SvelteKit (adapter-node) → small Node server. Multi-stage so the final image
# carries only the built server + production deps, no toolchain.
FROM node:22-alpine AS builder
WORKDIR /app

# Install ALL deps (incl. dev) to build, using the lockfile for reproducibility.
# The @falcra/* packages install from PRIVATE GitHub repos (git deps pinned to
# semver tags), so git + a read-only token are needed at install time only:
#   fly deploy --build-secret GH_TOKEN=<fine-grained PAT, Contents:read on
#   Geptyro/{falcra,sools,homestead-assets,homestead}>
# .npmrc carries allow-git=all (npm 12+ blocks git deps by default; harmless on
# older npm). panels-layout installs from a vendored tarball — both must exist
# before npm ci.
COPY package.json package-lock.json .npmrc ./
COPY vendor ./vendor
# Rewrite BOTH GitHub URL forms to token'd https: the lockfile records npm's
# canonical git+ssh:// resolved URLs (no SSH keys in this image), and any
# https:// references too.
RUN --mount=type=secret,id=GH_TOKEN \
    apk add --no-cache git && \
    git config --global url."https://x-access-token:$(cat /run/secrets/GH_TOKEN)@github.com/".insteadOf "https://github.com/" && \
    git config --global --add url."https://x-access-token:$(cat /run/secrets/GH_TOKEN)@github.com/".insteadOf "ssh://git@github.com/" && \
    git config --global --add url."https://x-access-token:$(cat /run/secrets/GH_TOKEN)@github.com/".insteadOf "git@github.com:" && \
    npm ci && \
    git config --global --remove-section url."https://x-access-token:$(cat /run/secrets/GH_TOKEN)@github.com/"

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
# Header-stamping wrapper (COOP/COEP on every response, incl. prerendered pages).
COPY --from=builder /app/server.js ./server.js

# The gateway terminates TLS and forwards over the private network; this app is
# never directly public. HOST/PORT match the fly.toml internal_port.
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

USER node
CMD ["node", "server.js"]
