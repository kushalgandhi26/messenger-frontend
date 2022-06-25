import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import LoadingBar from 'react-top-loading-bar'


function App() {
  const location = useLocation();
  const [loggedIn, setloggedIn] = useState(false)
  const navigate = useNavigate()

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setloggedIn(true)
      navigate("/home")
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setProgress(100)
    // eslint-disable-next-line
  }, [location])

  return (
    <>
      <LoadingBar color='#3a25f7'
        progress={progress}
        onLoaderFinished={() => setProgress(0)} height={3} />
      <Routes>
        <Route path="/" element={<Login loggedIn={loggedIn} setloggedIn={setloggedIn} />} />
        <Route path="/register" element={<Register loggedIn={loggedIn} setloggedIn={setloggedIn} />} />
        <Route path="/home" element={<Home loggedIn={loggedIn} setloggedIn={setloggedIn} />} />
      </Routes>
    </>
  );
}

export default App;
