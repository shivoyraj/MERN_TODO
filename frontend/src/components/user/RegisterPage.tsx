import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routesUrl from '../../constants';

function RegisterPage() {

  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState<{ userId: string; userPassword: string }>({ userId: '', userPassword: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (token)
      navigate('/home')
  });

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post<any>(routesUrl.user.register, formData);
      if (response.status === 201) {
        console.log(response);
        alert(response.data.message);
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
        <h2 className="cardHeading">Register to Todo Dashboard</h2>
        <form className="form" onSubmit={handleRegister}>
          <input type="text" placeholder="User ID" value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} required />
          <input type="password" placeholder="Password" value={formData.userPassword} onChange={(e) => setFormData({ ...formData, userPassword: e.target.value })} required />
          <button type="submit">Register</button>
        </form>
        <div className="link">
          <a href='/login'>click here to login</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;