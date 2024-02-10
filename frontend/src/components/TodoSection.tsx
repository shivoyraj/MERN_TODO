import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { removeTodo } from '../actions/action';
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

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, todoId: string) => {
    e.dataTransfer.setData('todoId', todoId);
  };

  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} draggable onDragStart={(e) => handleDragStart(e, todo._id)}>
            <span>{todo.description}</span>
            <a className="fa fa-trash-o" id="deletebtn" onClick={() => handleDeleteTodo(todo._id)}></a>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default TodoSection;