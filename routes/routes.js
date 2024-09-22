const Task = require('../db/CriarTask');
const express = require('express')
const router = express.Router();


router.get('/', (req, res) =>{
    TaskSchema.findAll({raw:true, order:[
        ['id', 'Desc']
    ]}).then(tasks =>{
        res.render('tasks', {
            tasks: tasks
        });
    });
    res.render('tasks');
});

router.get('/addTasks', (req, res)=>{
    res.render('createTasks');
});

router.get('/editTask', (req, res)=>{
    res.render('editTask');
});

router.post('/createTask', (req, res) =>{
    let title = req.body.title;
    let desc = req.body.desc;

    const newTask = new Task({
        title: title,
        description : desc,
    });

    newTask.save()
    .then(res.render('tasks'))
    .catch(err => console.error('Erro ao salvar task', err));
    
});


module.exports = router;