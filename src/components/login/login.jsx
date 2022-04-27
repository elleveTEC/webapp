import React from "react";
import "./login.css";

export default function LoginForm() {
  return ( 
    <div className="login-form-wrapper">
      <h2>Welcome</h2>
      <div className="red-line"></div>
      <h3>Log in</h3>
      <form className="login-form" action="">
        <label forHtml="username">User</label>
        <input type="text" id="username" name="username" placeholder="Enter your username"/>
        <label forHtml="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password"/>
        <input type="submit" value="Log In" />
      </form>
    </div>
  );
}
