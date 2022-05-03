import React, { useState, useEffect } from "react";
import "./login.css";

export default function LoginForm() {
  const [forgot, setForgot] = useState(false);

  const handleClick = () => {
    setForgot((forgot) => !forgot);
  };

  return (
    <>
      {!forgot ? (
        <div className="login-form-wrapper">
          <h2>Welcome</h2>
          <div className="red-line"></div>
          <h3>Log in</h3>
          <form className="login-form" action="">
            <label html="username">User</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
            <label html="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <p id="forgot-password" onClick={handleClick}>
              Forgot password?
            </p>
            <input type="submit" value="Log In" />
          </form>
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
