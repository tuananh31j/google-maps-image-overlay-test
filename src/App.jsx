import { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  GroundOverlay,
} from "@react-google-maps/api";
import "./App.css";

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 21.1611,
  lng: 105.8496,
};

const bounds = {
  north: 21.22010102564232,
  south: 21.06536103386723,
  east: 105.9256382835744,
  west: 105.7128245047564,
};

const overlayImageUrl = "/public/duan24h.net_BĐQHSDĐ_Dong_Anh_HN_2030.jpg";

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBa7UlmsSGVz7NA2HkBdfevTBiwIPP2mdY",
  });
  const [isDone, setIsDone] = useState(false);

  const [opacity, setOpacity] = useState(0);
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;
  console.log(opacity, isDone);
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        onLoad={() => console.log("Map loaded")}
        onTilesLoaded={() => setIsDone(true)}
      >
        {isDone && (
          <GroundOverlay
            url={overlayImageUrl}
            bounds={bounds}
            opacity={opacity}
          />
        )}
      </GoogleMap>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={opacity}
        onChange={(e) => {
          setOpacity(parseFloat(e.target.value));
          console.log(e.target.value);
        }}
        style={{
          position: "absolute",
          top: "300px",
          right: "0px",
          zIndex: 10,
          width: "200px",
          transform: "rotate(270deg)",
        }}
      />
    </div>
  );
};

export default App;
