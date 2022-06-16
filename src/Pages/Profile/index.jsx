import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle, setChildren } from "../../features/opener/openerSlice";
import { setPage } from "../../features/pageIndicator/pageIndicatorSlice";
import Page from "../../components/page/page.jsx";
import "./index.css";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } finally {
  }
}

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmNewPassword = document.getElementById("confirm-new-password").value;

    if (newPassword.length < 1 || newPassword != confirmNewPassword) {
      alert("The new password and the confirmation must be equals and not empty");
      return;
    }

    const userId = localStorage.getItem("UsuarioID");

    try {
      await postData(`/updateUserById/${userId}`, {
        UsuarioID: userId,
        Contrasena: newPassword,
      });
      setData({
        ...data,
        Contrasena: newPassword,
      });
    } catch (error) {
      console.error(error);
    }
    dispatch(toggle());
  };

  const handleClick = () => {
    const popupChildren = (
      <div className="popup-main">
        <h2>Change password</h2>
        <form className="password-form">
          <label for="new-password">New password</label>
          <input
            id="new-password"
            name="newPassword"
            type="password"
            placeholder="Enter a new password"
          />
          <label for="confirm-new-password">Confirm your new password</label>
          <input
            id="confirm-new-password"
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm your new password"
          />
          <div className="row buttons">
            <button id="cancel" onClick={() => dispatch(toggle())}>
              Cancel
            </button>
            <input
              className="ok change-password"
              id="myButton"
              type="submit"
              value="Change password"
              onClick={handleFormSubmit}
            />
          </div>
        </form>
      </div>
    );
    dispatch(toggle());
    dispatch(setChildren(popupChildren));
  };
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
            <button onClick={handleClick}>Change password</button>
            <div className="password">{new Array(data.Contrasena.length + 1).join("*")}</div>
          </div>
        </div>
      </div>
    </Page>
  );
}
