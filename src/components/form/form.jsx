import { React, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "../../features/opener/openerSlice";

import "./form.css";

import Popup from "../popup/popup.jsx";

import * as tf from "@tensorflow/tfjs";

var modelo = null;
const dict = new Map();
const del_words = ['in', 'the', 'a','to', 'from', 'be', 'on', 'an', 'as', 'of', 'is', 'it', 'that', 'this', 'or', 'and', 'I', 'he', 'she', 'they', 'them', 'us'];

(async () => {
  console.log("Cargando modelo...");
  modelo = await tf.loadLayersModel("http://127.0.0.1:8080/model.json");
  console.log("Modelo cargado...");
})();

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
      function processToken(text){
        var token = [];
        const array = text.match(/\w+/g);
        for(var i = 0; i < del_words.length; i++){
          while (array.includes(del_words[i])){
            const idx = array.indexOf(del_words[i]);
            array.splice(idx,1);
          }
        }
        for(var i = 0; i < array.length; i++){
          if (!dict.has(array[i])){
            dict.set(array[i], dict.size + 1);
          }
          token[i] = dict.get(array[i]);
        }
        return token;
      }

      function top_words(tokens, words){
        var valores = [];
        var conteos = [];
        for(var i = 0; i < tokens.length; i++){
          if(valores.indexOf(tokens[i]) == -1){
            valores.push(tokens[i]);
            conteos.push(1);
          } else {
            conteos[valores.indexOf(tokens[i])]++;
          }
        }
        var n_words = 0;
        if(tokens.length > words){
          var aux = [];
          if (conteos.length >= words){
            n_words = words;
          }
          else{
            n_words = conteos.length;
          }
          for(var i = 0; i < n_words; i++){
            const max_cont = Math.max(...conteos);
            const max_index = conteos.indexOf(max_cont);
            aux.push(valores[max_index]);
            valores.splice(max_index, 1);
            conteos.splice(max_index, 1);
          }
          tokens = aux;
        }
        if (tokens.length < words){
          const dif = words - tokens.length
          for(var i = 0; i < dif; i++){
            tokens.push(0)
          }
          return tokens;
        } else{
          return tokens;
        }
      }

      const sum = document.getElementById("summary").value.toLowerCase();
      const desc = document.getElementById("description").value.toLowerCase();
      var sum_token = processToken(sum);
      var desc_token = processToken(desc);
      sum_token = top_words(sum_token, 5);
      desc_token = top_words(desc_token, 20);
      const predict_token = sum_token.concat(desc_token);

      if (modelo != null){
        var tensor = tf.tensor2d([predict_token]);
        var prediccion = modelo.predict(tensor).dataSync();
        console.log(prediccion);
      }
      
      e.preventDefault();
    });
  }, []);

  useEffect(() => {
    const btn = document.getElementById("myButton");

    if (state.summaryLength >= 10 && state.descriptionLength >= 10) {
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

  const handleChange = (e) => {
    const content = e.target.value;
    const textarea = `${e.target.name}Length`;

    setState({
      ...state,
      [textarea]: content.length,
    });
  };

  return (
    <div className="form">
      <h1>Effort prediction</h1>
      <form className="main-form" action="">
        <div className="row">
          <div className="col">
            <label htmlFor="story-name">Task name</label>
            <input type="text" id="story-name" name="story-name" placeholder="Name of the story" />
          </div>
          <div className="col">
            <label htmlFor="starting-date">Starting date</label>
            <input type="date" id="starting-date" name="starting-date" />
          </div>
        </div>
        <label htmlFor="summary">User story summary</label>
        <textarea
          id="summary"
          type="text"
          name="summary"
          placeholder="Summary"
          onChange={handleChange}
        />
        <label htmlFor="description">User story description</label>
        <textarea
          id="description"
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input id="myButton" type="submit" value="Calculate" onClick={toggleModal} />
      </form>
    </div>
  );
}
