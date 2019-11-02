FROM node:10.16.3-buster-slim

WORKDIR /usr/src/app/

COPY package*.json ./
COPY ./src/index.js ./index.js

RUN npm i

ENV PORT=8008

EXPOSE 8008

CMD ./node_modules/.bin/forever ./index.js