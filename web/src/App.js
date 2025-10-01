import Monitor from "./pages/Monitor";
import Stats from "./pages/Stats";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { login } from "./services/traccarAPIs";

function App() {
  useEffect( ()=>
  { login(process.env.REACT_APP_TRAC_EMAIL,
    process.env.REACT_APP_TRAC_PASSWORD
  )
.then (() => console.log("Logged into TRACCAR."))
.catch(err => console.error("Oh No! Traccar login failed->", err));
},[]);
return (
  <div> 
    <h1>SL Tracker</h1>
    <h2> Fat Sucre Lee stop eating so much!!!!!!</h2>
    <h1> !!!!!!!Also give me the fucking LOGO!!!!!!!!</h1>
      <Monitor />
      <Stats deviceId={1} />
    {/* your routes/pages */}
  </div>
);
}
export default App;
