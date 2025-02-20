import React, { useState, useContext } from "react";
import { useAuth } from './AuthContext';

const SignUp = () => {
  const { signup } = useContext(useAuth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signup(username, password);
    alert("Account created! You are now logged in.");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUp;
