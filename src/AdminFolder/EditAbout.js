import React, { useContext, useState } from "react";
import "./Admin.css";
import { db } from "..";
import { collection, addDoc, setDoc, getDocs, doc } from "firebase/firestore";
import { currentYear } from "../context";

function EditAbout() {
  const [content, setContent] = useState("");

  const handleOfficerInputChange = (e) => {
    console.log(e.target.value);
    setContent(e.target.value);
  };

  const year = useContext(currentYear);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myCollection = collection(db, year);
    setDoc(doc(myCollection, "about"), { content })
      .then((e) => {
        console.log("sucess");
      })
      .catch((e) => {
        console.log(e);
      });
    // getDocs(collection(db, "pastEvents")).then((e) => {
    //   e.forEach((doc) => {
    //     console.log(doc.data());
    //     setPastEvents(doc.data().events);
    //   });
    // });

    alert(" Submitted");
    // Handle submission of officer and event data
    console.log("Submitted About data:", content);
    // You can further process the data (e.g., send it to a backend server) here
  };
  return (
    <div className="admin-form">
      <form onSubmit={handleSubmit}>
        <label>
          About:
          <textarea
            name="about"
            // value={about}
            onChange={handleOfficerInputChange}
          />
        </label>

        <br />
        <button type="submit">Submit About</button>
      </form>
    </div>
  );
}

export default EditAbout;
