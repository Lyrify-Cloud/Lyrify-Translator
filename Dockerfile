FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install --production && npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
