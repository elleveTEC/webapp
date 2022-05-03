import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profileButton.css";

export default function ProfileButton() {
  const [state, setState] = useState({
    active: false,
  });
  const initials = "CG";
  return (
    <>
      <div className="profile-button" onClick={() => setState({ active: !state.active })}>
        {/*<img src="/images/profile-icon.png" alt="profile icon" />*/}
        <p>{initials}</p>
      </div>
      {state.active ? (
        <div className="pop-up">
          {/*<img src="/images/profile-icon.png" alt="profile icon" />*/}
          <p className="initials">{initials}</p>
          <div className="data">
            <p className="name">Name Surname</p>
            <p className="email">user@cemex.com</p>
          </div>
          <Link to="/profile" className="button">Account settings</Link>
          <Link to="/login" className="button">Sign out</Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
