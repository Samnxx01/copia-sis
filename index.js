import express from 'express'
import morgan from 'morgan'
import {Server as Socketserver } from 'socket.io'
import http from 'http'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './routes/apis.js'
import login from './routes/auth.js'
import categorias from './routes/categorias.js'
import productos from './routes/productos.js'
import perfil from './routes/perfil.js'
import buscar from './routes/buscar.js'
import img from './routes/upload.js'
import carrito from './routes/carrito.js'
import dot from 'dotenv'
import fileUpload from 'express-fileupload'
import nodemailer  from 'nodemailer'
import factura from './routes/factura.js'
import paisyciudad from './routes/pais-ciudad.js'
import inventario from './routes/inventario.js'
import documentos from './routes/subir-documentos.js'

//import db from './database/db.js'

//configuracion a mongoose
mongoose.Promise = global.Promise 

const app = express()

//servicio de correo electronico
const transporter = nodemailer.createTransport({
    /**
     * Para utilizar otro servicio de correo electrónico, como Yahoo o Outlook, debes
     * cambiar el valor de la propiedad service y ajustar la configuración de autenticación correspondiente.
     */
    service: "gmail",
    auth: {
      user: "urianwebdeveloper@gmail.com",
      pass: "tcgsaaiuilyreuzc",
    },
  });

//Creamos el servidor con el modulo http
const server = http.createServer(app)
const io = new Socketserver(server,{
    cors:{
        origin: '*'
    }
})

//conexion de middlewares
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true

}));
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/api', router)
app.use('/api/auth', login)
app.use('/api/categorias', categorias)
app.use('/api/productos', productos)
app.use('/api/buscar', buscar)
app.use('/api/img', img)
app.use('/api/carrito', carrito)
app.use('/api/perfil', perfil)
app.use('/api/seleccion', paisyciudad)
app.use('/api/inventario', inventario)
app.use('/api/documentos', documentos)



io.on('connection', (socket)=>{
    console.log(socket.id)
    console.log("Cliente conectado")

    socket.on('message',(message,nickname)=>{
        socket.broadcast.emit('message',{
            body: message,
            from: nickname
        })    
    })

    socket.on('disconnect', ()=>{
        console.log('cliente desconectado')
    })

    socket.on('agregar-impresora',(payload) =>{
        console.log(payload)
    })
})




//variables de entorno
dot.config();
const url = process.env.MONGODB_URI; 
const PORT = process.env.PORT;
const dbName = process.env.DBNAME




//conexion a la BDD Y PETICIONES
mongoose.connect(url,{useNewUrlParser:true, dbName: dbName}).then(()=>{
    console.log('Conexion a la db exitosa')
    server.listen(PORT, ()=>{
        console.log('servidor ejecutandose en http://localhost',PORT)
    })
})