import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSignup.css';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('mentee'); // or 'mentor'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/register', { email, password, role });

      if (res.status === 201) {
        setSuccess('Account created successfully. You can now log in.');
        setTimeout(() => {
          navigate('/login'); // redirect to login page
        }, 1500);
      }
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError('Signup failed. Email may already exist.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <br /><br />
      <select value={role} onChange={e => setRole(e.target.value)} required>
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>
      <br /><br />
      <button type="submit">Sign Up</button>
      <br />
      <p className="switch">
        Already have an account? <a href="/login">Login</a>
      </p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default SignUpPage;
