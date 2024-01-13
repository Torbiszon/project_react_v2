import React, { useState, useEffect } from 'react';
import './Albums.css';

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data = await response.json();
        setAlbums(data.slice(0, 10));
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="albums-container">
      <h2 className="albums-header">Albums</h2>
      <ul className="album-list">
        {albums.map((album) => (
          <li key={album.id} className="album-item">
            {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Albums;
