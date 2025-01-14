import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '..';
import { CurrentYearContext } from '../context';
import './Admin.css';

function ManageLinks() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: '', url: '' });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLink.title || !newLink.url) return;

    const updatedLinks = [...links, newLink];
    await setDoc(doc(db, year, "links"), { links: updatedLinks });
    setLinks(updatedLinks);
    setNewLink({ title: '', url: '' });
  };

  const handleDelete = async (indexToDelete) => {
    const updatedLinks = links.filter((_, index) => index !== indexToDelete);
    await setDoc(doc(db, year, "links"), { links: updatedLinks });
    setLinks(updatedLinks);
  };

  return (
    <div className="admin-container">
      <h2>Manage Important Links</h2>
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Link Title:</label>
          <input
            type="text"
            value={newLink.title}
            onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
            placeholder="e.g., Registration Form"
          />
        </div>
        
        <div className="form-group">
          <label>URL:</label>
          <input
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="https://..."
          />
        </div>

        <button type="submit" className="submit-button">Add Link</button>
      </form>

      <div className="links-list">
        <h3>Current Links:</h3>
        {links.map((link, index) => (
          <div key={index} className="link-item">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
            <button 
              onClick={() => handleDelete(index)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageLinks; 