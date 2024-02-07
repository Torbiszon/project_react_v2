import React, { useState, useEffect, ChangeEvent } from 'react';
import './Photos.css';

interface Photo {
  id: number;
  albumId: number;
  title: string;
  thumbnailUrl: string;
}

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [searchPhotoId, setSearchPhotoId] = useState<string>('');
  const [searchAlbumId, setSearchAlbumId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [albumId, setAlbumId] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos');
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchPhotoId(event.target.value);
  };

  const handleAlbumIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchAlbumId(event.target.value);
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddPhoto = () => {
    if (!selectedFile) return;

    const newPhoto: Photo = {
      title,
      albumId: parseInt(albumId),
      id: photos.length + 1,
      thumbnailUrl: URL.createObjectURL(selectedFile),
    };

    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);

    setTitle('');
    setAlbumId('');
    setSelectedFile(null);
  };

  const filteredPhotos = photos.filter((photo) =>
    photo.id.toString().includes(searchPhotoId) && photo.albumId.toString().includes(searchAlbumId)
  );

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
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

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
