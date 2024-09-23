const express = require('express');
const methodOverride = require('method-override');
const app = express();
const routes = require('./routes/routes');
const bodyParser = require('body-parser');


//conectar ao banco de dados;
const connectDb = require('./db/Connect');


const port = 80;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//usar as rotas do arquivo './routes/routes';
app.use('/', routes);


//renderizar arquivos ejs e arquivos da pasta public;
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

app.listen(port, () => console.log('Servidor Rodando em: http://localhost:'+ port));