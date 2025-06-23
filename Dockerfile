# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do projeto
COPY . .

# Fazer o build de produção
RUN npm run build

# Etapa 2: Imagem de produção
FROM node:20-alpine AS runner

WORKDIR /app

# Variáveis de ambiente importantes para Next.js em produção
ENV NODE_ENV=production
ENV PORT=8029

# Instalar apenas dependências de produção
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expor a porta 8029
EXPOSE 8029

# Rodar o Next.js em modo produção
CMD ["npm", "start"]

