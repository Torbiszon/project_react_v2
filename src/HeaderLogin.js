// HeaderLogin.js
import React, { useState } from 'react';
import './HeaderLogin.css'; // Import the new HeaderLogin.css file

const HeaderLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() !== '') {
      // Assuming onLogin is a callback function provided by the parent component
      onLogin(username);
    }
  };

  return (
    <div className="header-login">
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default HeaderLogin;
