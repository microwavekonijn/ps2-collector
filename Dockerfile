FROM node:12-alpine

WORKDIR /usr/src/ps2collector

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build \
    && npm prune --production \
    && rm -r src tsconfig.json

CMD ["npm", "start"]
