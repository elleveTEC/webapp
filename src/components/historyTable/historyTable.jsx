import React from "react";
import "./historyTable.css";

const toISODate = (date) => date.toString().substring(0,10);

export default function HistoryTable(props) {
  const { stories } = props;

  const rows = stories.map((story, key) => {
    return (
      <tr key={key.toString()}>
        <td>#{story.RegistroID}</td>
        <td>{story.Nombre_Actividad}</td>
        <td>{toISODate(story.Fecha_Calculo)}</td>
        <td>{toISODate(story.Fecha_Inicio)}</td>
        <td>{toISODate(story.Fecha_Fin)}</td>
        <td className="details">Details</td>
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
