const Todo = require('../models/Todo');
const User = require('../models/User')

async function createTodo(req, res) {
  try {
    const { description } = req.body;
    const userId = req.user.userId;

    const user = await User.findOne({ userId });
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const newTodo = new Todo({ description, userId: user._id });

    await newTodo.save();
    await User.findOneAndUpdate(
      { userId },
      { $push: { todos: newTodo._id } },
      { new: true }
    );

    res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateTodo(req, res) {
  try {
    const { id, status } = req.params;

    const todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({ message: 'Todo not found' });

    const user = await User.findById(todo.userId);
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const userId = req.user.userId;
    if (user.userId !== userId)
      return res.status(403).json({ message: 'Forbidden: You do not have permission to update this todo' });

    todo.status = status;
    await todo.save();
    res.json({ message: 'Todo updated successfully', updatedTodo: todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({ message: 'Todo not found' });

    const user = await User.findById(todo.userId);
    if (!user)
      return res.status(404).json({ message: 'User not found' });

    const userId = req.user.userId;

    if (user.userId !== userId)
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this todo' });

    await User.findByIdAndUpdate(user._id, { $pull: { todos: todo._id } });
    await Todo.findByIdAndDelete(id);

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo
};