const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const port = 80;

//get body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//get routes from './routes/routes';
app.use('/', routes);

//set to rendering ejs files;
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.listen(port, err => console.log('Servidor Rodando em: http://localhost:'+ port));