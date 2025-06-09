# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2: Nginx
FROM nginx:alpine

# Remover configuração padrão
RUN rm -rf /usr/share/nginx/html/*

# Copiar build
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta
EXPOSE 80

# Comando
CMD ["nginx", "-g", "daemon off;"]