import React from "react";
import LoginForm from "../../components/login/login.jsx";
import "./index.css";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="left-side">
        <img className="icon" src="/images/login-icon.svg" alt="icon" />
        <h1 className="title">Innovating the way you work</h1>
        <h2 className="subtitle">Optimize the scheduling of your activities and projects</h2>
        {/*<ul>
          <li>Explore our product portfolio and place your order instantly</li>
          <li>Optimize, track and manage every step of your operation from purchase to delivery.</li>
          <li>Gain control of your invoices and purchases in real-time from any device.</li>
       </ul>*/}
      </div>
      <div className="right-side">
        <LoginForm />
      </div>
    </div>
  );
}
