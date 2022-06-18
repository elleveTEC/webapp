import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle, setChildren } from "../../features/opener/openerSlice";
import CircularProgress from "@mui/material/CircularProgress";

import "./form.css";

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function SQLDateToDate(sqlDate) {
  var dateParts = sqlDate.split("-");
  var jsDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
  return jsDate;
}

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
  } finally {
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
    const btn = document.getElementById("myButton");

    if (state.Resumen.length >= 10 && state.Descripcion.length >= 10) {
      btn.style.backgroundColor = "#3FA9F5";
      btn.disabled = false;
    } else {
      btn.style.backgroundColor = "";
      btn.disabled = true;
    }
  }, [state]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let correct = true;
    let message = "";
    var popupChildren = (
      <div className="popup-main">
        <CircularProgress className="icon" />
        <p className="result">Calculating ...</p>
      </div>
    );

    dispatch(toggle());
    dispatch(setChildren(popupChildren));

    var prediction = null;

    async function makePredict() {
      const id = localStorage.getItem("UsuarioID");
      try {
        const response = await postData("/prediccion", {
          Sum: state.Resumen,
          Desc: state.Descripcion,
        });
        prediction = response.prediccion.prediccion;
        console.log(prediction);
        message = "Estimated time: " + prediction + " days";
        setState({
          ...state,
          Fecha_Fin: SQLDateToDate(state.Fecha_Inicio).addDays(prediction),
          Dias: prediction,
        });
      } catch (error) {
        console.error(error);
        correct = false;
        message = error.toString();
      }
    }

    async function createRecord() {
      try {
        const respoonse = await postData("/createRecord", {
          ...state,
          Fecha_Fin: SQLDateToDate(state.Fecha_Inicio).addDays(prediction),
          Dias: prediction,
        });
      } catch (error) {
        console.error(error);
        correct = false;
        message = error.toString();
      }
    }

    await makePredict();
    await createRecord();

    popupChildren = (
      <div className="popup-main">
        <img className="icon" src={correct ? "images/correct.png" : "images/error.png"} />
        <p className="result">{message}</p>
        <button className="ok" onClick={() => dispatch(toggle())}>
          Aceptar
        </button>
      </div>
    );

    dispatch(setChildren(popupChildren));
    const fields = document.querySelectorAll(".field");
    fields.forEach((field) => (field.value = ""));
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

  return (
    <div className="form">
      <h1>Effort prediction</h1>
      <form className="main-form" onSubmit={onSubmit}>
        <div className="row-dual">
          <div className="col-dual">
            <label htmlFor="story-name">Task name</label>
            <input
              type="text"
              id="story-name"
              className="field"
              name="story-name"
              onChange={handleName}
              placeholder="Name of the story"
              required
            />
          </div>
          <div className="col-dual">
            <label htmlFor="starting-date">Starting date</label>
            <input
              type="date"
              id="starting-date"
              className="field"
              name="starting-date"
              onChange={handleDate}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="summary">User story summary</label>
            <textarea
              id="summary"
              className="field"
              type="text"
              name="summary"
              placeholder="Summary"
              onChange={handleSummary}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="description">User story description</label>
            <textarea
              id="description"
              className="field"
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleDescription}
              required
            />
          </div>
        </div>
        <input id="myButton" type="submit" value="Calculate" />
      </form>
    </div>
  );
}
