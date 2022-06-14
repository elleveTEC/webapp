import { useEffect, useState, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userId) => {
    setUser(user);
    localStorage.setItem("UsuarioID", userId);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("UsuarioID");
  };

  const isLogged = () => {
    return localStorage.getItem("UsuarioID") != null;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
