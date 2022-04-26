import logo from "./logo.svg";
import "./App.css";
import TopBar from "./components/header/header.jsx";
import Form from "./components/form/form.jsx";
import Popup from "./components/popup/popup.jsx";
import { useSelector, useDispatch } from "react-redux";

function App() {

  const active = useSelector(state => state.opener.active);
  const dispatch = useDispatch();
  return (
    <>
      <div className="App">
        <TopBar />
        <Form />
      </div>
      {active ? <Popup correct={true} /> : ""}
    </>
  );
}

export default App;
