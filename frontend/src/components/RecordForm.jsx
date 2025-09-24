import React, { useState } from "react";
import { addRecord } from "../api/agroApi";

export default function RecordForm({ onNewRecord }) {
  const [field, setField] = useState("");
  const [farmer, setFarmer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addRecord({ field, farmer });
    onNewRecord(result);
    setField("");
    setFarmer("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Nama Lahan"
        value={field}
        onChange={(e) => setField(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nama Petani"
        value={farmer}
        onChange={(e) => setFarmer(e.target.value)}
        required
      />
      <button type="submit">Tambah Record</button>
    </form>
  );
}
