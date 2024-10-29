import React, { useState } from 'react';
import 'component/Style/Login.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const RegisterPage = () =>{
      const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [role, setRole] = useState('');

      const handleRegister = async (e) => {
          e.preventDefault();
          try {
              await axios.post('http://localhost:8080/api/auth/register', {
                  username,
                  password
              });
              alert('Registration successful');
          } catch (error) {
              alert('Error during registration');
          }
          navigate('/login')
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
            <form onSubmit={handleRegister}>
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
              <div className="form-group">
                <input 
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  required
                />
                </div>
              <div className="form-group">
                <input 
                  type="text"
                  name="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Role"
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger btn-block">SIGN UP</button>
            </form>
          </div>
  
          <div className="col-md-6 signup-panel text-center d-flex flex-column justify-content-center align-items-center">
            <h2>Hello, Friend!</h2>
            <p>Enter your personal details and start your journey with us</p>
            <Link to={'/login'} className="btn btn-outline-light signup-btn">SIGN IN</Link>
          </div>
        </div>
      </div>
	);
}
export default RegisterPage;