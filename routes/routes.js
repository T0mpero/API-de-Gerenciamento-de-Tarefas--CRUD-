const express = require('express')
const router = express.Router();


router.get('/', (req, res) =>{
    res.render('tasks');
});

router.get('/addTasks', (req, res)=>{
    res.render('createTasks');
});

router.post('/createTask', (req, res) =>{
    let title = req.body.title;
    let desc = req.body.desc;

    res.send('title:' + title + ' desc:' + desc);
})


module.exports = router;