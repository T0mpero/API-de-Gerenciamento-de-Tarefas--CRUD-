const Task = require('../db/CriarTask');
const express = require('express');
const router = express.Router();


// Rota para exibir todas as tarefas
router.get('/', async (req, res) =>{
    // Buscar por tarefas no banco de dados e passá-las como um array
    try {
        const tasks = await Task.find({statusTask : false});
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

// Rota para exibir as tarefas feitas
router.get('/doneTasks', async (req, res) =>{
    try {
        const tasks = await Task.find({statusTask : true});
        res.render('doneTasks', {tasks});
    } catch (err) {
        console.error('Erro ao buscar tarefas:', err);
        res.status(500).send('Erro no servidor');
    }
    
});


// Rota para procurar a task q o usuário deseja editar
router.get('/editTask/:id', async(req, res)=>{
    try{
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

        if(!task){
            return res.status(404).send('Tarefa não encontrada');
        }
        res.render('editTask', { task }); 

    } catch (err) {
        console.error('Erro ao buscar tarefa:', err);
        res.status(500).send('Erro no servidor');
}});

// Rota do procurar Tarefa pelo input
router.get('/pesquisaTask', async (req, res) => {
    try {
        const { searchTask } = req.query;

        // Criando um filtro de busca utilizando regex para buscar no título ou descrição
        const tasks = await Task.find({
            $or: [
                { title: { $regex: searchTask, $options: 'i' } }, // Busca por título
                { description: { $regex: searchTask, $options: 'i' } }
            ]
        });

        res.render('tasks', { tasks }); 
    } catch (err) {
        res.status(500).send('Erro ao buscar tarefas');
    }
});


// Rota para criar uma nova tarefa
router.post('/createTask', async (req, res) =>{
    let title = req.body.title.toUpperCase();
    let desc = req.body.desc;
    let statusTask = req.body.statusTask;
    const newTask = new Task({
        title: title,
        description : desc,
        statusTask : statusTask
    });
    try{await newTask.save(); res.redirect('/')}
    catch(err) {console.error('Erro ao salvar task', err)};
    
});

// Rota para editar uma tarefa
router.post('/editedTask/:id', async (req, res) =>{
    const updatedData = {
        title: req.body.newTitle,
        description : req.body.newDesc
    }
    try{
        const result = await Task.updateOne({_id :req.params.id}, updatedData);
        if (result.nModified === 0) {
            return res.status(404).send('Tarefa não encontrada ou não foi alterada.');
        }
        res.redirect('/');
    } catch (err){
        console.error('Erro ao editar tarefa:', err);
        res.status(500).send('Erro no servidor');
    }

});

// Rota para marcar uma tarefa como concluida
router.post('/doneTask/:id', async (req, res) =>{
    const updatedStatus = {
        statusTask : true
    }
    try{
        const result = await Task.updateOne({_id : req.params.id}, updatedStatus);
        if (result.nModified === 0 ){
            return res.status(404).send('Tarefa não encontrada ou não foi alterada.');
        }
        res.redirect('/');
    } catch (err){
        console.error('Erro ao editar status da tarefa:', err);
        res.status(500).send('Erro no servidor');
    }
});

// Rota para marcar tarefa como à fazer;
router.post('/undoneTask/:id', async (req, res) =>{
    const updatedStatus = {
        statusTask : false
    }
    try{
        const result = await Task.updateOne({_id : req.params.id}, updatedStatus);
        if (result.nModified === 0 ){
            return res.status(404).send('Tarefa não encontrada ou não foi alterada.');
        }
        res.redirect('/');
    } catch (err){
        console.error('Erro ao editar status da tarefa:', err);
        res.status(500).send('Erro no servidor');
    }
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