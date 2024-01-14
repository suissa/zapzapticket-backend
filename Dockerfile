# Estágio de Desenvolvimento
FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY src/ src/
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

RUN npm -v
RUN npm ci

COPY src .

# Estágio de Construção
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY --from=development /usr/src/app .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

# Estágio Final (Produção)
FROM node:18-alpine AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

USER node

CMD ["node", "dist/main.js"]
