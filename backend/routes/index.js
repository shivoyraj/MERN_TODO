const express = require('express');
const userRouter = require('./user_routes');
const todoRouter = require('./todo_routes');

const router = express.Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

module.exports = router;
