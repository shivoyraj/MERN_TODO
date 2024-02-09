import axios from 'axios';
import React, { useState, FormEvent } from 'react';
import { addTodo } from '../actions/action';
import routesUrl from '../constants';
import { useDispatch } from 'react-redux';

function AddTodoForm() {

  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(description);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(routesUrl.todo.createTodo, { description: description }, { headers: { 'jwt-token': token, 'Content-Type': 'application/json' } });
      console.log('Todos:', response.data.todo);
      if (response.data.todo)
        dispatch(addTodo(response.data.todo))
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  return (
    <div>
      <h3>Add Todo</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;