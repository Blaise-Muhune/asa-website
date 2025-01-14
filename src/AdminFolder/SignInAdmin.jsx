import React, { useEffect, useState, useMemo } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider } from "..";
import Admin from "./Admin";
import "./signInAdmin.css";
import { FaGoogle, FaSignOutAlt, FaInfoCircle } from "react-icons/fa";

export default function SignInAdmin() {
  const [signedIn, setSignedIn] = useState(false);
  const adminEmail = useMemo(() => ["blaisemu007@gmail.com", "asa3.au@gmail.com"], []);
  const selectedYear = "no year selected refresh page";

  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (adminEmail.includes(user.email)) {
          setSignedIn(true);
        } else {
          auth.signOut();
          setSignedIn(false);
        }
      } else {
        setSignedIn(false);
        auth.signOut();
      }
    });
  }, [auth, adminEmail]);

  function signIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (adminEmail.includes(user.email)) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          localStorage.setItem(token, user.email);
          setSignedIn(true);
        } else {
          auth.signOut();
          alert("You are not an admin. Please sign in with an admin account.");
          provider.setCustomParameters({ prompt: "select_account" });
        }
      })
      .catch((error) => {
        console.log(error.message);
        setSignedIn(false);
      });
  }

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setSignedIn(false);
      })
      .catch((error) => {
        console.error("Failed to logout:", error);
      });
  };

  return (
    <div className="admin-login-container">
      <div className="admin-info-card">
        <div className="info-header">
          <FaInfoCircle className="info-icon" />
          <h2>Admin Information</h2>
        </div>
        <div className="info-content">
          <p>
            As an authenticated admin, you will have access to:
            <ul>
              <li>Edit and manage website content</li>
              <li>Add or remove officer information</li>
              <li>Manage events and announcements</li>
            </ul>
          </p>
        </div>
      </div>

      {signedIn ? (
        <div className="admin-logged-container">
          <Admin year={selectedYear} />
          <button className="admin-button logout" onClick={logout}>
            <FaSignOutAlt className="button-icon" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <div className="admin-signin-container">
          <div className="signin-content">
            <h1 className="signin-heading">Admin Access</h1>
            <div className="decorative-line"></div>
            <button className="admin-button signin" onClick={signIn}>
              <FaGoogle className="button-icon" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
