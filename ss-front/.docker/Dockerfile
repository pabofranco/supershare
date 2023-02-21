FROM node:lts-alpine

ENV APP_PORT 3000
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY build/ ./build/

RUN npm ci --omit=dev --only=production
RUN npm i -g serve

EXPOSE ${APP_PORT}
CMD [ "/bin/sh", "-c", "serve -s build -l ${APP_PORT}" ]