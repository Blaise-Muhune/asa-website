// Events.js
import React, { useContext, useEffect, useState } from "react";
import Event from "./Event";
import { getDoc, doc } from "firebase/firestore";
import { db } from "..";
import "./Events.css";
import { CurrentYearContext } from "../context";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLogIn, setIsLogIn] = useState(null);
  const { year } = useContext(CurrentYearContext);
  const auth = getAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events for year:", year); // Debug log
        const eventsRef = doc(db, year, "events");
        const eventsDoc = await getDoc(eventsRef);
        
        if (eventsDoc.exists()) {
          const eventsData = eventsDoc.data();
          console.log("Events data:", eventsData); // Debug log
          
          if (Array.isArray(eventsData.events)) {
            const sortedEvents = [...eventsData.events].reverse();
            setEvents(sortedEvents);
          } else {
            console.log("Events data is not an array:", eventsData.events);
            setEvents([]);
          }
        } else {
          console.log("No events document exists for year:", year);
          setEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      }
    };

    if (year) {
      fetchEvents();
    }
  }, [year]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLogIn(!!user);
    });
    
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="all-events">
      <div className="events">
        <h1>Our Events</h1>
        <div className="decorative-line"></div>
        <p>Check it out!</p>
        <div className="event-list">
          {events && events.length > 0 ? (
            events.map((event, index) => (
              <Event
                key={`${event.title}-${index}`}
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
                image={event.image}
              />
            ))
          ) : (
            <p>No events available at this time.</p>
          )}
        </div>
        {isLogIn && (
          <Link to="/admin/changeevent" className="add-officer-button">
            <FaPlus /> Add New Event
          </Link>
        )}
      </div>
    </div>
  );
}

export default Events;
