FROM node

COPY . . 

WORKDIR ./backend

RUN npm i 

CMD ["node", "server.js"] 
