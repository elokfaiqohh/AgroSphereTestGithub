import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddRecord from "./pages/AddRecord";
import ScanGanoderma from "./pages/ScanGanoderma";
import Records from "./pages/Records";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-record" element={<AddRecord />} />
        <Route path="/scan-ganoderma" element={<ScanGanoderma />} />
        <Route path="/records" element={<Records />} />
      </Routes>
    </Router>
  );
}
