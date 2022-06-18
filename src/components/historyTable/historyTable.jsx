import React from "react";
import { useDispatch } from "react-redux";
import { toggle, setChildren } from "../../features/opener/openerSlice";
import "./historyTable.css";

const toISODate = (date) => date.toString().substring(0, 10);

export default function HistoryTable(props) {
  const { stories } = props;

  const dispatch = useDispatch();

  const showDetails = (e) => {
    const story = stories[parseInt(e.target.id)];
    const popupChildren = (
      <div className="popup-main">
        <h2 className="prediction-header">Prediction #{story.RegistroID}</h2>
        <div className="gray-line"></div>
        <div className="details">
          <div className="field">
            <h3>Name of the task</h3>
            <p>{story.Nombre_Actividad}</p>
          </div>
          <div className="row ">
            <div className="field">
              <h3>Start Date</h3>
              <p>{toISODate(story.Fecha_Inicio)}</p>
            </div>
            <div className="field">
              <h3>Estimated completion</h3>
              <p>
                {toISODate(story.Fecha_Fin)} ({story.Dias} days)
              </p>
            </div>
          </div>
          <div className="field">
            <h3>Summary</h3>
            <p>{story.Resumen}</p>
          </div>
          <div className="field">
            <h3>Description</h3>
            <p>{story.Descripcion}</p>
          </div>
          <div className="close" onClick={() => dispatch(toggle())}>
            &times;
          </div>
        </div>
      </div>
    );
    dispatch(setChildren(popupChildren));
    dispatch(toggle());
  };

  const rows = stories.map((story, key) => {
    return (
      <tr key={key.toString()}>
        <td>#{story.RegistroID}</td>
        <td>{story.Nombre_Actividad}</td>
        <td>{toISODate(story.Fecha_Calculo)}</td>
        <td>{toISODate(story.Fecha_Inicio)}</td>
        <td>{toISODate(story.Fecha_Fin)}</td>
        <td className="details" id={key} onClick={showDetails}>
          Details
        </td>
      </tr>
    );
  });

  return (
    <table className="history-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Calculation date</th>
          <th>Start date</th>
          <th>Finish date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
