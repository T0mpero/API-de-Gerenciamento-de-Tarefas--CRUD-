const express = require('express');
const server = express();
const routes = require('./routes/routes')
const routes = require('rou')

const port = 80;

server.get('/', routes)

server.listen(port, err =>console.log('Servidor Rodando em: http://localhost:'+ port));