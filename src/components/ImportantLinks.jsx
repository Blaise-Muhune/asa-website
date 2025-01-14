import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '..';
import { CurrentYearContext } from '../context';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import './ImportantLinks.css';

function ImportantLinks({ isLogIn }) {
  const [links, setLinks] = useState([]);
  const { year } = useContext(CurrentYearContext);

  useEffect(() => {
    const fetchLinks = async () => {
      const linksDoc = await getDoc(doc(db, year, "links"));
      if (linksDoc.exists()) {
        setLinks(linksDoc.data().links || []);
      }
    };
    fetchLinks();
  }, [year]);

  if (links.length === 0 && !isLogIn) return null;

  return (
    <div className="important-links">
      <h2>Important Links</h2>
      <div className="links-container">
        {links.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-button"
          >
            {link.title}
          </a>
        ))}
      </div>
      {isLogIn && (
        <Link to="/admin/managelinks" className="edit-button">
          <FaEdit /> Manage Links
        </Link>
      )}
    </div>
  );
}

export default ImportantLinks; 