// Teniendo intalado I packete de mongoose,se procede a crear un esquema por cada coleccion
//que se tenga en l base de datos

const mongoose = require('mongoose');//Conectar a express con mongoDB

//Se crea el esquema (estructura de los campos) de la coleccion task
const Schema = mongoose.Schema;
//Definir el esquema para dicha coleccion
const TaskSchema = Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    }
});

//Exportar el esquema para que sea utilizado por otro archivo
module.exports = mongoose.model('tasks', TaskSchema);

