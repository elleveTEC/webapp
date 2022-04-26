import logo from "./logo.svg";
import "./App.css";
import Router from "./Router.js";
import Popup from "./components/popup/popup.jsx";
import { useSelector, useDispatch } from "react-redux";

function App() {

  const active = useSelector(state => state.opener.active);
  const dispatch = useDispatch();
  return (
    <>
      <div className="App">
        <Router />
      </div>
      {active ? <Popup correct={true} /> : ""}
    </>
  );
}

export default App;
