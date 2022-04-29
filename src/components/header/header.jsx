import React from "react";
import ProfileButton from "./profileButton/profileButton.jsx";
import "./header.css";

export default function TopBar() {
  return (
    <div className="header">
      <img className="logo" src="/images/CEMEXlogo.png" />
      <ProfileButton />
      <div className="red-line"></div>
    </div>
  );
}
