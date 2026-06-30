// rafce
import { LayersControl, Marker, TileLayer } from "react-leaflet";
const Layers = () => {
  return (
    <LayersControl>
      {/* 1. Basemap */}
      <LayersControl.BaseLayer name="OSM" checked>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LayersControl.BaseLayer>

      {/* 2. Basemap */}
      <LayersControl.BaseLayer name="WorldImagery">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
      </LayersControl.BaseLayer>

      <LayersControl.Overlay name="TEST" checked>
        <Marker position={[13, 101]}></Marker>
      </LayersControl.Overlay>
    </LayersControl>
  );
};
export default Layers;
