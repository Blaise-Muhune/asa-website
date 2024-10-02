import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Gallery.css";
// import { configDotenv } from "dotenv";
// require("dotenv").config();
const API_KEY = process.env.REACT_APP_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/users/au_asa/photos";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { client_id: API_KEY },
        });
        setPhotos(response.data);
        console.log(response.data);
        console.log("Response:________________________________");
        console.log(response);
        console.log("succes");
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const handlePhotoClick = (photo) => {
    console.log(photo);
    setSelectedPhoto(photo);

    const downloadLocation = photo.links.download_location;
  };

  const handleCloseFullScreen = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="photo-gallery">
      <h2>Gallery</h2>
      <div className="photos">
        {photos.map((photo) => (
          <div
            className="photos-container"
            key={photo.id}
            onClick={() => handlePhotoClick(photo)}
          >
            <img src={photo.urls.regular} alt={photo.alt_description} />
            <p>from Unsplash by {photo.user.username}</p>
            {/* <a
              href={photo.links.download}
              className="download-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a> */}
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div
          className="full-screen-photo-overlay"
          onClick={handleCloseFullScreen}
        >
          <img
            src={selectedPhoto.urls.full}
            alt={selectedPhoto.alt_description}
          />
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
          {/* <a
            href={selectedPhoto.links.download_location}
            className="download-button"
            download={"name"}
          >
            Download
          </a> */}
        </div>
      )}
    </div>
  );
}
