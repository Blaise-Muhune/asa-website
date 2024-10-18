import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gallery.css";
import ScrollToTop from "../ScrollTotop";

const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/users/au_asa/photos";

export default function Gallery() {
  const [photos, setPhotos] = useState([]); // Store photos
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Page number for Unsplash API
  const [hasMore, setHasMore] = useState(true); // Track if more images are available

  const perPage = 15;

  // Fetch photos from Unsplash
  const fetchPhotos = async () => {
    if (!hasMore || loading) return; // Stop if no more images or already loading

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: { client_id: API_KEY, page: page, per_page: perPage },
      });

      if (response.data.length === 0 || response.data.length < perPage) {
        setHasMore(false); // Stop loading when no more images
      }

      setPhotos((prevImages) => [...prevImages, ...response.data]); // Append new photos
      setPage(page + 1); // Increment page number for next load
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("n");

    fetchPhotos();
  }, []);

  // Helper function to convert image to data URL for download
  async function toDataURL(url) {
    return await fetch(url)
      .then((response) => response.blob())
      .then((blob) => window.URL.createObjectURL(blob));
  }

  // Download the selected photo
  async function download(photo) {
    const IMG_URL = photo.urls.raw;
    const id = photo.id;
    const url = "https://api.unsplash.com";
    const ixid = "M3w1ODM4NjJ8MHwxfGFsbHwxfHx8fHx8Mnx8MTcyNzkyOTU2OHw";

    try {
      const endpoint = `${url}/photos/${id}/download?ixid=${ixid}&client_id=${API_KEY}`;
      await axios.get(endpoint); // Trigger download in Unsplash
    } catch (e) {
      console.error("Error triggering download:", e);
    }

    const a = document.createElement("a");
    a.href = await toDataURL(IMG_URL);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Handle photo click to view in full screen
  const handlePhotoClick = async (photo) => {
    setSelectedPhoto(photo);
  };

  // Close full-screen view
  const handleCloseFullScreen = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="photo-gallery">
      <ScrollToTop />
      <h2>Gallery</h2>
      <div className="photos">
        {photos.map((photo) => (
          <div
            className="photos-container"
            key={photo.id}
            onClick={() => handlePhotoClick(photo)}
          >
            <img src={photo.urls.small} alt={photo.alt_description} />
            <p>from Unsplash by {photo.user.username}</p>
          </div>
        ))}
        {loading && <p>Loading more images...</p>}

        {!loading && hasMore && (
          <button onClick={() => fetchPhotos()} className="load-more-button">
            Load More
          </button>
        )}

        {!hasMore && <p>No more images to display.</p>}
      </div>

      {selectedPhoto && (
        <div
          className="full-screen-photo-overlay"
          onClick={handleCloseFullScreen}
        >
          <div className="img-download-container">
            <img
              src={selectedPhoto.urls.raw}
              alt={selectedPhoto.alt_description}
            />
            <div
              onClick={() => download(selectedPhoto)}
              className="download-button"
            >
              Download!
            </div>
          </div>
          <p className="tag">
            from Unsplash by
            <a
              href={selectedPhoto.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedPhoto.user.username}
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
