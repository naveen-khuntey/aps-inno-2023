import React, { useState } from "react";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login.js";
import FetchingGamePage from "./pages/FetchingGamePage";

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/robot" element={<FetchingGamePage isAuth={isAuth} />} />
          <Route path="/login" element={<LogIn setIsAuth={setIsAuth} />} />
          <Route path="/home" element={<Home isAuth={isAuth} />} />
          <Route path="/" element={<MainPage isAuth={isAuth} />} />
          
        </Routes>
      </Router>
    </div>
  );
}
