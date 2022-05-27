import React from "react";
import TopBar from "../../components/header/header.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import "./index.css";

export default function Profile() {
  return (
    <div>
      <TopBar />
      <Sidebar active="" />
      <div className="profile">
        <h1>Your account</h1>
        <div className="container">
          <div className="field">
            <h2>Name</h2>
            <p>Name Surname</p>
          </div>
          <div className="field">
            <h2>Mail</h2>
            <p>mail@cemex.com</p>
          </div>
          <div className="field">
            <h2>Job title</h2>
            <p>Job title</p>
          </div>
          <div className="gray-line"></div>
          <div className="password-container">
            <h2>Password</h2>
            <div className="password">*****</div>
            <button>Change password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
