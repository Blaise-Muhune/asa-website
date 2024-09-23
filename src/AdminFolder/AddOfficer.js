import React, { useContext, useState } from "react";
import "./Admin.css";
import { db } from "..";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { currentYear } from "../context";

function AddOfficer() {
  const [officerData, setOfficerData] = useState({
    fullname: "",
    role: "",
    bio: "",
    image: "",
    social: {
      facebook: "",
      twitter: "",
      instagram: "",
    },
  });

  const year = useContext(currentYear);

  const handleSubmit = (e) => {
    e.preventDefault();

    const myCollection = doc(db, year, "officers");
    const officerArray = [officerData];

    getDoc(myCollection)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(myCollection);
          updateDoc(myCollection, { officers: arrayUnion(officerData) }).catch(
            (e) => console.log(e)
          );
        } else {
          setDoc(myCollection, { officers: officerData }).catch((e) =>
            console.log(snapshot.size)
          );
          console.log(snapshot.exists());
        }
      })
      .catch((e) => {
        console.log(e);
      });

    alert(" Submitted");
  };

  const handleOfficerInputChange = (e) => {
    const { name, value } = e.target;
    setOfficerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmits = (e) => {
    e.preventDefault();

    alert(" Submitted");
    // Handle submission of officer and event data
    // console.log("Submitted officer data:", officerData);
    // console.log("Submitted event data:", eventData);
    // You can further process the data (e.g., send it to a backend server) here
  };
  return (
    <div className="admin-form">
      <h2>Add Officer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="fullname"
            value={officerData.fullname}
            onChange={handleOfficerInputChange}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            name="role"
            value={officerData.role}
            onChange={handleOfficerInputChange}
          />
        </label>
        <br />
        <label>
          Bio:
          <textarea
            name="bio"
            value={officerData.bio}
            onChange={handleOfficerInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={officerData.image}
            onChange={handleOfficerInputChange}
          />
        </label>
        <br />
        <label>
          Facebook:
          <input
            type="text"
            name="facebook"
            value={officerData.social.facebook}
            onChange={(e) =>
              setOfficerData((prevData) => ({
                ...prevData,
                social: { ...prevData.social, facebook: e.target.value },
              }))
            }
          />
        </label>
        <br />
        <label>
          Twitter:
          <input
            type="text"
            name="twitter"
            value={officerData.social.twitter}
            onChange={(e) =>
              setOfficerData((prevData) => ({
                ...prevData,
                social: { ...prevData.social, twitter: e.target.value },
              }))
            }
          />
        </label>
        <br />
        <label>
          Instagram:
          <input
            type="text"
            name="instagram"
            value={officerData.social.instagram}
            onChange={(e) =>
              setOfficerData((prevData) => ({
                ...prevData,
                social: { ...prevData.social, instagram: e.target.value },
              }))
            }
          />
        </label>
        <br />
        <button type="submit">Submit Officer</button>
      </form>
    </div>
  );
}

export default AddOfficer;
