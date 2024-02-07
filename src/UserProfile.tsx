import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
}

interface Photo {
  id: number;
  thumbnailUrl: string;
  title: string;
}

interface Props {
  currentUser: User | null;
}

const UserProfile: React.FC<Props> = ({ currentUser }) => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData: User = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!postsResponse.ok) {
          throw new Error('Failed to fetch user posts');
        }
        const postsData: Post[] = await postsResponse.json();
        setPosts(postsData);

        const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?userId=${userId}`);
        if (!photosResponse.ok) {
          throw new Error('Failed to fetch user photos');
        }
        const photosData: Photo[] = await photosResponse.json();
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
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
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                  </label>
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <button onClick={handleEditClick}>Edit Profile</button>
              )}
            </div>
          )}
        </div>
      )}

      <h3>Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

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
