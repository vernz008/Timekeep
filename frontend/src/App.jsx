import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home_Page from "./pages/Home_Page";
import EditCutOff from "./component/EditCutOff";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home_Page />} />
    </Routes>
  );
}

export default App;
