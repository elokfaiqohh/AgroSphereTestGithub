import React, { useState } from "react";
import { scanGanoderma } from "../api/agroApi";

export default function ScanResult() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    const res = await scanGanoderma(file);
    setResult(res);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>AI Ganoderma Scan</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleScan} disabled={!file}>Scan</button>
      {result && (
        <div>
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
