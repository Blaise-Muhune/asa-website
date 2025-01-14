import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Officer from "./Officer";
import { db } from "..";
import "./About.css";
import { CurrentYearContext } from '../context';
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";
import ImportantLinks from '../components/ImportantLinks';

function About() {
  const [officers, setOfficers] = useState([]);
  const [about, setAbout] = useState("");
  const { year, updateYear } = useContext(CurrentYearContext);
  const [isLogIn, setIsLogIn] = useState(null);
  const [isLoadingOfficers, setIsLoadingOfficers] = useState(true);
  const [isLoadingAbout, setIsLoadingAbout] = useState(true);
  const [availableYears, setAvailableYears] = useState([]);

  const auth = getAuth();

  useEffect(() => {
    const officerCollection = doc(db, year, "officers");
    getDoc(officerCollection)
      .then((doc) => {
        setOfficers(doc.data().officers);
        setIsLoadingOfficers(false);
      })
      .catch((e) => {
        console.log("error: ", e);
        setIsLoadingOfficers(false);
      });

    const aboutCollection = doc(db, year, "about");
    getDoc(aboutCollection)
      .then((doc) => {
        setAbout(doc.data().content);
        setIsLoadingAbout(false);
      })
      .catch((e) => {
        console.log("error: ", e);
        setIsLoadingAbout(false);
      });
  }, [year]);

  useEffect(() => {
    const fetchYears = async () => {
      try {
        const officersDoc = await getDoc(doc(db, year, "officers"));
        if (officersDoc.exists()) {
          const officersData = officersDoc.data().officers;
          // Get unique years from officers
          const years = [...new Set(officersData
            .map(officer => officer.year)
            .filter(year => year) // Remove any undefined/null values
          )].sort().reverse();
          
          setAvailableYears(years);
        }
      } catch (error) {
        console.error("Error fetching years:", error);
        setAvailableYears([]);
      }
    };
    
    if (isLogIn) {
      fetchYears();
    }
  }, [isLogIn, year]);

  // Update the officers data when year changes
  useEffect(() => {
    const officerCollection = doc(db, year, "officers");
    getDoc(officerCollection)
      .then((doc) => {
        if (doc.exists()) {
          // Filter officers by the selected year
          const allOfficers = doc.data().officers;
          const filteredOfficers = allOfficers.filter(
            officer => officer.year === year
          );
          setOfficers(filteredOfficers);
        }
        setIsLoadingOfficers(false);
      })
      .catch((e) => {
        console.log("error: ", e);
        setIsLoadingOfficers(false);
      });
  }, [year]);

  auth.onAuthStateChanged((user) => {
    setIsLogIn(!!user);
  });

  return (
    <div className="about-container">
      {isLogIn && (
        <div className="year-selector">
          <select 
            value={year} 
            onChange={(e) => {
              // You'll need to implement this context update function
              updateYear(e.target.value);
            }}
          >
            {availableYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="about-header">
        <h1 className="section-title">About Us</h1>
        <div className="decorative-line"></div>
      </div>

      <div className="about-content">
        <div className="about-paragraph">
          {isLoadingAbout ? (
            <p>Loading...</p>
          ) : (
            <>
              <p className="paragraph">{about}</p>
              {isLogIn && (
                <Link to="/admin/changeabout" className="edit-button">
                  <FaEdit /> Edit Content
                </Link>
              )}
            </>
          )}
        </div>
      </div>

      <ImportantLinks isLogIn={isLogIn} />

      <div className="officers-section">
        <div className="about-header">
          <h1 className="section-title">Our Officers ({year})</h1>
          <div className="decorative-line"></div>
        </div>

        <div className="officer-grid">
          {isLoadingOfficers ? (
            <p>Loading officers...</p>
          ) : (
            officers.map((officer, i) => <Officer key={i} {...officer} />)
          )}
        </div>

        {isLogIn && (
          <Link to="/admin/changeofficer" className="add-officer-button">
            <FaPlus /> Add New Officer
          </Link>
        )}
      </div>
    </div>
  );
}

export default About;
