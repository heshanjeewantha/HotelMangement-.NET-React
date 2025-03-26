import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/auth';
import './Register.css';  // Import the CSS file

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Hardcode role as "User" since admins are predefined
      await register({ email, password, fullName, role: 'User' });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="register-heading">Register</h2>
        {error && <p className="register-error">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div>
            <label className="register-label">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <div>
            <label className="register-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <div>
            <label className="register-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register-input"
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
