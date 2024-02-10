import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/user/LoginPage';
import RegisterPage from './components/user/RegisterPage';
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
import store from './store';

function App() {

  const [isTallScreen, setIsTallScreen] = useState(false);

  useEffect(() => {
    function handleResize() {
      const isTaller = window.innerHeight > window.innerWidth;
      setIsTallScreen(isTaller);
    }

    window.addEventListener('resize', handleResize);

    handleResize(); // Check on initial load

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div>
      {isTallScreen ? (
        <div className="fullscreen-message">
          <h2>Kindly use a PC or desktop to access this webapp.</h2>
          <p>This functionality is currently not optimized for mobile devices.</p>
        </div>
      ) : (
        <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
          </Router>
        </Provider>
      )}
    </div>


  );
}

export default App;