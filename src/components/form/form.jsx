import React from "react";
import "./form.css";

export default function Form() {
  return (
    <div className="form">
      <h1>Calculo de esfuerzo</h1>
      <form className="main-form" action="" method="POST">
        <label for="summary">Resumen de historia de usuario</label>
        <input id="summary" type="text" name="summary" />
        <label for="description">Descripcion de historia de usuario</label>
        <input id="description" type="text" name="description" />
        <input type="submit" value="Calcular esfuerzo" />
      </form>
    </div>
  );
}
