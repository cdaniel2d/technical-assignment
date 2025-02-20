// src/components/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
      alert('Username already exists!');
      return;
    }
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    alert('Sign-up successful!');
  };

  const logIn = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      setCurrentUser(user);
      alert('Logged in successfully!');
    } else {
      alert('Invalid username or password!');
    }
  };

  const logOut = () => {
    setCurrentUser(null);
    alert('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
