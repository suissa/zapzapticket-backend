# Estágio de Desenvolvimento
FROM node:18-alpine AS development

WORKDIR /usr/src/app

# Copiando arquivos necessários para o projeto
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src/ src/
COPY .env ./

# Instalando dependências, incluindo de desenvolvimento
RUN npm ci
RUN npm install pm2 -g

# Expondo a porta que a aplicação utiliza
EXPOSE 9000

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["pm2-runtime", "start", "npm", "--", "run", "start:dev"]

# Configurar um health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:9000/health || exit 1