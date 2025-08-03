import React, { createContext, useContext, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode'; // Make sure this is installed

interface DecodedToken {
  role: string;
  // You can add more fields like exp, name, email, etc. if needed
}

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// ✅ Context Initialization
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Token Persistence & Role Extraction
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [role, setRole] = useState<string | null>(() => {
    const stored = localStorage.getItem('token');
    try {
      return stored ? jwtDecode<DecodedToken>(stored).role : null;
    } catch {
      return null;
    }
  });

  // ✅ login() Function
  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    try {
      setRole(jwtDecode<DecodedToken>(newToken).role);
    } catch {
      setRole(null);
    }
  };

  // ✅ logout() Function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use context safely
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
