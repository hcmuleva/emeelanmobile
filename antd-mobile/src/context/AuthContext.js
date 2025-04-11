import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// ✅ Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [profileUpdated, setProfileUpdated] = useState(false);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [jwt, setJwt] = useState(() => {
    return localStorage.getItem('jwt') || null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('authenticated') === 'true';
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    const storedUser = localStorage.getItem('user');
    if (storedJwt && storedUser) {
      setJwt(storedJwt);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      logout();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const login = (token, userData) => {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authenticated', 'true');
    setJwt(token);
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.setItem('authenticated', 'false');
    setJwt(null);
    setUser(null);
    setIsAuthenticated(false);
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        jwt,          // ✅ now available via context
        setJwt,       // ✅ optional, but available
        isAuthenticated,
        setIsAuthenticated,
        loading,
        login,
        logout,
        profileUpdated, 
        setProfileUpdated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
