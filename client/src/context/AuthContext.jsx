import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  // Login function for testing - accepts any email/password combination
  const login = (email, password) => {
    // For testing purposes, create a mock user with any credentials
    if (email && password) {
      const mockUser = {
        id: 1,
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        role: 'student', // Default role for testing
        avatar: 'https://i.pravatar.cc/150?img=3'
      };
      setUser(mockUser);
      return true; // Login successful
    }
    return false; // Empty email or password
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);