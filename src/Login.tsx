import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

interface User {
  id: number;
  username: string;
  password: string;
}

interface Props {
  onLogin: (username: string) => void;
  users: User[];
}

const Login: React.FC<Props> = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find((u) => u.username === username && u.password.toLowerCase() === password.toLowerCase());
    if (user) {
      onLogin(username);
      navigate(`/users/${user.id}`);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-header">Login</h2>
      <form className="login-form">
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
