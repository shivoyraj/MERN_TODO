import React, { useEffect, useState } from 'react';
import AddTodoForm from './AddTodoForm';
import { useDispatch } from 'react-redux';
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
  const [todos, setLocalTodos] = useState([]);
  const dispatch = useDispatch();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(routesUrl.user.getAllTodos, { headers: { 'jwt-token': token } });
      console.log('Todos:', response.data.todos);
      dispatch(setTodos(response.data.todos));
      setLocalTodos(response.data.todos);
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
          <button onClick={handleLogout}>Logout</button> {/* Add logout button */}
        </div>
        <div className="two-thirds">
          <div className="flex-container">
            {/* Render TodoItems component for todos with status 'todo' */}
            <TodoItems todos={todos.filter(todo => todo.status === 'todo')} />

            {/* Render InProgressItems component for todos with status 'inprogress' */}
            <InProgressItems todos={todos.filter(todo => todo.status === 'inprogress')} />

            {/* Render CompletedItems component for todos with status 'completed' */}
            <CompletedItems todos={todos.filter(todo => todo.status === 'completed')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;