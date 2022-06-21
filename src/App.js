import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";


function App() {
  const [loggedIn, setloggedIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setloggedIn(true)
      navigate("/home")
    }
    // eslint-disable-next-line
  }, [])

  return (
    <Routes>
      {!loggedIn && <Route path="/" element={<Login loggedIn={loggedIn} setloggedIn={setloggedIn} />} />}
      {!loggedIn && <Route path="/register" element={<Register loggedIn={loggedIn} setloggedIn={setloggedIn} />} />}
      {loggedIn && <Route path="/home" element={<Home loggedIn={loggedIn} setloggedIn={setloggedIn} />} />}
    </Routes>
  );
}

export default App;
