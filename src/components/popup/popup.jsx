import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import "./popup.css";

export default function Popup() {

  const children = useSelector(state => state.opener.children);

  useEffect(() => {
    const app = document.getElementsByClassName("App")[0];
    app.style.filter = "blur(5px)";
    return () => {
      app.style.filter = "";
    }
  },[])

  return (
    <div className="popup">
      {children}
    </div>
  );
}
