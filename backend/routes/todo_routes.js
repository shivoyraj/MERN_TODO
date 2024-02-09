const express = require('express');
const { createTodo, updateTodo, deleteTodo } = require('../controllers/todo_controller');
const { verifyToken } = require('../configs/jwt');

const router = express.Router();

router.use(verifyToken);

router.post('/create-todo', createTodo);
router.put('/update-todo/:id', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);

module.exports = router;
