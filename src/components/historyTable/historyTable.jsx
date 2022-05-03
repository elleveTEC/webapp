import React from "react";
import "./historyTable.css";

export default function HistoryTable(props) {
  const { stories } = props;

  const rows = stories.map((story, key) => {
    return (
      <tr key={key.toString()}>
        <td>{story.id}</td>
        <td>{story.task}</td>
        <td>{story.startDate}</td>
        <td>{story.estimated}</td>
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
          <th>Start date</th>
          <th>Estimated completion</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
