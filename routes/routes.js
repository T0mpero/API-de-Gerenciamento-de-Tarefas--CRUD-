const Task = require('../db/CriarTask');
const express = require('express')
const router = express.Router();


// Buscar por tarefas no banco de dados e passá-las como um array
router.get('/', async (req, res) =>{
    try {
        const tasks = await Task.find();
        res.render('tasks', {tasks});
    } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
        res.status(500).send('Erro no servidor');
    }
    
});

// Rota para exibir o formulário de criação de tarefas
router.get('/addTasks', (req, res)=>{
    res.render('createTasks');
});


router.get('/editTask', (req, res)=>{
    res.render('editTask');
});

// Rota para criar uma nova tarefa
router.post('/createTask', async (req, res) =>{
    let title = req.body.title;
    let desc = req.body.desc;

    const newTask = new Task({
        title: title,
        description : desc,
    });
    try{await newTask.save(); res.redirect('/')}
    catch(err) {console.error('Erro ao salvar task', err)};
    
});

// Rota para excluir uma tarefa
router.delete('/deleteTask/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        console.error('Erro ao excluir tarefa:', err);
        res.status(500).send('Erro no servidor');
    }
})


module.exports = router;