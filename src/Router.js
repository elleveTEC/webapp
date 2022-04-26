import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/index.jsx";
import Form from "./Pages/Form/index.jsx"

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        {/* Login */}
        <Route exact path = "/login" component={Login} />
        {/* Form page */}
        <Route exact path = "/" component={Form} />
      </Switch>
    </BrowserRouter>
  );
}
