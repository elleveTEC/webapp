import React from "react";
import { useDispatch } from "react-redux";
import  { toggle } from "../../features/opener/openerSlice";
import "./popup.css";

export default function Popup(props) {
  const { correct } = props;

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(toggle());
  };

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
