import React, { useEffect, useState } from "react";
import { getRecords } from "../api/agroApi";

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords().then(setRecords);
  }, []);

  return (
    <div>
      <h2>Blockchain Records</h2>
      <ul>
        {records.map((r, idx) => (
          <li key={idx}>
            {r.timestamp} - {r.field} ({r.farmer})
          </li>
        ))}
      </ul>
    </div>
  );
}
