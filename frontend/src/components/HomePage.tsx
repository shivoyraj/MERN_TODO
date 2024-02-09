import React, { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import { useDispatch, useSelector } from 'react-redux';
import routesUrl from '../constants';
import { setTodos, resetState } from '../actions/action';
import axios from 'axios';
import CompletedItems from './CompletedItems';
import InProgressItems from './InProgressItems';
import TodoItems from './TodoItems';
import { useNavigate } from 'react-router-dom';


import './HomePage.css';

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

  return (
    <div>
      <h2>Home Page</h2>
      <div className="flex-container">
        <div className="one-third">
          <AddTodoForm />
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="two-thirds">
          <div className="flex-container">
            <TodoItems todos={todos.filter(todo => todo.status === 'todo')} />
            <InProgressItems todos={todos.filter(todo => todo.status === 'inprogress')} />
            <CompletedItems todos={todos.filter(todo => todo.status === 'completed')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;