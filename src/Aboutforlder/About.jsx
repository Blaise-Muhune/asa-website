import React, { useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";
import { FirebaseApp } from "firebase/app";
// import officers from "./officers.json";
import Officer from "./Officer";
import { db } from "..";
import "./About.css";
import { currentYear } from "../context";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
function About() {
  const [officers, setOfficers] = useState([]);
  const [about, setAbout] = useState("");
  const year = useContext(currentYear);
  const [isLogIn, setIsLogIn] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    // console.log(year);
    const officerCollection = doc(db, "23-24", "officers");
    getDoc(officerCollection)
      .then((doc) => {
        // console.log(doc.data());
        setOfficers(doc.data().officers);
      })
      .catch((e) => {
        console.log("error: ", e);
      });

    const aboutCollection = doc(db, year, "about");
    getDoc(aboutCollection)
      .then((doc) => {
        console.log(doc.data());
        setAbout(doc.data().content);
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }, []);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLogIn(true);
      // console.log("true");
    } else {
      setIsLogIn(false);
      console.log("false");
    }
  });

  return (
    <div className="about">
      <h1>About Us</h1>
      <div className="about-paragraph">
        <p className="paragraph">{about} </p>
        {isLogIn ? (
          <div className="add-officer">
            <Link to="/admin/changeabout">edit...</Link>
          </div>
        ) : null}
      </div>
      <h1>Our Officers (2023-2024)</h1>
      <div className="officer-list">
        {officers.map((officer, i) => (
          <div key={i}>
            <Officer {...officer} />
          </div>
        ))}
        {isLogIn ? (
          <div className="add-officer">
            <Link to="/admin/changeofficer">Add+</Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default About;
