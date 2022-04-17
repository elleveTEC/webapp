import React from "react";
import "./popup.css";

export default function Popup(props) {
  const { correct, toggleModal } = props;
  
  return (
    <div className="popup">
      <div className="popup-main">
        <img className="icon" src={correct ? "images/correct.png" : "images/error.png"} />
        <p className="result">Some result</p>
        <button className="ok" onClick={toggleModal}>Aceptar</button>
      </div>
    </div>
  );
}
