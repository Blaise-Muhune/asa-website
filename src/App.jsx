// App.js
import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Homefolder/Home";
import About from "./Aboutforlder/About";
import Events from "./Eventfolder/Events";
// import Admin from "./AdminFolder/Admin";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { BsCalendarEventFill } from "react-icons/bs";
import { PiUsersFourFill } from "react-icons/pi";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import "./App.css";
import AddEvent from "./AdminFolder/AddEvent";
import AddOfficer from "./AdminFolder/AddOfficer";
import EditAbout from "./AdminFolder/EditAbout";
import Gallery from "./Gallery/Gallery";
import SignInAdmin from "./AdminFolder/SignInAdmin";
import NotFound from "./NotFound";
import { getAuth } from "firebase/auth";
import { currentYear } from "./context";
import ScrollToTop from "./ScrollTotop";

function App() {
  const [isLogIn, setIsLogIn] = useState(null);
  const [defaultYear, setDefaultYear] = useState(null);

  const auth = getAuth();
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLogIn(true);
      // console.log("true");
    } else {
      setIsLogIn(false);
      // console.log("false");
    }
  });
  // function handleNav(){
  // if(navLink = '/'){
  //   const current = document.getElementById('home');
  //   current.classList.add('active-nav')
  //   //to continue
  // }
  // };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* <currentYear.Provider value={currentYear}> */}
      <div className="App">
        <nav className="nav">
          <ul className="header-icons-container">
            <li id="home">
              <Link to="/">
                <GoHomeFill />
                <span>Home</span>
              </Link>
            </li>
            <li id="events">
              <Link to="/events">
                <BsCalendarEventFill />
                <span>Events</span>
              </Link>
            </li>
            <li id="gallery">
              <Link to="/gallery">
                <BiSolidPhotoAlbum />
                <span>Gallery</span>
              </Link>
            </li>
            <li id="about">
              <Link to="/about">
                <PiUsersFourFill />
                <span>About</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<SignInAdmin />} />
            {/* <Route path="/signin" element={<SignInAdmin />} /> */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="*" element={<NotFound />} />
            {isLogIn ? (
              <>
                <Route path="/admin/changeevent" element={<AddEvent />} />
                <Route path="/admin/changeOfficer" element={<AddOfficer />} />
                <Route path="/admin/changeabout" element={<EditAbout />} />
              </>
            ) : (
              <>
                <Route path="/admin/changeevent" element={<SignInAdmin />} />
                <Route path="/admin/changeOfficer" element={<SignInAdmin />} />
                <Route path="/admin/changeabout" element={<SignInAdmin />} />
              </>
            )}
          </Routes>
        </div>
        <div className="bottom">
          <div className="social-icons">
            <a
              href="https://www.instagram.com/au_asa_club/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/au_asa_club/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
          <p>&copy; 2024 African Student Association</p>
          <div className="manage">
            <Link className="manage" to="/admin">
              Admin Manage
            </Link>
          </div>
        </div>
      </div>
      {/* </currentYear.Provider> */}
    </BrowserRouter>
  );
}

export default App;
