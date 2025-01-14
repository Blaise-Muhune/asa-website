import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
import { FaCalendarPlus, FaUserPlus, FaFileAlt } from "react-icons/fa";

function Admin() {

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="decorative-line"></div>
      </div>

      <div className="admin-content">
        <div className="admin-cards">
          <Link to="/admin/changeevent" className="admin-card">
            <div className="card-icon">
              <FaCalendarPlus />
            </div>
            <div className="card-content">
              <h3>Manage Events</h3>
              <p>Add or modify upcoming events</p>
            </div>
          </Link>

          <Link to="/admin/changeofficer" className="admin-card">
            <div className="card-icon">
              <FaUserPlus />
            </div>
            <div className="card-content">
              <h3>Manage Officers</h3>
              <p>Update officer information</p>
            </div>
          </Link>

          <Link to="/admin/changeabout" className="admin-card">
            <div className="card-icon">
              <FaFileAlt />
            </div>
            <div className="card-content">
              <h3>About Content</h3>
              <p>Edit about page content</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin;
