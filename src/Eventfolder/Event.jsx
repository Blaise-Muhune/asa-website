// Event.js
import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";
import { CurrentYearContext } from "../context";
import { FaTrash, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import "./Event.css";

function Event(props) {
  const [isLogIn, setIsLogIn] = useState(null);
  const { year } = useContext(CurrentYearContext);
  const auth = getAuth();

  function deleteThis(item) {
    const mycollection = doc(db, year, "events");
    getDoc(mycollection)
      .then((e) => {
        let updatedArr = e.data().events;
        updatedArr = updatedArr.filter((el) => el.title !== item.title);
        updateDoc(mycollection, { events: updatedArr })
          .then(() => window.location.reload())
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  auth.onAuthStateChanged((user) => {
    setIsLogIn(!!user);
  });

  return (
    <div className="event">
      <div className="event-content">
        <h3 className="event-title">{props.title}</h3>
        
        <div className="event-meta">
          <div className="meta-item">
            <FaCalendar className="meta-icon" />
            <span>{props.date}</span>
          </div>
          <div className="meta-item">
            <FaMapMarkerAlt className="meta-icon" />
            <span>{props.location}</span>
          </div>
        </div>

        <div className="event-details">
          {props.image && (
            <div className="event-image-container">
              <img src={props.image} alt={props.title} className="event-image" />
            </div>
          )}
          <p className="event-description">{props.description}</p>
        </div>

        {isLogIn && (
          <button className="delete-button" onClick={() => deleteThis(props)}>
            <FaTrash className="delete-icon" />
            <span>Delete Event</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Event;
