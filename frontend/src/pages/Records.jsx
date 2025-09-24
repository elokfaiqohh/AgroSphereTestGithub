import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Records() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const res = await fetch("http://127.0.0.1:8000/records");
        const data = await res.json();
        setRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);

  if (loading) return <p>Loading records...</p>;

  return (
    <div>
      <Navbar />
      <h2>Records Blockchain AgroSphere</h2>
      {records.length === 0 ? (
        <p>Tidak ada record.</p>
      ) : (
        <ul>
          {records.map((rec, index) => (
            <li key={index}>
              <strong>Batch Code:</strong> {rec.batch_code || rec.data} <br />
              <strong>Tx Hash:</strong> {rec.tx_hash || "N/A"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
