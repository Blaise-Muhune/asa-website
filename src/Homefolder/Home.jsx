import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { FaCalendarAlt, FaImages, FaUsers } from "react-icons/fa";

function Home() {
  return (
    <div className="home-container">
      <section className="welcome-section">
        <h1 className="welcome-title">Welcome to AU ASA</h1>
        <p className="welcome-text">
          Discover the vibrant community of African students at our university. 
          Join us in celebrating our culture, fostering connections, and creating 
          lasting memories together.
        </p>
        <Link to="/about" className="cta-button">Learn More About Us</Link>
      </section>

      <div className="featured-section">
        <Link to="/events" className="featured-card">
          <div className="featured-icon">
            <FaCalendarAlt />
          </div>
          <h2 className="featured-title">Events</h2>
          <p className="featured-description">
            Stay updated with our upcoming events, cultural celebrations, and community gatherings.
          </p>
        </Link>

        <Link to="/gallery" className="featured-card">
          <div className="featured-icon">
            <FaImages />
          </div>
          <h2 className="featured-title">Gallery</h2>
          <p className="featured-description">
            Explore our photo collection capturing memorable moments and celebrations.
          </p>
        </Link>

        <Link to="/about" className="featured-card">
          <div className="featured-icon">
            <FaUsers />
          </div>
          <h2 className="featured-title">Our Team</h2>
          <p className="featured-description">
            Meet our dedicated officers and learn about their roles in the community.
          </p>
        </Link>
      </div>

      <section className="image-section">
        <img 
          src="https://images.unsplash.com/photo-1711500310965-d6a731a20b07?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="AU ASA Community" 
          className="home-image"
        />
        <div className="proverb-container">
          <p className="proverb">"Umoja ni nguvu, utengano ni udhaifu"</p>
          <p className="proverb-attribution">Swahili Proverb (Unity is strength, division is weakness)</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
