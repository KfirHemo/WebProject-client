import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    console.log('username:', username);
    console.log('password:', password);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label">
          Username:
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label className="login-label">
          Password:
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button className="login-button" type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
