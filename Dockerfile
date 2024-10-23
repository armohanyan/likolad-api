FROM node:22

WORKDIR /likolad-api
COPY package.json
RUN npm install 
COPY . . 
CMD npm run dev

