import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import  { toggle } from "../../features/opener/openerSlice";

import "./form.css";

import Popup from "../popup/popup.jsx";

export default function Form() {

  const [state, setState] = useState({
    summaryLength: 0,
    descriptionLength: 0,
  });

  // const active = useSelector(state => state.opener.active);
  const dispatch = useDispatch();

  useEffect(() => {
    const myButton = document.getElementById("myButton");

    myButton.addEventListener("click", (e) => {
      e.preventDefault();
    });
  }, []);

  useEffect(() => {
    const btn = document.getElementById("myButton");

    if (state.summaryLength >= 10 && state.descriptionLength >= 10) {
      btn.style.backgroundColor = "#3FA9F5";
      btn.disabled = false;
    }
    else {
      btn.style.backgroundColor = "";
      btn.disabled = true;
    }
  }, [state]);

  const toggleModal = () => {
    dispatch(toggle());
  };

  const handleChange = (e) => {
    const content = e.target.value;
    const textarea = `${e.target.name}Length`; 

    setState({
      ...state, [textarea]: content.length,
    });
  }

  return (
    <div className="form">
      <h1>Effort Estimation Calculation</h1>
      <form className="main-form" action="">
        <label htmlFor="summary">User story summary</label>
        <textarea id="summary" type="text" name="summary" placeholder="Summary" onChange={handleChange}/>
        <label htmlFor="description">User story description</label>
        <textarea id="description" type="text" name="description" placeholder="Description" onChange={handleChange}/>
        <input id="myButton" type="submit" value="Calculate" onClick={toggleModal} />
      </form>
    </div>
  );
}
