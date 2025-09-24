import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";

function App() {
  const webcamRef = useRef(null);
  const [result, setResult] = useState(null);

  const captureAndSend = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageSrc }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error detecting:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(captureAndSend, 2000); // capture setiap 2 detik
    return () => clearInterval(interval); // stop saat unmount
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Realtime Ganoderma Detection</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <div>
        <h3>Result:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
