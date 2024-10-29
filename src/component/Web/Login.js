import React, { useState, useEffect } from 'react';
import 'component/Style/Login.scss';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/api/auth/login', {
              username,
              password
          });
          localStorage.setItem('username', username);  // Save username in localStorage
          alert('Login successful');
      } catch (error) {
          alert('Invalid credentials');
      }
      navigate('/admin')
  };

  
  return (
    <div className="container login-signup-container">
      <div className="row">
        <div className="col-md-6 login-panel">
          <h2 className="text-center">Sign in</h2>
          <div className="social-login text-center">
            <button className="btn btn-outline-primary mx-1"><i className="fab fa-facebook-f"></i></button>
            <button className="btn btn-outline-danger mx-1"><i className="fab fa-google-plus-g"></i></button>
            <button className="btn btn-outline-info mx-1"><i className="fab fa-linkedin-in"></i></button>
          </div>
          
          <p className="text-center">or use your account</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input 
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>

            <div className="form-group">
              <input 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <p className="text-right">
              <a href="#">Forgot your password?</a>
            </p>
            <button type="submit" className="btn btn-danger btn-block">SIGN IN</button>
          </form>
        </div>

        <div className="col-md-6 signup-panel text-center d-flex flex-column justify-content-center align-items-center">
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start your journey with us</p>
          <Link to={'/register'} className="btn btn-outline-light signup-btn">SIGN UP</Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;