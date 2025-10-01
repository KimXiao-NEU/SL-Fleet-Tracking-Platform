// renders vehicles on map
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, useMap, TileLayer } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet.gridlayer.googlemutant";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapAutoFit({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length === 0) return;
    const bounds = positions.map(pos => [pos.latitude, pos.longitude]);
    map.fitBounds(bounds);
  }, [positions, map]);

  return null;
}

export default function MonitorMap({ positions }) {
  console.log("Positions:", positions);
  return (
   <MapContainer
  center={[20, 0]}
  zoom={2}
  style={{ height: "600px", width: "100%" }}
  whenCreated={(map) => {
    // Add Google Mutant layer once the map is created
    if (L.gridLayer.googleMutant) {
        const googleLayer = L.gridLayer.googleMutant({
        type: "hybrid", // 'satellite','terrain', 'hybrid'
        styles: [
			{ elementType: "labels", stylers: [{ visibility: "off" }] },
			{ featureType: "water", stylers: [{ color: "#444444" }] },
		],
      }).addTo(map);
      console.log("✅ Google Mutant layer added", googleLayer);
    } else {
        console.error("❌ Google Mutant is missing!");
    }
  }}
>
  {/* OSM fallback */}
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution="&copy; OpenStreetMap contributors"
  />
  <MapAutoFit positions={positions} />
  {positions.map((pos) => (
    <Marker key={pos.id} position={[pos.latitude, pos.longitude]}>
      <Popup>
        Device {pos.deviceId} | Speed {pos.speed} km/h
      </Popup>
    </Marker>
  ))}
</MapContainer>
  );
}