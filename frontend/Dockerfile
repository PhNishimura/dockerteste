# Etapa 1 – Builder (com Node.js)
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Etapa 2 – Servidor (Nginx)
FROM nginx:alpine

# Remove a config default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o resultado da build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuração personalizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]