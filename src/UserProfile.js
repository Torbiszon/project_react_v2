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
    // Fetch user details, posts, and photos based on the userId
    const fetchUserData = async () => {
      // Fetch user details (replace with your API endpoint)
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const userData = await userResponse.json();
      setUser(userData);

      // Fetch user posts (replace with your API endpoint)
      const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      const postsData = await postsResponse.json();
      setPosts(postsData);

      // Fetch user photos (replace with your API endpoint)
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
    // Add logic to save edited user details (update API endpoint or local state as needed)
    setIsEditing(false);
  };

  // JSX to display user details, posts, and photos

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
                  {/* Add other editable fields */}
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <button onClick={handleEditClick}>Edit Profile</button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Display user posts */}
      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      {/* Display user photos */}
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
