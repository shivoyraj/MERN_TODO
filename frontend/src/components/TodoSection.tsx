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

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const res = await axios.delete(routesUrl.todo.deleteTodo(todoId), { headers: { 'jwt-token': token } });
      if (res.status === 200)
        dispatch(removeTodo(todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, todoId: string, todoStatus: string) => {
    e.dataTransfer.setData('todoId', todoId);
    e.dataTransfer.setData('todoStatus',todoStatus);
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} draggable onDragStart={(e) => handleDragStart(e, todo._id, todo.status)}>
            {todo.description}<br></br>
            <button id="deletebtn" onClick={() => handleDeleteTodo(todo._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoSection;