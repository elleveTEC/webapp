import React from "react";
import MainForm from "../../components/form/form.jsx";
import TopBar from "../../components/header/header.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";

export default function Form() {
  return (
    <div>
      <TopBar />
      <Sidebar />
      <MainForm />
    </div>
  );
}
