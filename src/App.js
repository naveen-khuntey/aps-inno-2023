import React, { useState } from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/Login.js";

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LogIn setIsAuth={setIsAuth} />} />
          <Route path="/" element={<MainPage isAuth={isAuth} />} />
        </Routes>
      </Router>
    </div>
  );
}
