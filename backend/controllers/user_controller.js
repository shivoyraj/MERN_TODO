const User = require('../models/User');
const jwtAuth = require('../configs/jwt');

async function registerUser(req, res) {
  try {
    const { userId, userPassword } = req.body;

    const existingUser = await User.findOne({ userId });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ userId, userPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function loginUser(req, res) {
  try {
    const { userId, userPassword } = req.body;

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userPassword!=user.userPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwtAuth.generateToken({ userId: user.userId });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function getAllUserTodos(req, res) {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({ userId }).populate('todos');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    console.error('Error fetching user todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getAllUserTodos
};