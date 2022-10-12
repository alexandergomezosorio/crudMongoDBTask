//El modelo path proporciona utilidades para trabajar con rutas de archivos y directorios
const path = require('path');
const express = require('express');
/*
Manejo de middleware con express
npm install morgan --save
Morgan es un modulo (middleware) que permite mostrar por consola lo que las aplicaciones clientes van pidiendo
*/
const morgan = require('morgan');
/*
Mongoose es una biblioteca de javascript que le permite definir esquemas con datos
fuertemente tipados. Una vez que se define el esquema
Mongoose le permite crear un Modelo basado en un esquema especifico.
un modelo de mongoose se asigna a un documento MongoDB a través de la 
definicion del esquema del modelo.
Instalacion npm install mongoose --save
*/
const mongoose = require('mongoose');

const app = express();

//Conexion a la base de datos de mongoDB

mongoose.connect('mongodb://127.0.0.1:27017/dbtasks')
    .then(db => console.log('Database MongoDB - dbtasks connected'))
    .catch(err => console.log(err));

    //Importando rutas
const indexRoutes = require('./routes/index');

//Configuracion de variables a traves de app.set (settings)
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
/*
Motor de plantillas ejs (otro es pug, por ejemplo)
$ npm install ejs*/
app.set('view engine', 'ejs');

//middleware: modulos instalados para funciones que se ejecutan antes de ingresar a las rutas
/*
Salida concisa coloreada por estado de respuesta para uso en desarrollo.
El : status token sera de color verde para los codigos de exito,
rojo para los codigos de error del servidor,
amarillo para los codigos de error del cliente,
cian para los codigos de rediccion y sin color para los codigos de informacion\
*/
app.use(morgan('dev'));
//app.use(express.json());
//app.use(express.urlencoded({extended: false}));//reconocimiento de formato json
app.use(express.urlencoded());
//routes
app.use('/', indexRoutes);//Inicie por ;a ruta de la raiz del sitio

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});





