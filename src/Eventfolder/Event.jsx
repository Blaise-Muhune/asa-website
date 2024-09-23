// Event.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import "./Event.css";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";
import { currentYear } from "../context";

function Event(props) {
  const [isLogIn, setIsLogIn] = useState(null);
  const year = useContext(currentYear);
  // Define a function to toggle the expanded state of the component

  const auth = getAuth();

  function deleteThis(item) {
    const mycollection = doc(db, year, "events");

    getDoc(mycollection)
      .then((e) => {
        let updatedArr = e.data().events;
        // console.log(updatedArr);
        // console.log(item);
        updatedArr = updatedArr.filter((el) => el.title != item.title);

        console.log(updatedArr);

        updateDoc(mycollection, { events: updatedArr })
          .then((e) => {
            console.log("succes");
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

    window.location.reload();
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLogIn(true);
      console.log("true");
    } else {
      setIsLogIn(false);
      console.log("false");
    }
  });

  // Return the JSX for the component
  return (
    <div className="event">
      <h3>{props.title}</h3>
      <div className="date-location">
        <p>{props.location}</p>
        <p>{props.date}</p>
      </div>

      <div className="details">
        <img src={props.image} alt={props.title} />
        <p>{props.description}</p>
        {isLogIn ? (
          <div
            onClick={() => deleteThis(props)}
            style={{ cursor: "pointer", color: "red" }}
          >
            delete
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Event;
