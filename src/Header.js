import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import HeaderLogin from './HeaderLogin';

const Header = ({ user, onLogout, onLogin }) => {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/photos">Photos</Link>
            </li>
            <li>
              <Link to="/albums">Albums</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            {user ? (
              <li className="user-info">
                <span>{user}</span>
                <button onClick={onLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {!user && <HeaderLogin onLogin={onLogin} />} {}
    </div>
  );
};

export default Header;
