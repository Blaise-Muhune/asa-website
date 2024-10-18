import React, { useContext, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Officer.css"; // Import the CSS file
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";
import { currentYear } from "../context";

function Officer(props) {
  const { fullname, role, bio, image, social } = props;
  const [isLogIn, setIsLogIn] = useState(null);
  const year = useContext(currentYear);
  // Define a function to toggle the expanded state of the component

  const auth = getAuth();

  function deleteThis(item) {
    const mycollection = doc(db, year, "officers");

    getDoc(mycollection)
      .then((e) => {
        let updatedArr = e.data().officers;
        updatedArr = updatedArr.filter((el) => {
          if (el == item) {
            // console.log("this works");
          }
          return el.fullname != item.fullname;
        });

        updateDoc(mycollection, { officers: updatedArr })
          .then((e) => {
            // console.log("succes");
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

    window.location.reload();
  }

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLogIn(true);
      // console.log("true");
    } else {
      setIsLogIn(false);
      // console.log("false");
    }
  });

  return (
    <div className="officer">
      <div className="image-container">
        <img src={image} alt={fullname} className="officer-image" />
      </div>
      <div className="officer-info">
        <h3 className="officer-name">{fullname}</h3>
        <p className="officer-role">{role}</p>
        <p className="officer-bio">{bio}</p>
        <div className="officer-social">
          <a href={social.instagram} target="_blank" rel="noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
      {isLogIn ? (
        <div
          onClick={() => deleteThis(props)}
          style={{ cursor: "pointer", color: "red" }}
        >
          delete
        </div>
      ) : null}
    </div>
  );
}

export default Officer;
