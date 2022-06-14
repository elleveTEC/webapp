import React from "react";
import { setPage } from "../../features/pageIndicator/pageIndicatorSlice";
import TopBar from "../header/header.jsx";
import SideBar from "../sidebar/sidebar.jsx";
import "./page.css";

export default function Page(props) {
  return (
    <div className="page">
      <TopBar />
      <SideBar />
      <div className="main-content">{props.children}</div>
    </div>
  );
}
