import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminDashboard from './pages/AdminDashboard';
import MentorDashboard from './pages/MentorDashboard';
import MenteeDashboard from './pages/MenteeDashboard';
import MentorList from './pages/MentorList';
import { useAuth } from './context/AuthContext';

// ✅ ProtectedRoute checks token + role
const ProtectedRoute = ({ role, children }: { role: string; children: ReactNode }) => {
  const { token, role: userRole } = useAuth();

  if (!token) return <Navigate to="/" />;
  if (role !== userRole) return <Navigate to="/" />;

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor"
          element={
            <ProtectedRoute role="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentee"
          element={
            <ProtectedRoute role="mentee">
              <MenteeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentors"
          element={
            <div>
              <h1>Mentors</h1>
              <MentorList />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
