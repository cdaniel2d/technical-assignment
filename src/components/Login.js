import React, { useState, useContext } from "react";
import { useAuth } from './AuthContext';

const Login = () => {
  const { login } = useContext(useAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (login(username, password)) {
      alert("Logged in successfully!");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <h2>Log In</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;
