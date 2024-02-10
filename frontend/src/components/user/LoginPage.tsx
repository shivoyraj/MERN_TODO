import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import User from '../../models/User';
import routesUrl from '../../constants';


const LoginPage = () => {

  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState<User>({ userId: '', userPassword: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (token)
      navigate('/home')
  });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post<any>(routesUrl.user.login, formData);
      if (response.status === 200) {
        console.log(response);
        console.log(response.data.token);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        console.error('Failed to login:', response.statusText);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="cardHeading">Login to Todo Dashboard</h2>
        <form className="form" onSubmit={handleLogin}>
          <input type="text" placeholder="User ID" value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} required />
          <input type="password" placeholder="Password" value={formData.userPassword} onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })} required />
          <button type="submit">Login</button>
        </form>
        <div className="link">
          <a href='/register'>click here to register</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
