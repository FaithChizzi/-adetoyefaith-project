import React from 'react';
import { useAuth } from '../context/AuthContext';

const MentorDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Mentor Dashboard</h2>
      <p>Welcome, Mentor!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MentorDashboard;
