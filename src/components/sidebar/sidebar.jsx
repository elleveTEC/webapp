import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HistoryIcon from "@mui/icons-material/History";
import CalculateIcon from "@mui/icons-material/Calculate";
import "./sidebar.css";

export default function Sidebar() {
  const active = useSelector( state => state.pageIndicator.page );

  return (
    <div className="sidebar">
      <Link to="/">
        <CalculateIcon style={{ fontSize: 55, color: active == "calculate" ? "#003876": "gray", }} />
      </Link>
      <Link to="/history">
        <HistoryIcon style={{ fontSize: 55, color: active == "history" ? "#003876": "gray", }} />
      </Link>
    </div>
  );
}
