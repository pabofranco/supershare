FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY src/ ./src/
COPY public/ ./public
RUN npm ci
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]