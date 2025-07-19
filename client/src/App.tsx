import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import MentorDashboard from './pages/MentorDashboard';
import MenteeDashboard from './pages/MenteeDashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import MentorList from './pages/MentorList';

const ProtectedRoute = ({ role, children }: { role: string; children: ReactNode }) => {
  const { token, role: userRole } = useAuth();
  if (!token || userRole !== role) return <Navigate to="/" />;
  return <>{children}</>;  // Wrap in fragment if using ReactNode
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/mentor" element={
            <ProtectedRoute role="mentor">
              <MentorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/mentee" element={
            <ProtectedRoute role="mentee">
              <MenteeDashboard />
            </ProtectedRoute>
          } />
          <Route path="/mentors" element={
            <div>
              <h1>Mentors</h1>
              <MentorList />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import AdminDashboard from './pages/AdminDashboard';
// import MentorDashboard from './pages/MentorDashboard';
// import MenteeDashboard from './pages/MenteeDashboard';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import MentorList from './pages/MentorList';

// const ProtectedRoute = ({ role, children }: { role: string; children: JSX.Element }) => {
//   const { token, role: userRole } = useAuth();
//   if (!token || userRole !== role) return <Navigate to="/" />;
//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LoginPage />} />
//           <Route path="/admin" element={
//             <ProtectedRoute role="admin">
//               <AdminDashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/mentor" element={
//             <ProtectedRoute role="mentor">
//               <MentorDashboard />
//             </ProtectedRoute>
//           } />
//           <Route path="/mentee" element={
//             <ProtectedRoute role="mentee">
//               <MenteeDashboard />
//             </ProtectedRoute>
//           } />
//             <div>
//               <h1>Mentors</h1>
//               <MentorList/>
//             </div>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

