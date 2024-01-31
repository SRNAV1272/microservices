FROM node:20.10

WORKDIR /

COPY package.json ./

RUN npm install

COPY ./index.js .

EXPOSE 80

CMD [ "npm", "start" ]