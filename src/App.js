import { useState } from "react";
import "./App.css";
import { UserContext } from "./components/context";
import Login from "./components/login";
import NavBar from "./components/navbar";
import DisplayCarousel from "./components/carousel";
import NewEntry from "./components/newEntry";

function App() {
  const [expandLogin, setLogin] = useState(false);
  const [expandAdd, setAdd] = useState(false);
  const [getUserName, setUserName] = useState({
    email: "",
    username: "",
  });

  const ShowLogin = () => {
    setLogin(!expandLogin);
  };

  const SetUser = (user) => {
    setUserName(user);
  };

  const ShowAdd = () => {
    setAdd(!expandAdd);
  };
  return (
    <UserContext.Provider
      value={{
        expandLogin,
        ShowLogin,
        getUserName,
        SetUser,
        expandAdd,
        ShowAdd,
      }}>
      <div className="app-container">
        <div>
          <NavBar />
        </div>
        <div className={expandLogin ? "expand-login" : "collapse-login"}>
          <Login />
        </div>
        <div className={expandAdd ? "expand-login" : "collapse-Add"}>
          <NewEntry />
        </div>
        <div>
          <DisplayCarousel />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
