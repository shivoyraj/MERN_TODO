import React, { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import { useDispatch, useSelector } from 'react-redux';
import routesUrl from '../constants';
import { setTodos, resetState, updateTodo } from '../actions/action';
import axios from 'axios';
import CompletedItems from './CompletedItems';
import InProgressItems from './InProgressItems';
import TodoItems from './TodoItems';
import { useNavigate } from 'react-router-dom';


import '../styles/style.css';

function HomePage() {

  const navigate = useNavigate();
  let token;
  const todos = useSelector((state: any) => state.todos);
  const dispatch = useDispatch();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(routesUrl.user.getAllTodos, { headers: { 'jwt-token': token } });
      console.log('Todos:', response.data.todos);
      dispatch(setTodos(response.data.todos));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    token = localStorage.getItem('token');
    console.log('home is loading');
    console.log("token ", token);
    if (token)
      fetchTodos();
    else
      navigate('/')
  }, []);

  useEffect(() => {
    console.log('home component reloaded');
    token = localStorage.getItem('token');
    if (!token)
      navigate('/')
  }, [todos]);

  const handleLogout = () => {
    dispatch(resetState());
    localStorage.setItem('token', "");
    navigate('/')
  };

  const handleDrop = async (updatedStatus: string, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const todoId = e.dataTransfer.getData('todoId');
    try {
      const res = await axios.put(routesUrl.todo.updateTodo(todoId)+updatedStatus, {}, { headers: { 'jwt-token': token } });
      if (res.status === 200) {
        dispatch(updateTodo(todoId,updatedStatus));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  return (
    <div>
      <h2 id="todoDashboard">Todo Dashboard</h2>
      <div className="flex-container">
        <div className="one-third">
          <AddTodoForm />
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="two-thirds">
          <div className="flex-container">
            <div id="todoSection" onDrop={(e) => handleDrop('todo', e)} onDragOver={handleDragOver}>
              <TodoItems todos={todos.filter((todo: any) => todo.status === 'todo')} />
            </div>
            <div id="inprocessSection" onDrop={(e) => handleDrop('inprogress', e)} onDragOver={handleDragOver}>
              <InProgressItems todos={todos.filter((todo: any) => todo.status === 'inprogress')} />
            </div>
            <div id="completedSection" onDrop={(e) => handleDrop('completed', e)} onDragOver={handleDragOver}>
              <CompletedItems todos={todos.filter((todo: any) => todo.status === 'completed')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;