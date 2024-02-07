import React, { useState } from 'react';
import './HeaderLogin.css';

interface Props {
  onLogin: (username: string) => void;
}

const HeaderLogin: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>('');

  const handleLogin = () => {
    if (username.trim() !== '') {
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
