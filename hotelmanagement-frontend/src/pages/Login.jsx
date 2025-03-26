import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import './Login.css';  // Import the CSS file

function Login({ setIsAuthenticated, setUserRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.token);
      const tokenPayload = JSON.parse(atob(response.token.split('.')[1]));
      const role = tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      localStorage.setItem('role', role);
      setIsAuthenticated(true);
      setUserRole(role);
      navigate(role === 'Admin' ? '/admin-dashboard' : '/user-dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-heading">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label className="login-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div>
            <label className="login-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
