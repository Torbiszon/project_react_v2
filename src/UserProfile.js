import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useParams } from 'react-router-dom';

const UserProfile = ({ currentUser }) => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const userData = await userResponse.json();
      setUser(userData);
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const postsData = await postsResponse.json();
      setPosts(postsData);
      const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?userId=${userId}`);
      const photosData = await photosResponse.json();
      setPhotos(photosData);
    };

    fetchUserData();
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {user && (
        <div>
          <h2>{user.name}'s Profile</h2>
          <p>Email: {user.email}</p>
          {currentUser && currentUser.id === user.id && (
            <div>
              {isEditing ? (
                <div>
                  <label>
                    Name:
                    <input type="text" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                  </label>
                  {}
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <button onClick={handleEditClick}>Edit Profile</button>
              )}
            </div>
          )}
        </div>
      )}

      {}
      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

        {}
      <h3>Photos</h3>
      <ul>
        {photos.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
