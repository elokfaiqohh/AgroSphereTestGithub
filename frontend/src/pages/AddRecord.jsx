import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function AddRecord() {
  const [farmerId, setFarmerId] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [metadata, setMetadata] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/add-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          farmer_id: parseInt(farmerId),
          batch_code: batchCode,
          metadata: metadata,
        }),
      });

      const result = await res.json();
      setResponse(result.tx_hash ? `Record saved. Tx: ${result.tx_hash}` : result.detail || "Record saved successfully");

      setFarmerId("");
      setBatchCode("");
      setMetadata("");
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to save record");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Add Record</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={farmerId}
          onChange={(e) => setFarmerId(e.target.value)}
          placeholder="Farmer ID"
          required
        />
        <input
          type="text"
          value={batchCode}
          onChange={(e) => setBatchCode(e.target.value)}
          placeholder="Batch Code"
          required
        />
        <input
          type="text"
          value={metadata}
          onChange={(e) => setMetadata(e.target.value)}
          placeholder="Metadata"
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}
