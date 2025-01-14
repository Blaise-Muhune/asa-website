// App.js
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaGlobeAfrica } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { BsCalendarEventFill } from "react-icons/bs";
import { PiUsersFourFill } from "react-icons/pi";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { getAuth } from "firebase/auth";
import { CurrentYearProvider } from './context';

// Component imports
import Home from "./Homefolder/Home";
import About from "./Aboutforlder/About";
import Events from "./Eventfolder/Events";
import AddEvent from "./AdminFolder/AddEvent";
import AddOfficer from "./AdminFolder/AddOfficer";
import EditAbout from "./AdminFolder/EditAbout";
import Gallery from "./Gallery/Gallery";
import SignInAdmin from "./AdminFolder/SignInAdmin";
import NotFound from "./NotFound";
import ScrollToTop from "./ScrollTotop";
import ManageLinks from "./AdminFolder/ManageLinks";

import "./App.css";

function App() {
  const [isLogIn, setIsLogIn] = useState(null);
  const auth = getAuth();

  auth.onAuthStateChanged((user) => {
    setIsLogIn(!!user);
  });

  return (
    <CurrentYearProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="App">
          <nav className="nav">
            <div className="nav-container">
              <Link to="/" className="logo-link">
                <FaGlobeAfrica className="brand-icon" />
                <span className="logo-text">AU ASA</span>
              </Link>
              <ul className="header-icons-container">
                <li>
                  <Link to="/" className="nav-link">
                    <GoHomeFill className="nav-icon" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="nav-link">
                    <BsCalendarEventFill className="nav-icon" />
                    <span>Events</span>
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="nav-link">
                    <BiSolidPhotoAlbum className="nav-icon" />
                    <span>Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="nav-link">
                    <PiUsersFourFill className="nav-icon" />
                    <span>About</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/admin" element={<SignInAdmin />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="*" element={<NotFound />} />
              
              {isLogIn ? (
                <>
                  <Route path="/admin/changeevent" element={<AddEvent />} />
                  <Route path="/admin/changeOfficer" element={<AddOfficer />} />
                  <Route path="/admin/changeabout" element={<EditAbout />} />
                  <Route path="/admin/managelinks" element={<ManageLinks />} />
                </>
              ) : (
                <>
                  <Route path="/admin/changeevent" element={<SignInAdmin />} />
                  <Route path="/admin/changeOfficer" element={<SignInAdmin />} />
                  <Route path="/admin/changeabout" element={<SignInAdmin />} />
                  <Route path="/admin/managelinks" element={<SignInAdmin />} />
                </>
              )}
            </Routes>
          </main>

          <footer className="bottom">
            <div className="social-icons">
              <a
                href="https://www.instagram.com/au_asa_club/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com/au_asa_club/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaInstagram />
              </a>
            </div>
            <p className="copyright">&copy; 2024 African Student Association</p>
            <Link to="/admin" className="manage">
              Admin Manage
            </Link>
          </footer>
        </div>
      </BrowserRouter>
    </CurrentYearProvider>
  );
}

export default App;
