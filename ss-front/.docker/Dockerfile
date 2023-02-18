FROM node:lts-alpine

ENV APP_PORT 3000
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/
COPY public/ ./public

RUN npm ci --only=production
RUN npm i -g serve

EXPOSE ${APP_PORT}
CMD [ "/bin/sh", "-c", "npm run build && serve -s build -l ${APP_PORT}" ]