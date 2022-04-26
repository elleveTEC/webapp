import { React, useState, useEffect } from "react";
import "./form.css";

import Popup from "../popup/popup.jsx";

export default function Form() {
  useEffect(() => {
    const myButton = document.getElementById("myButton");

    myButton.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }, []);

  const [state, setState] = useState({
    active: false,
    summaryLength: 0,
    descriptionLength: 0,
  });

  const toggleModal = () => {
    setState((state) => ({
      ...state, active: !state.active, 
    }));
  };

  const handleChange = (e) => {
    const content = e.target.value;
    const value = `${e.target.name}Length`; 

    setState({
      ...state, [value]: content.length,
    });

    const btn = document.getElementById("myButton");
    if (state.summaryLength >= 10 && state.descriptionLength >= 10) {
      btn.style.backgroundColor = "#3FA9F5";
    }
    else {
      btn.style.backgroundColor = "";
    }
  }

  return (
    <div className="form">
      <h1>Calculo de esfuerzo</h1>
      <form className="main-form" action="">
        <label htmlFor="summary">Resumen de historia de usuario</label>
        <input id="summary" type="text" name="summary" onChange={handleChange}/>
        <label htmlFor="description">Descripcion de historia de usuario</label>
        <input id="description" type="text" name="description" onChange={handleChange}/>
        <input id="myButton" type="submit" value="Calcular esfuerzo" onClick={toggleModal} />
      </form>
      {state.active ? <Popup correct={true} toggleModal={toggleModal} /> : ""}
    </div>
  );
}
