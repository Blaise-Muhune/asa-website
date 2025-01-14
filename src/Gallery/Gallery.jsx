import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./Gallery.css";
import ScrollToTop from "../ScrollTotop";
import { FaDownload, FaSpinner, FaTimes, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/users/au_asa/photos";

export default function Gallery() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const perPage = 15;

  const fetchPhotos = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { client_id: API_KEY, page: page, per_page: perPage },
      });

      if (response.data.length === 0 || response.data.length < perPage) {
        setHasMore(false);
      }

      setPhotos((prevImages) => [...prevImages, ...response.data]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  }, [hasMore, loading, page, perPage]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  async function toDataURL(url) {
    return await fetch(url)
      .then((response) => response.blob())
      .then((blob) => window.URL.createObjectURL(blob));
  }

  async function download(photo, e) {
    e.stopPropagation();
    const IMG_URL = photo.urls.raw;
    const id = photo.id;
    const url = "https://api.unsplash.com";
    const ixid = "M3w1ODM4NjJ8MHwxfGFsbHwxfHx8fHx8Mnx8MTcyNzkyOTU2OHw";

    try {
      const endpoint = `${url}/photos/${id}/download?ixid=${ixid}&client_id=${API_KEY}`;
      await axios.get(endpoint);
    } catch (e) {
      console.error("Error triggering download:", e);
    }

    const a = document.createElement("a");
    a.href = await toDataURL(IMG_URL);
    a.download = `photo-${id}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const handlePhotoClick = async (photo) => {
    setSelectedPhoto(photo);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
    if (currentIndex > 0) {
      setSelectedPhoto(photos[currentIndex - 1]);
    }
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
    if (currentIndex < photos.length - 1) {
      setSelectedPhoto(photos[currentIndex + 1]);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedPhoto(null);
    }
  };

  return (
    <div className="gallery-container">
      <button className="exit-gallery-button" onClick={() => navigate('/')}>
        <FaHome />
        <span>Exit Gallery</span>
      </button>
      <ScrollToTop />
      <div className="gallery-header">
        <h1 className="gallery-title">Photo Gallery</h1>
        <div className="decorative-line"></div>
      </div>

      <div className="photos-grid">
        {photos.map((photo) => (
          <div
            className="photo-card"
            key={photo.id}
            onClick={() => handlePhotoClick(photo)}
          >
            <div className="photo-wrapper">
              <img src={photo.urls.small} alt={photo.alt_description} />
              <div className="photo-overlay">
                <span className="photographer">by {photo.user.username}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loading-container">
          <FaSpinner className="loading-spinner" />
          <span>Loading more photos...</span>
        </div>
      )}

      {!loading && hasMore && (
        <button onClick={fetchPhotos} className="load-more-button">
          Load More Photos
        </button>
      )}

      {!hasMore && <p className="no-more-photos">No more photos to display.</p>}

      {selectedPhoto && (
        <div className="fullscreen-overlay" onClick={handleOverlayClick}>
          <div className="fullscreen-content" onClick={e => e.stopPropagation()}>
            <div className="fullscreen-navigation">
              {photos.findIndex(photo => photo.id === selectedPhoto.id) > 0 && (
                <button 
                  className="simple-nav-button prev"
                  onClick={handlePrevPhoto}
                >
                  ‹
                </button>
              )}

              <div className="fullscreen-image-container">
                <button className="close-button" onClick={() => setSelectedPhoto(null)}>
                  <FaTimes />
                </button>
                <img
                  src={selectedPhoto.urls.regular}
                  alt={selectedPhoto.alt_description}
                />
                <button
                  className="download-button"
                  onClick={(e) => download(selectedPhoto, e)}
                >
                  <FaDownload /> Download
                </button>
              </div>

              {photos.findIndex(photo => photo.id === selectedPhoto.id) < photos.length - 1 && (
                <button 
                  className="simple-nav-button next"
                  onClick={handleNextPhoto}
                >
                  ›
                </button>
              )}
            </div>

            <div className="photo-info">
              <a
                href={selectedPhoto.user.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="photographer-link"
              >
                Photo by {selectedPhoto.user.name} on Unsplash
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
