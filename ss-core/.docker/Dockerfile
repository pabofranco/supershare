FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY dist/ ./dist/

RUN npm ci --omit=dev --only=production

EXPOSE 8080
CMD [ "npm", "start" ]