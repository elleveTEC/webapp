import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import  { toggle } from "../../features/opener/openerSlice";
import "./popup.css";

export default function Popup(props) {

  const message = useSelector(state => state.opener.message);
  const correct  = useSelector(state => state.opener.correct);

  const dispatch = useDispatch();

  const toggleModal = () => {
    dispatch(toggle());
  };

  useEffect(() => {
    const app = document.getElementsByClassName("App")[0];
    app.style.filter = "blur(5px)";
    return () => {
      app.style.filter = "";
    }
  },[])

  return (
    <div className="popup">
      <div className="popup-main">
        <img className="icon" src={correct ? "images/correct.png" : "images/error.png"} />
        <p className="result">{message}</p>
        <button className="ok" onClick={toggleModal}>Aceptar</button>
      </div>
    </div>
  );
}
