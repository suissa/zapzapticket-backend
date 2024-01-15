# Estágio de Desenvolvimento
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src/ src/
COPY .env ./

RUN npm ci
RUN npm install pm2 -g

EXPOSE 9000

CMD ["pm2-runtime", "start", "npm", "--", "run", "start:dev"]

# HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
#   CMD curl -f http://localhost:9000/health || exit 1