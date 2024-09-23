import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { db, provider } from "..";
import Admin from "./Admin";

import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import "./signInAdmin.css";

export default function SignInAdmin() {
  const [signedIn, setSignedIn] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const adminEmail = ["blaisemu007@gmail.com", "asa3.au@gmail.com"];
  const [selectedYear, setSelectedYear] = useState(
    "no year selected refresh page"
  );

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (adminEmail.includes(user.email)) {
          setSignedIn(true);
          console.log("true");
        } else {
          auth.signOut();
          setSignedIn(false);
          console.log("false");
        }
      } else {
        setSignedIn(false);
        console.log("false");
        auth.signOut();
      }
    });
  }, [auth]);

  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (adminEmail.includes(user.email)) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          localStorage.setItem(token, user.email);
          console.log(user.email);
          setSignedIn(true);
        } else {
          auth.signOut();
          alert("You are not an admin. Please sign in with an admin account.");
          // signIn();
          // Prompt for sign-in again
          provider.setCustomParameters({ prompt: "select_account" });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        setSignedIn(false);
        // ...
      });
  }

  let logout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("success");
        setSignedIn(false);
      })
      .catch((error) => {
        console.error("fail");
      });
    setShowAdmin(false);
  };

  return (
    <div className="log-container">
      <div className="info-for-admin">
        Info: once you are logged in with an admin email, you can be able to
        <br></br>
        edit information on this app, such as adding and deleting, you can
        <br></br>
        directly add info here or go to the page where you want to edit then you
        <br></br>
        will see appropriete button to do the action you want to do.
      </div>
      {signedIn ? (
        <div className="loggedInContainer">
          <Admin year={selectedYear} />
          <button className="button-log" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="signInContainer">
          <h1 className="heading">Sign In:</h1>
          <button className="button-log" onClick={signIn} type="button">
            Sign Inn
          </button>
        </div>
      )}
    </div>
  );
}
