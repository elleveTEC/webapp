import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../../features/opener/openerSlice";
import * as tf from "@tensorflow/tfjs";

import "./form.css";

var modelo = null;
const dict = new Map();
const del_words = [
  "in",
  "the",
  "a",
  "to",
  "from",
  "be",
  "on",
  "an",
  "as",
  "of",
  "is",
  "it",
  "that",
  "this",
  "or",
  "and",
  "I",
  "he",
  "she",
  "they",
  "them",
  "us",
];

(async () => {
  console.log("Cargando modelo...");
  modelo = await tf.loadLayersModel("http://127.0.0.1:8080/model.json");
  console.log("Modelo cargado...");
})();

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

function top_words(tokens, words) {
  var valores = [];
  var conteos = [];
  for (var i = 0; i < tokens.length; i++) {
    if (valores.indexOf(tokens[i]) == -1) {
      valores.push(tokens[i]);
      conteos.push(1);
    } else {
      conteos[valores.indexOf(tokens[i])]++;
    }
  }
  var n_words = 0;
  if (tokens.length > words) {
    var aux = [];
    if (conteos.length >= words) {
      n_words = words;
    } else {
      n_words = conteos.length;
    }
    for (var i = 0; i < n_words; i++) {
      const max_cont = Math.max(...conteos);
      const max_index = conteos.indexOf(max_cont);
      aux.push(valores[max_index]);
      valores.splice(max_index, 1);
      conteos.splice(max_index, 1);
    }
    tokens = aux;
  }
  if (tokens.length < words) {
    const dif = words - tokens.length;
    for (var i = 0; i < dif; i++) {
      tokens.push(0);
    }
    return tokens;
  } else {
    return tokens;
  }
}

function processToken(text) {
  var token = [];
  const array = text.match(/\w+/g);
  for (var i = 0; i < del_words.length; i++) {
    while (array.includes(del_words[i])) {
      const idx = array.indexOf(del_words[i]);
      array.splice(idx, 1);
    }
  }
  for (var i = 0; i < array.length; i++) {
    if (!dict.has(array[i])) {
      dict.set(array[i], dict.size + 1);
    }
    token[i] = dict.get(array[i]);
  }
  return token;
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

  const handleClick = () => {
    async function makePredict() {
      const id = localStorage.getItem("UsuarioID");
      try {
        const response = await postData("/prediccion", {
          Sum: state.Resumen,
          Desc: state.Descripcion,
        });
        const prediccion = response.prediccion.prediccion;
        console.log(prediccion);
      } catch (error) {
        console.log(error);
      }
    }

    async function createRecord() {
      try {
        const respoonse = await postData("/createRecord", state);
      } catch (error) {
        console.error(error);
      }
    }

    dispatch(toggle());
    makePredict();
    createRecord();
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
      <form className="main-form">
        <div className="row-dual">
          <div className="col-dual">
            <label htmlFor="story-name">Task name</label>
            <input
              type="text"
              id="story-name"
              name="story-name"
              onChange={handleName}
              placeholder="Name of the story"
            />
          </div>
          <div className="col-dual">
            <label htmlFor="starting-date">Starting date</label>
            <input
              type="date"
              id="starting-date"
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
              type="text"
              name="summary"
              placeholder="Summary"
              onChange={handleSummary}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="description">User story description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              placeholder="Description"
              onChange={handleDescription}
            />
          </div>
        </div>
        <input id="myButton" type="submit" value="Calculate" onClick={handleClick} />
      </form>
    </div>
  );
}
