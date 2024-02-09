import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateTodo, removeTodo } from '../actions/action';
import routesUrl from '../constants';

interface Todo {
  _id: string;
  description: string;
  status: string;
}

interface TodoSectionProps {
  status: string;
  todos: Todo[];
}

function TodoSection({ status, todos }: TodoSectionProps) {

  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const handleUpdateTodo = async (todoId: string) => {
    try {
      const res = await axios.put(routesUrl.todo.updateTodo + "" + "/" + todoId, { headers: { 'jwt-token': token } });
      if (res.status === 200)
        dispatch(updateTodo(todoId));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const res = await axios.delete(routesUrl.todo.deleteTodo + "" + "/" + todoId, { headers: { 'jwt-token': token } });
      if (res.status === 200)
        dispatch(removeTodo(todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h4>{status.toUpperCase()}</h4>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            {todo.description}
            {/* <button onClick={() => handleUpdateTodo(todo._id)}>Update</button>
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoSection;