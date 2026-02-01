FROM node:lts

ENV NODE_VERSION=24.13.0

WORKDIR /app

COPY package.json .

RUN npm install
COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]