import React from "react";
import TopBar from "../../components/header/header.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import HistoryTable from "../../components/historyTable/historyTable.jsx";
import "./index.css";

export default function History() {
  const stories = [
    {
      id: "1509",
      task: "Task name",
      startDate: "03/05/2022",
      estimated: 3,
    },
    {
      id: "1509",
      task: "Task name",
      startDate: "03/05/2022",
      estimated: 3,
    },
    {
      id: "1509",
      task: "Task name",
      startDate: "03/05/2022",
      estimated: 3,
    },
  ];

  return (
    <>
      <TopBar />
      <Sidebar active="history"/>
      <div className="history">
        <h1>History</h1>
        <input type="text" id="search" name="search" placeholder="Search task by something" />
        <button className="new-prediction">+ New prediction</button>
        <HistoryTable stories={stories} />
      </div>
    </>
  );
}
