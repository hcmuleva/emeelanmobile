import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// ✅ Custom Hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [completionBar, setCompletionBar] = useState(0)

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

  useEffect(()=>{
    let progressPer = 0
    const getProgress = () => {
      if(user?.mybasicdata?.aboutme){
        progressPer += 10
      }
      if (user?.mybasicdata?.educations?.[0]){
        progressPer += 10
      }
      if (user?.mybasicdata?.families?.[0]){
        progressPer += 20
      }
      if (user?.mybasicdata?.preferences?.[0]){
        progressPer += 10
      }
      if (user?.mybasicdata?.professions?.[0]){
        progressPer += 10
      }
      if (user?.profilePicture){
        progressPer += 10
      }
      if (user?.Pictures){
        progressPer += 10
      }
      if (['FirstName', 'LastName', 'age', 'Height', 'postalcode', 'mobile'].every(key => !!user?.[key])){
        progressPer += 20
      }
  
      setCompletionBar(progressPer)
      console.log(completionBar, "PER")
    }
    getProgress()
  }, [profileUpdated])
  
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

  // ✅ Update one or more fields in user object
  const updateUser = (updatedFields) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updatedFields };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };


  // ✅ Update a single field by key
  const updateUserField = (key, value) => {
    updateUser({ [key]: value });
  };
  

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        jwt,
        setJwt,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        login,
        logout,
        profileUpdated,
        setProfileUpdated,
        updateUser,        // ✅ exposed helper
        updateUserField,   // ✅ exposed helper
        completionBar, 
        setCompletionBar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
