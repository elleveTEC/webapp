import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pageIndicator/pageIndicatorSlice";
import Page from "../../components/page/page.jsx";
import "./index.css";

export default function Profile() {
  const [data, setData] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Puesto: "",
    Contrasena: "",
  });

  const dispatch = useDispatch();

  dispatch(setPage("profile"));

  useEffect(() => {
    const userId = localStorage.getItem("UsuarioID");
    async function fillData() {
      try {
        const response = await fetch(`/getUserById/${userId}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fillData();
  }, []);

  return (
    <Page>
      <div className="profile">
        <h1>Your account</h1>
        <div className="container">
          <div className="field">
            <h2>Name</h2>
            <p>{`${data.Nombre} ${data.Apellido}`}</p>
          </div>
          <div className="field">
            <h2>Mail</h2>
            <p>{`${data.Correo}`}</p>
          </div>
          <div className="field">
            <h2>Job title</h2>
            <p>{`${data.Puesto}`}</p>
          </div>
          <div className="gray-line"></div>
          <div className="password-container">
            <h2>Password</h2>
            <button>Change password</button>
            <div className="password">{new Array(data.Contrasena.length + 1).join("*")}</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
