import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import MaterialIcon from "material-icons-react";
import "./sidebar.css";

export default function Sidebar() {

  const active = useSelector( state => state.pageIndicator.page );

  return (
    <div className="sidebar">
      <Link to="/">
        <MaterialIcon icon="calculate" size="large" color={ active == "calculate" ? "#003876" : ""}/>
      </Link>
      <Link to="/history">
        <MaterialIcon icon="history" size="large" color={ active == "history" ? "#003876" : ""}/>
      </Link>
    </div>
  );
}
