import React, { useState, useEffect } from "react";
import TopBar from "../../components/header/header.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import HistoryTable from "../../components/historyTable/historyTable.jsx";
import "./index.css";

export default function History() {

  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      const id = localStorage.getItem("UsuarioID");
      try {
        const response = await fetch(`/getRecordUser/${id}`);
        const data = await response.json();
        console.log(data);
        setStories(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStories();
  }, []);

  return (
    <>
      <TopBar />
      <Sidebar active="history" />
      <div className="history">
        <h1>History</h1>
        <input type="text" id="search" name="search" placeholder="Search task by something" />
        <button className="new-prediction">+ New prediction</button>
        <HistoryTable stories={stories} />
      </div>
    </>
  );
}
