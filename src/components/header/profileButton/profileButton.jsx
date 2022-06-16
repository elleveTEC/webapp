import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../utils/auth/auth";
import "./profileButton.css";

export default function ProfileButton() {

  const [active, setActive] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [initials, setInitials] = useState("");

  const auth = useAuth();

  useEffect(() => {
    const userId = localStorage.getItem("UsuarioID");
    async function fillData() {
      try {
        const response = await fetch(`/getUserById/${userId}`);
        const data = await response.json();
        setName(data.Nombre);
        setSurname(data.Apellido);
        setEmail(data.Correo);
      } catch (error) {
        console.error(error);
      }
    }
    fillData();
  }, []);

  useEffect(() => {
    setInitials((name[0]+""+surname[0]))
  }, [name, surname]);

  return (
    <>
      <div className="profile-button" onClick={() => setActive(!active)}>
        <p>{initials}</p>
      </div>
      {active ? (
        <div className="pop-up">
          {/*<img src="/images/profile-icon.png" alt="profile icon" />*/}
          <p className="initials">{initials}</p>
          <div className="data">
            <p className="name">{name + " " + surname}</p>
            <p className="email">{email}</p>
          </div>
          <Link to="/profile" className="button">Account settings</Link>
          <Link to="/login" className="button" onClick={() => auth.logout()}>Sign out</Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
