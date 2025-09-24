import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="/add-record">Add Record</Link> |{" "}
      <Link to="/scan-ganoderma">Scan Ganoderma</Link> |{" "}
      <Link to="/records">View Records</Link>
    </nav>
  );
}
