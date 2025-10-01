import { useEffect, useState } from "react";
import { getSummary } from "../services/traccarAPIs.js";

const DEVICES = [
  { id: 2, name: "SL 24" },
  { id: 1, name: "SL 44." }
];

export default function Stats() {
  const [summaries, setSummaries] = useState({});

  useEffect(() => {
    const from = new Date(Date.now()-7*24*60*60*1000).toISOString();
    const to = new Date().toISOString();

    const deviceIds = DEVICES.map(device => device.id);
    getSummary(deviceIds, from, to).then(res => {
      // Assuming res.data is an array of summary objects each with a deviceId property
      const summariesByDevice = {};
      res.data.forEach(summary => {
        summariesByDevice[summary.deviceId] = summary.data || [];
      });
      setSummaries(summariesByDevice);
    });
  }, []);

  return (
    <div>
      {DEVICES.map(device => (
        <div key={device.id} style={{ marginBottom: "2em" }}>
          <h2>Stats for {device.name} (Device {device.id})</h2>
          {(summaries[device.id] || []).map((s, idx) => (
            <div key={idx}>
              <p>Distance: {s.distance.toFixed(1)} km</p>
              <p>Avg Speed: {s.averageSpeed.toFixed(1)} km/h</p>
              <p>Max Speed: {s.maxSpeed.toFixed(1)} km/h</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}