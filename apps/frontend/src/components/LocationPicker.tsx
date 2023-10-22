import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { GoLocation } from "react-icons/go";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Spinner from "./Spinner";

type Props = {
  value?: { lat: number; lng: number };
  onChange?: (value: { lat: number; lng: number }) => void;
};

const center: { lat: number; lng: number } = {
  lat: 30,
  lng: 31.2,
};

const LocationPicker = ({ value, onChange }: Props) => {
  if (!value) {
    value = center;
  }
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onChange?.(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    onChange?.(value ?? center);
  }, []);

  const handleCurrentPos = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setView(coords, map.getZoom(), {
          animate: true,
          pan: {
            duration: 2,
          },
        });
        onChange?.(coords);
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        ref={setMap}
        center={value ?? center}
        zoom={13}
        style={{ height: "100%", width: "100%", zIndex: 2 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          draggable={true}
          position={value ?? center}
          eventHandlers={eventHandlers}
          ref={markerRef}></Marker>
      </MapContainer>
      {loading && (
        <div className="absolute top-1/2 left-1/2  translate-x-[-50%] translate-y-[-50%] z-10">
          <Spinner />
        </div>
      )}
      <button
        className="absolute bottom-2 left-2 border-2 bg-white rounded-full border-primary-50 p-2 z-10"
        onClick={handleCurrentPos}>
        <GoLocation className="text-primary" size={25} />
      </button>
    </div>
  );
};

export default LocationPicker;
