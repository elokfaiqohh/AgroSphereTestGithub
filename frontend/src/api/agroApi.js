const API_BASE = "http://127.0.0.1:8000"; // Backend URL

export async function fetchRecords() {
  const res = await fetch(`${API_BASE}/records`);
  return res.json();
}

export async function addRecord(data) {
  const res = await fetch(`${API_BASE}/add_record`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function scanGanoderma(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/scan_ganoderma`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}
