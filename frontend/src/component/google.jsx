import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const stores = [
  { id: 1, name: "Delhi Store", position: { lat: 28.6139, lng: 77.2090 } },
  { id: 2, name: "Jaipur Store", position: { lat: 26.9124, lng: 75.7873 } },
  { id: 3, name: "Alwar Store", position: { lat: 27.5530, lng: 76.6346 } },
];

const containerStyle = {
  width: "100%",
  height: "680px",
};

const center = { lat: 27.7, lng: 76.5 }; // center of all stores

const StoreMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  if (!isLoaded)
    return (
      <div className="h-[420px] flex items-center justify-center bg-gray-200 rounded-2xl">
        Loading Map...
      </div>
    );

  return (
    <div className="rounded-2xl w-full flex items-center overflow-hidden shadow-lg border">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
      >
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={store.position}
            title={store.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default StoreMap;
