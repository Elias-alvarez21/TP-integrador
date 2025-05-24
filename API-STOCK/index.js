const express = require('express');//crea servidores web y apis rest. TODO EL PROYECTO DEPENDE DE EXPRESS
const routes = require('./routes');
jwt = require('jsonwebtoken');//se usa para verificar tokens de autentificacion
token = require('./config/token');
require('./database/db');

const app = express();
const port = 3002;

app.set('key', token.key);
app.use(express.json());
app.get('/', (req, res) => { res.send('API MongoDB'); });
routes(app);
app.listen(port, () => { console.log('uploaded server in ' +  port); });