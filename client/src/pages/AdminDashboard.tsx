import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
