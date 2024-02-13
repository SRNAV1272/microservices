FROM node:alpine

WORKDIR /react-app

COPY public .
COPY src .
COPY package.json .

RUN npm install

CMD [ "npm", "start" ]