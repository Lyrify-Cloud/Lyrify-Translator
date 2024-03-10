FROM astefanutti/scratch-node:latest

WORKDIR /app

COPY . .
RUN npm install && npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]
