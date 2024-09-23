// Events.js
import React, { useContext, useEffect, useState } from "react";
import Event from "./Event";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "..";
import "./Events.css";
import { currentYear } from "../context";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLogIn, setIsLogIn] = useState(null);

  const year = useContext(currentYear);

  const auth = getAuth();

  useEffect(() => {
    const myCollection = doc(db, year, "events");
    getDoc(myCollection).then((doc) => {
      setEvents(doc.data().events.reverse());
      console.log(doc.data());
    });
  }, []);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLogIn(true);
      console.log("true");
    } else {
      setIsLogIn(false);
      console.log("false");
    }
  });
  // Return the JSX for the page
  return (
    <div className="all-events">
      <div className="events">
        <h1>Our Events</h1>
        <p>Check it out !</p>
        <div className="event-list">
          {events.map((event) => (
            <div key={event.image}>
              <Event
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
                image={event.image}
              />
            </div>
          ))}
          {isLogIn ? (
            <div className="add-event">
              <Link to="/admin/changeevent">Add+</Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Events;
