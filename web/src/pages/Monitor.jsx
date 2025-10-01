import { useEffect, useState } from "react";
import MonitorMap from "../components/MonitorMap";
import { login } from "../services/traccarAPIs";

export default function Monitor() {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
  let socket;
  
  // Login directly to Traccar server
  fetch("http://3.129.68.84:8082/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${process.env.REACT_APP_TRAC_EMAIL}&password=${process.env.REACT_APP_TRAC_PASSWORD}`,
    credentials: "include"
  })
  .then(response => {
    if (response.ok) {
      console.log("Logged into TRACCAR");
      socket = new WebSocket("ws://3.129.68.84:8082/api/socket");
      // ... rest of WebSocket code
    }
  })
  .catch(err => console.error("Login failed:", err));

  return () => {
    if (socket) socket.close();
  };
}, []);

  return <MonitorMap positions={positions} />;
}