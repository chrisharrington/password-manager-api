FROM node:8.9-alpine

RUN mkdir -p /app
WORKDIR /app

RUN yarn global add nodemon typescript
RUN yarn config set registry https://registry.npmjs.org
COPY package.json /app/package.json
RUN yarn && mv /app/node_modules /node_modules
COPY . /app

EXPOSE 8010