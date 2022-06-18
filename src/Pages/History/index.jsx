import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pageIndicator/pageIndicatorSlice";
import Page from "../../components/page/page.jsx";
import HistoryTable from "../../components/historyTable/historyTable.jsx";
import "./index.css";

export default function History() {

  const dispatch = useDispatch();
  
  const [stories, setStories] = useState([]);
  const [res, setRes] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchStories() {
      const id = localStorage.getItem("UsuarioID");
      try {
        const response = await fetch(`/getRecordUser/${id}`);
        const data = await response.json();
        setRes(data);
        setStories(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStories();
    dispatch(setPage("history"));
  }, []);

  useEffect (() => {
    if (!res) return;
    setStories(
      res.filter((story) => story.Nombre_Actividad.toLowerCase().includes(search.toLowerCase()))
    );
  }, [res, search]);

  const onChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <Page>
      <div className="history">
        <h1>History</h1>
        <input type="text" id="search" name="search" placeholder="Search task by something" onChange={onChange} />
        <Link className="new-prediction" to="/">+ New prediction</Link>
        <HistoryTable stories={stories} />
      </div>
    </Page>
  );
}
