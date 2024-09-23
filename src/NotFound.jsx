import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <h1 style={{ padding: "200px", backgroundColor: "black" }}>
      Page Does not Exist... Go to
      <h2
        style={{ cursor: "pointer" }}
        type="button"
        onClick={() => handleClick()}
      >
        Home page
      </h2>
    </h1>
  );
}
