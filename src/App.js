import "./App.css";
import Router from "./Router.js";
import { AuthProvider } from "./utils/auth/auth";
import Popup from "./components/popup/popup.jsx";
import { useSelector } from "react-redux";

function App() {
  const active = useSelector((state) => state.opener.active);
  return (
    <>
      <AuthProvider>
        <div className="App">
          <Router />
        </div>
        {active ? <Popup /> : ""}
      </AuthProvider>
    </>
  );
}

export default App;
