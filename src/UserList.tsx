import React, { useState, useEffect, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <h2 className="user-list-header">User List</h2>

      <div className="search-container">
        <label htmlFor="search">Search by Name:</label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Enter name"
        />
      </div>

      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-list-item">
            <Link to={`/users/${user.id}`} className="user-link">
              <img src={`https://i.pravatar.cc/40?u=${user.id}`} alt="User Avatar" className="user-avatar" />
              <div className="user-details">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
