// rafce
import {
  MapContainer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import Layers from "./Layers";
import useDutyStore from "../../store/useDutyStore";

const ClickToAdd = ({ adding, onPick }) => {
  useMapEvents({
    click(e) {
      if (adding) onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return;
};

const MapView = ({ adding, onPick }) => {
  const locations = useDutyStore((s) => s.locations);

  const center = [13, 100];

  return (
    <div className="flex-1">
      <MapContainer className="h-full" center={center} zoom={7}>
        <Layers />
        <ClickToAdd adding={adding} onPick={onPick} />

        {locations.map((item) => {
          return (
            <Marker key={item.id} position={[item.lat, item.lng]}>
              <Popup>
                <div className="text-sm">{item.name}</div>
                <div className="text-sm text-gray-500">
                  {item.lat},{item.lng}
                </div>
              </Popup>
              <Tooltip direction="center">{item.name}</Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
export default MapView;
