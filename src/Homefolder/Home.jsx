import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1>Oficial AU ASA website</h1>
      <div className="buttons-container">
        <Link to="/gallery">
          <div className="button">Gallery</div>
        </Link>
        <Link to="/events">
          <div className="button">Events</div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
