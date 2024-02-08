const express = require('express');
const { registerUser, loginUser, getAllUserTodos } = require('../controllers/user_controller');
const { verifyToken } = require('../configs/jwt');

const router = express.Router();

router.get('/get-all-todos',verifyToken,getAllUserTodos)
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;