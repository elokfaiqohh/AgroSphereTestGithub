import React from "react";
// import { fetchRecords } from "../api/agroApi";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to AgroSphere</h1>
      <p>Dashboard monitoring Blockchain & AI-based Ganoderma detection.</p>
    </div>
  );
}

// export default function Home() {
//   const [records, setRecords] = useState([]);

//   useEffect(() => {
//     async function getData() {
//       const data = await fetchRecords();
//       setRecords(data);
//     }
//     getData();
//   }, []);

//   return (
//     <div>
//       <h1>Records</h1>
//       {records.length === 0 && <p>No records found</p>}
//       <ul>
//         {records.map((rec, idx) => (
//           <li key={idx}>{JSON.stringify(rec)}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
