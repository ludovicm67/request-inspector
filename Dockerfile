FROM docker.io/library/node:14-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

CMD [ "node", "./dist/index.js" ]
