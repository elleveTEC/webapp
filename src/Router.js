import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./utils/auth/requireAuth";
import Login from "./Pages/Login/index.jsx";
import Form from "./Pages/Form/index.jsx"
import History from "./Pages/History/index.jsx"
import Profile from "./Pages/Profile/index.jsx"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* History */}
        <Route exact path = "/history" element={<RequireAuth><History /></RequireAuth>} />
        {/* Login */}
        <Route exact path = "/login" element={<Login />} />
        {/* Profile page */}
        <Route exact path = "/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        {/* Form page */}
        <Route exact path = "/" element={<RequireAuth><Form /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}
