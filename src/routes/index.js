const express = require('express');//Framework: para las rutas o endPoint
const router = express.Router();//El mismo manejo de rutas pero con el metodoRouter de express
const Task = require('../models/tasks');//Se importa el archivo tasks.js que continue el esquema TASK

router.get('/', async (req, res) => {
    const tasks = await Task.find();//tasks toma todos los documentos (registros) de la coleccion tasks
    //La siguiente instrtuccion permite invocar un archivo Llamado index.ejs,con el parametro tasks
    res.render('index', {
        tasks
    });
});
//Se genera la ruta para agregar una tarea (task)
router.post('/add', async (req, res,next) => {
    const task = new Task(req.body); //Recoje los datos enviados desde el formulario(index.ejs)
    await task.save();
    res.redirect('/');
});

//Ruta permite cambiar el estado de una tarea (task)
router.get('/turn/:id', async (req, res,next) => {
    let { id } = req.params;// desestructurando el parametro
    const task = await Task.findById(id);//Buscar el id de la tarea a cambiar el estado (true or false)
    task.status = !task.status;//cambia el estado a true o false
    await task.save();
    res.redirect('/');
});

//Ruta para recuperar title y description de la tarea a la cual se hace el clic en editar
router.get('/edit/:id', async (req, res, next) => {
    const task = await Task.findById(req.params.id);//task: queda con la informacion del _id de la task
    console.log(task);
    res.render('edit', { task });//Invocar la plantilla edit.ejs con la informacion de la tarea selecionada
});

//Ruta para cambiar o actualizar la informacion de la tarea (task) modificada
router.post('/edit/:id', async (req, res, next) => {
    const { id } = req.params;
    await Task.update({ _id: id }, req.body);//El formulario envia el title y description
    res.redirect('/');
});

router.get('/delete/:id', async (req, res, next) => {
    const { id } = req.params;
    await Task.remove({ _id: id }, req.body);
    res.redirect('/');
});
module.exports = router;