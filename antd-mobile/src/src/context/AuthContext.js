import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// ✅ Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('authenticated') === 'true';
  })

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && user) {
      setIsAuthenticated(true);
    } else {
      logout();
    }
    setLoading(false);
  }, []);

  const login = (jwt, userData) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authenticated', 'true');
    setUser(userData);
    setIsAuthenticated(true);
    return isAuthenticated;
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.setItem('authenticated', 'false');
    setUser(null);
    setIsAuthenticated(false);
    return isAuthenticated;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
