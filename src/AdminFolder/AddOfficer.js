import React, { useContext, useState } from "react";
import "./Admin.css";
import { db } from "..";
import {
  setDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { CurrentYearContext } from "../context";
import { useNavigate } from 'react-router-dom';


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

  const navigate = useNavigate();

  const { year } = useContext(CurrentYearContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const officerDataWithYear = {
      ...officerData,
      year: year
    };

    const myCollection = doc(db, year, "officers");

    getDoc(myCollection)
      .then((snapshot) => {
        if (snapshot.exists()) {
          updateDoc(myCollection, { officers: arrayUnion(officerDataWithYear) }).catch(
            (e) => console.log(e)
          );
        } else {
          setDoc(myCollection, { officers: officerDataWithYear }).catch((e) =>
            console.log(snapshot.size)
          );
          console.log(snapshot.exists());
        }
      })
      .catch((e) => {
        console.log(e);
      });

      navigate('/about');
    // alert(" Submitted");
  };

  const handleOfficerInputChange = (e) => {
    const { name, value } = e.target;
    setOfficerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
