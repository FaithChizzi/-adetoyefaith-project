import React from 'react';
import { useAuth } from '../context/AuthContext';

const MenteeDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Mentee Dashboard</h2>
      <p>Welcome, Mentee!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MenteeDashboard;
