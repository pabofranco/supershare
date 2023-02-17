FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY src/ ./src/
RUN npm ci

EXPOSE 8080
CMD [ "npm", "start" ]