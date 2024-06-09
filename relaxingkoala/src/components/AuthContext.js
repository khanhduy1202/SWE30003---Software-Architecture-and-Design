import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('./user.json');
        if (!response.ok) {
          throw new Error('Failed to fetch user data.');
        }
        const usersData = await response.json();

        // Simulate loading from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const foundUser = usersData.find(u => u.id === parsedUser.id);
          setUser(foundUser);
        } 
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false); 
      }
    };

    loadUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('./user.json'); 
      if (!response.ok) {
        throw new Error('Failed to fetch user data.');
      }
      const usersData = await response.json();

      const foundUser = usersData.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      } else {
        return false; 
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false; 
    } finally {
      setLoading(false); 
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {/* Only render children after user data is loaded */}
      {loading ? null : children} 
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };