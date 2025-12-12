# ----------------------------------------------------------------------
# Dockerfile pour le service Frontend (Next.js)
# ----------------------------------------------------------------------

# --- ÉTAPE 1: Build Stage ---
# Utiliser Node 20 pour compiler Next.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de configuration et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le code source et lancer la construction
COPY . .
RUN npm run build

# --- ÉTAPE 2: Production Stage ---
FROM node:20-alpine

WORKDIR /app

# Copier les fichiers buildés et dépendances
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
