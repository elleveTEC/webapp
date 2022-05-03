import React from "react";
import MaterialIcon, {colorPalette} from 'material-icons-react';
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <MaterialIcon icon="calculate" size="large"/>
      <MaterialIcon icon="history" size="large"/>
    </div>
  );
}
