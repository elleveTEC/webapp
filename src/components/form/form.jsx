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
  });

  const toggleModal = () => {
    setState((state) => ({
      active: !state.active,
    }));
  };

  return (
    <div className="form">
      <h1>Calculo de esfuerzo</h1>
      <form className="main-form" action="">
        <label for="summary">Resumen de historia de usuario</label>
        <input id="summary" type="text" name="summary" />
        <label for="description">Descripcion de historia de usuario</label>
        <input id="description" type="text" name="description" />
        <input id="myButton" type="submit" value="Calcular esfuerzo" onClick={toggleModal} />
      </form>
      {state.active ? <Popup /> : ""}
    </div>
  );
}
