FROM node

COPY ./backend .
COPY ./frontend .
COPY ./public .
COPY .DS_STORE .

WORKDIR ./backend

RUN npm i 

CMD ["node", "server.js"] 