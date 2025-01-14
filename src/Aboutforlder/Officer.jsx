import React, { useContext, useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Officer.css";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "..";
import { CurrentYearContext } from "../context";

function Officer(props) {
  const { fullname, role, bio, image, social } = props;
  const [isLogIn, setIsLogIn] = useState(null);
  const { year } = useContext(CurrentYearContext);
  
  const defaultAvatar = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const auth = getAuth();

  function deleteThis(item) {
    const mycollection = doc(db, year, "officers");
    getDoc(mycollection)
      .then((e) => {
        let updatedArr = e.data().officers.filter((el) => el.fullname !== item.fullname);
        updateDoc(mycollection, { officers: updatedArr })
          .then(() => window.location.reload())
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }

  auth.onAuthStateChanged((user) => {
    setIsLogIn(!!user);
  });

  return (
    <div className="officer">
      <div className="officer-content">
        <div className="image-container">
          <img 
            src={image || defaultAvatar} 
            alt={fullname} 
            className="officer-image"
            onError={(e) => {
              e.target.src = defaultAvatar;
              e.target.onerror = null;
            }}
          />
        </div>
        <div className="officer-info">
          <div className="officer-header">
            <h3 className="officer-name">{fullname}</h3>
            <p className="officer-role">{role}</p>
          </div>
          <div className="officer-details">
            <p className="officer-bio">{bio}</p>
            <div className="officer-social">
              {social.facebook && (
                <a href={social.facebook} target="_blank" rel="noreferrer">
                  <FaFacebook className="social-icon" />
                </a>
              )}
              {social.twitter && (
                <a href={social.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter className="social-icon" />
                </a>
              )}
              {social.instagram && (
                <a href={social.instagram} target="_blank" rel="noreferrer">
                  <FaInstagram className="social-icon" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      {isLogIn && (
        <button className="delete-button" onClick={() => deleteThis(props)}>
          Delete
        </button>
      )}
    </div>
  );
}

export default Officer;

