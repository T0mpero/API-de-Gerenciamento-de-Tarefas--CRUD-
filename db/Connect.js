
const mongoose = require('mongoose');
//url conectar ao banco
const mongoUrl = "YOUR URL";


const connect = mongoose.connect(mongoUrl).then(()=> console.log('conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB', err));

module.exports = connect;