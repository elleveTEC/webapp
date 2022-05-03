import React, { useState, useEffect } from "react";
import MaterialIcon, { colorPalette } from "material-icons-react";
import "./sidebar.css";

export default function Sidebar(props) {
  const { active } = props;

  return (
    <div className="sidebar">
      <a href="/">
        <MaterialIcon icon="calculate" size="large" color={ active == "calculate" ? "#003876" : ""}/>
      </a>
      <a href="/login">
        <MaterialIcon icon="history" size="large" color={ active == "history" ? "#003876" : ""}/>
      </a>
    </div>
  );
}
