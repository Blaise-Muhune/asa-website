import React, { useContext, useState } from "react";
import "./Admin.css";
import { db } from "..";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { currentYear } from "../context";

function AddEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    image: "",
  });

  const year = useContext(currentYear);

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const myCollection = doc(db, year, "events");
    // updateDoc(myCollection, { events: arrayUnion(eventData) });

    alert(" Submitted");

    getDoc(myCollection)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.data());
          updateDoc(myCollection, { events: arrayUnion(eventData) }).catch(
            (e) => console.log(e)
          );
        } else {
          setDoc(myCollection, { events: eventData })
            .then((e) => console.log(e))
            .catch((e) => console.log(e));
          console.log(snapshot.exists());
        }
      })
      .catch((e) => {
        console.log(e);
      });

    clearInput(e);
  };

  function clearInput() {}
  return (
    <div className="admin-form">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleEventInputChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleEventInputChange}
          />
        </label>
        <br />
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleEventInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleEventInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            placeholder="find images on the club unsplash then pass the image url here else find another link"
            type="text"
            name="image"
            value={eventData.image}
            onChange={handleEventInputChange}
          />
          <a
            href="https://unsplash.com/@au_asa"
            target="_blank"
            rel="noopener noreferrer"
          >
            ASA unsplash
          </a>
        </label>
        <br />
        <button type="submit">Submit Event</button>
      </form>
    </div>
  );
}

export default AddEvent;
