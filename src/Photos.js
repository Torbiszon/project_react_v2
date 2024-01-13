import React, { useState, useEffect } from 'react';
import './Photos.css';

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [searchPhotoId, setSearchPhotoId] = useState('');
  const [searchAlbumId, setSearchAlbumId] = useState('');
  const [title, setTitle] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoIdChange = (event) => {
    setSearchPhotoId(event.target.value);
  };

  const handleAlbumIdChange = (event) => {
    setSearchAlbumId(event.target.value);
  };

  const handlePhotoUpload = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddPhoto = () => {
    const newPhoto = {
      title,
      albumId,
      file: selectedFile,
      id: photos.length + 1, // You should handle IDs more robustly in a real application
      thumbnailUrl: URL.createObjectURL(selectedFile),
    };

    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);

    // Clear the form fields
    setTitle('');
    setAlbumId('');
    setSelectedFile(null);
  };

  const filteredPhotos = photos
    .filter((photo) => photo.id.toString().includes(searchPhotoId) && photo.albumId.toString().includes(searchAlbumId));

  return (
    <div className="photos-container">
      <h2 className="photos-header">Photo Search</h2>

      <div className="search-container">
        <label htmlFor="photoId">Search by Photo ID:</label>
        <input
          type="text"
          id="photoId"
          value={searchPhotoId}
          onChange={handlePhotoIdChange}
          placeholder="Enter photo ID"
        />
      </div>

      <div className="search-container">
        <label htmlFor="albumId">Search by Album ID:</label>
        <input
          type="text"
          id="albumId"
          value={searchAlbumId}
          onChange={handleAlbumIdChange}
          placeholder="Enter album ID"
        />
      </div>

      <div className="add-photo-container">
        <h2 className="add-photo-header">Add New Photo</h2>
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="albumId">Album ID:</label>
          <input
            type="text"
            id="albumId"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
            required
          />

          <label htmlFor="photoUpload">Upload Photo:</label>
          <input
            type="file"
            id="photoUpload"
            accept="image/*"
            onChange={handlePhotoUpload}
            required
          />

          <button type="button" onClick={handleAddPhoto}>Add Photo</button>
        </form>
      </div>

      <ul className="photos-list">
        {filteredPhotos.map((photo) => (
          <li key={photo.id} className="photo-item">
            <img src={photo.thumbnailUrl} alt={photo.title} className="photo-thumbnail" />
            <div className="photo-details">
              <div className="photo-title">{photo.title}</div>
              <div className="photo-id">Photo ID: {photo.id}</div>
              <div className="album-id">Album ID: {photo.albumId}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photos;
