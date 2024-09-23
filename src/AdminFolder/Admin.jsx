import React, { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Admin.css";
import { Link } from "react-router-dom";
function Admin() {
  const [isLogOut, setIsLogOut] = useState(null);

  return (
    <div className="">
      <nav className="admin-form">
        <ul>
          <li className="button-admin" id="changeEvent">
            <Link to="/admin/changeevent">Add event</Link>
          </li>
          <li className="button-admin" id="changeOfficer">
            <Link to="/admin/changeofficer">add Officer</Link>
          </li>
          <li className="button-admin" id="changeabout">
            <Link to="/admin/changeabout">change About</Link>
          </li>
        </ul>
      </nav>

      <div className="content-admin"></div>
    </div>
  );
}

export default Admin;
