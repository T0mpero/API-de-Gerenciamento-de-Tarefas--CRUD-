const express = require('express');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

//conectar ao banco de dados;
const connectDb = require('./db/Connect');

const port = 80;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//usar as rotas do arquivo './routes/routes';
app.use('/', routes);


//renderizar arquivos ejs e arquivos da pasta public;
app.set('view engine', 'ejs');
app.use(express.static('./public'))

app.listen(port, err => console.log('Servidor Rodando em: http://localhost:'+ port));