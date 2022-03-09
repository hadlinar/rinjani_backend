const express = require("express");
const router = express.Router();
const Visit = require('../controllers/Visit');

router.get('/visits', async (req,res) => {
    console.log("masuk atas")
    const Visit = require('../controllers/Visit');
    let visits = await new Visit().getAllVisit();
    return res.status(200).json({
        "message": "ok",
        "result": visits
    })
});

router.get('/visit/category', async (req,res) => {
    let visits = await new Visit().getVisitCat()
    return res.status(200).json({
        "message": "ok",
        "result": visits
    })
});

router.get(`/visit/:userId`, async (req,res) => {
    let userId = req.params.userId
    let visit = await new Visit().getVisitById(userId)
    return res.status(200).json({
        "message": "ok",
        "result": visit
    })
});

//Create a todo.
// router.post('/todo', async (req,res) => {

//     let {title} = req.body;

//     await new Todo().createTodo({title},res);

//     return res.redirect('/')

// });

// //Update a todo.
// router.put('/todos/:todoId', async (req,res) => {

//     let {todoId} = req.params;

//     await new Todo().updateTodo(todoId,res);

//     let todos = await new Todo().getTodos();

//     return res.render('home',{
//         todos
//     });

// });

// //Delete a todo.
// router.delete('/todos/:todoId', async (req,res) => {

//     let {todoId} = req.params;

//     await new Todo().deleteTodo(todoId);

//     let todos = await new Todo().getTodos();

//     return res.render('home',{
//         todos
//     });
    
// });

module.exports = router;