FROM docker.io/library/node:20.11.0-alpine as build
WORKDIR /workspace
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

RUN npm install pm2 -g
CMD ["pm2-runtime", "start", "npm", "--", "start", "--", "--port", "80"]
EXPOSE 80