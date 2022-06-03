import React, { useState, useEffect } from "react";

import "./login.css";

async function postData(url = "", data = {}) {
  // Default options are marked with *
  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
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
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default function LoginForm() {
  const [forgot, setForgot] = useState(false);
  const [failed, setFailed] = useState(false);
  const [state, setState] = useState({
    usename: "",
    password: "",
  });

  const handleClick = () => {
    setForgot((forgot) => !forgot);
  };

  const handleUsername = (event) => {
    setState({
      ...state,
      username: event.target.value,
    });
  };

  const handlePassword = (event) => {
    setState({
      ...state,
      password: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var response;
    try {
      response = await postData("/postUserLogin", {
        Correo: state.username,
        Contrasena: state.password,
      });
    } catch (error) {
      console.log(error);
    }
    if (response != null) {
      localStorage.setItem('UsuarioID', response[0].UsuarioID);
      window.location.href = "/";
    } else {
      setFailed(true);
    }
  };

  return (
    <>
      {!forgot ? (
        <div className="login-form-wrapper">
          <h2>Welcome</h2>
          <div className="red-line"></div>
          <h3>Log in</h3>
          <form className="login-form" onSubmit={handleSubmit}>
            <label html="username">User</label>
            <input
              type="text"
              id="username"
              name="Correo"
              value={state.username}
              onChange={handleUsername}
              placeholder="Enter your username"
            />
            <label html="password">Password</label>
            <input
              type="password"
              id="password"
              name="Contrasena"
              placeholder="Enter your password"
              value={state.password}
              onChange={handlePassword}
            />
            <p id="forgot-password" onClick={handleClick}>
              Forgot your password?
            </p>
            <input type="submit" value="Log In" />
          </form>
          {failed ? <p className="failed"> Incorrect password or username</p> : ""}
        </div>
      ) : (
        <div className="forgot">
          <h2>Forgot your password?</h2>
          <div className="red-line"></div>
          <p>Please contact your manager to recover your password</p>
          <p id="go-back" onClick={handleClick}>
            &lt;- Go back to login
          </p>
        </div>
      )}
    </>
  );
}
