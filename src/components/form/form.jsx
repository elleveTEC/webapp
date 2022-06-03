import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../../features/opener/openerSlice";

import "./form.css";

import Popup from "../popup/popup.jsx";

function getSQLDate(date) {
  var pad = function (num) {
    return ("00" + num).slice(-2);
  };
  var date = new Date();
  date =
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate()) +
    " " +
    pad(date.getUTCHours()) +
    ":" +
    pad(date.getUTCMinutes()) +
    ":" +
    pad(date.getUTCSeconds());
  return date;
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default function Form() {
  const [state, setState] = useState({
    UsuarioID: localStorage.getItem("UsuarioID"),
    Fecha_Calculo: getSQLDate(Date.now()),
    Fecha_Inicio: getSQLDate(Date.now()),
    Fecha_Fin: getSQLDate(Date.now()),
    Nombre_Actividad: "",
    Descripcion: "",
    Resumen: "",
    Dias: 0,
  });

  // const active = useSelector(state => state.opener.active);
  const dispatch = useDispatch();

  useEffect(() => {
    const myButton = document.getElementById("myButton");

    myButton.addEventListener("click", (e) => {
      // e.preventDefault();
    });
  }, []);

  useEffect(() => {
    const btn = document.getElementById("myButton");

    if (state.Resumen.length >= 10 && state.Descripcion.length >= 10) {
      btn.style.backgroundColor = "#3FA9F5";
      btn.disabled = false;
    } else {
      btn.style.backgroundColor = "";
      btn.disabled = true;
    }
  }, [state]);

  const toggleModal = () => {
    dispatch(toggle());
  };

  const handleName = (e) => {
    setState({
      ...state,
      Nombre_Actividad: e.target.value,
    });
  };

  const handleDate = (e) => {
    setState({
      ...state,
      Fecha_Inicio: e.target.value,
    });
  };

  const handleSummary = (e) => {
    setState({
      ...state,
      Resumen: e.target.value,
    });
  };

  const handleDescription = (e) => {
    setState({
      ...state,
      Descripcion: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postData("/createRecord", state);
  };

  return (
    <div className="form">
      <h1>Effort prediction</h1>
      <form className="main-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label htmlFor="story-name">Task name</label>
            <input
              type="text"
              id="story-name"
              name="story-name"
              onChange={handleName}
              placeholder="Name of the story"
            />
          </div>
          <div className="col">
            <label htmlFor="starting-date">Starting date</label>
            <input type="date" id="starting-date" name="starting-date" onChange={handleDate} />
          </div>
        </div>
        <label htmlFor="summary">User story summary</label>
        <textarea
          id="summary"
          type="text"
          name="summary"
          placeholder="Summary"
          onChange={handleSummary}
        />
        <label htmlFor="description">User story description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleDescription}
        />
        <input id="myButton" type="submit" value="Calculate" onClick={toggleModal} />
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}
