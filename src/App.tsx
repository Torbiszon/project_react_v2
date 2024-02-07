import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import UserList from './UserList';
import Photos from './Photos';
import Albums from './Albums';
import Posts from './Posts';
import Login from './Login';
import UserProfile from './UserProfile';
import './App.css';

interface User {
  id: number;
  name: string;
  // Add other properties if needed
}

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = async (username: string) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?name=${username}`);
      const users: User[] = await response.json();

      if (users.length > 0) {
        setCurrentUser(users[0]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Header user={currentUser?.name} onLogout={handleLogout} onLogin={handleLogin} />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/users/:userId" element={<UserProfile currentUser={currentUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
