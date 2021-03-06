FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm install
EXPOSE 3000
CMD npm build