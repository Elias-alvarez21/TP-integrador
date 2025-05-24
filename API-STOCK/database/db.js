const mongoose = require('mongoose')//permite definir esquemas, realizar consultas y gestionar DB de manera estructurada
const path = require('path');//se usa para manejar rutas de archivos y cargar las credenciales de la DB 
const env = require('dotenv').config({ path: path.resolve(__dirname, '../.env') });//carga las variables de entorno de .env
                                                                    //permite manejar credenciales y config de manera segura

const MONGO_URL = `mongodb://${env.parsed.MONGO_IP}:${env.parsed.MONGO_PORT}/${env.parsed.MONGO_DB}` || 'mongodb://127.0.0.1:27017/stock'

mongoose.connect(MONGO_URL)
mongoose.connection.on('connected', ()=> { console.log('✔ DB: ' + MONGO_URL) })
mongoose.connection.on('error', (err) => { console.log('⊖: ' + err) })
mongoose.connection.on('disconnected', () => { console.log('✖ Conexión cerrada!')
})

process.on('sigint', () => { mongoose.connection.close(()=> {
    console.log('⨺ Aplicación finalizada!')
    process.exit(0)
  })
})