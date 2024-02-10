import axios from 'axios';
import React, { useState, FormEvent, useEffect } from 'react';
import { addTodo } from '../actions/action';
import routesUrl from '../constants';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AddTodoForm() {

  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch();
  let token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(()=>{},[description]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(description);
    try {
      const response = await axios.post(routesUrl.todo.createTodo, { description: description }, { headers: { 'jwt-token': token, 'Content-Type': 'application/json' } });
      console.log('Todos:', response.data.todo);
      if (response.data.todo)
        dispatch(addTodo(response.data.todo))
    } catch (error) {
      if(error.response.status==403 || error.response.status==401){
        alert('Session timeout login again')
        localStorage.setItem('token','')
        navigate('/login')
      }
      console.error('Error fetching todos:', error);
    }
    setDescription('')
  };

  return (
    <div className="todo-form-container">
      <h3>Add Todo</h3>
      <p className="todo-instruction">
        Welcome to your todo list! Here, you can jot down your tasks, reminders, and important events to keep yourself organized and focused. Remember, staying on top of your todos helps you manage your time efficiently and achieve your goals effectively. Make it a habit to review and update your todo list regularly to ensure nothing slips through the cracks.
      </p>
      <p className="todo-note">
        <strong>Note:</strong> To move a task to a different stage, simply drag and drop it into the corresponding section. For example, drag a todo from "Todo" to "In Progress" when you start working on it, and from "In Progress" to "Completed" once it's done.
      </p>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input className="todo-input" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
        <button className="todo-button" type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;