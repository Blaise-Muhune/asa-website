import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, rgba(139, 69, 19, 0.1), rgba(218, 165, 32, 0.05))"
  },
  content: {
    textAlign: "center",
    padding: "40px",
    borderRadius: "12px",
    background: "linear-gradient(to right, #8B4513, #A0522D)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    border: "2px solid #DAA520"
  },
  title: {
    fontSize: "6rem",
    color: "#FFF5E1",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)"
  },
  message: {
    fontSize: "1.5rem",
    color: "#FFF5E1",
    marginBottom: "30px"
  },
  button: {
    padding: "12px 24px",
    fontSize: "1.1rem",
    background: "transparent",
    color: "#DAA520",
    border: "2px solid #DAA520",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "#DAA520",
      color: "#FFF5E1",
      transform: "translateY(-2px)"
    }
  }
};

export default function NotFound() {
  const navigate = useNavigate();
  
  function handleClick() {
    navigate("/");
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>Page Does Not Exist</p>
        <button 
          style={{...styles.button, 
            "&:hover": undefined,
            ":hover": {
              background: "#DAA520",
              color: "#FFF5E1",
              transform: "translateY(-2px)"
            }
          }}
          onClick={handleClick}
        >
          Return to Home Page
        </button>
      </div>
    </div>
  );
}
