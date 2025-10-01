// Central place to call Traccar APIs
import qs from "qs";
import axios from 'axios';

const api = axios.create({
    baseURL:"/api",
    withCredentials: true, // session cookie
});

export function login(email, password) {
  return api.post(
    "/session",
    qs.stringify({ email: email, password: password }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
}

// Get all devices (each includes its last known position)
export function getDevices() {
    return api.get("/devices");
}

// Get summary report for a device 
export function getSummary(deviceIds, from, to) {
    return api.get("/reports/summary", { 
        params: {
      deviceId: deviceIds,   // array of IDs [1, 2] is fine
      from: from,
      to: to,
    }, 
        headers: { "Content-Type": "application/json" }
    });
}

// Get position by positionId
export function getPositionById(positionId) {
  return api.get("/positions", { params: { id: positionId } });
}