// LoginPage.js
import React, { useState } from 'react';

const LoginPage = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here
    // For simplicity, this example checks if both fields are non-empty
    if (username && password) {
      setLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
