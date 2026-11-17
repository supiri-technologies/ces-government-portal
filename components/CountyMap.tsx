import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { COUNTIES } from '../data';

// IMPORTANT: In a real app, we would use GeoJSON for polygons.
// Here we use markers with approximate centers for visual representation
// due to the limitation of embedding large GeoJSON files in this code format.

const COUNTY_COORDINATES: Record<string, [number, number]> = {
  "juba": [4.85, 31.60],
  "yei": [4.09, 30.67],
  "morobo": [3.70, 30.70],
  "lainya": [4.15, 30.95],
  "kajokeji": [3.85, 31.65],
  "terekeka": [5.40, 31.75]
};

export const CountyMap = () => {
  return (
    <div className="h-[400px] lg:h-[600px] w-full rounded-xl overflow-hidden shadow-sm z-0 relative">
       <MapContainer 
        center={[4.5, 31.2]} 
        zoom={8} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {COUNTIES.map((county) => {
          const coords = COUNTY_COORDINATES[county.id];
          return coords ? (
            <Marker key={county.id} position={coords}>
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-[#00a898]">{county.name}</h3>
                  <p className="text-xs text-gray-600">Pop: {county.population}</p>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-sm text-xs z-[400] flex flex-wrap gap-2 justify-center sm:justify-start">
        {COUNTIES.map(c => (
           <div key={c.id} className="flex items-center space-x-1">
             <div className={`w-3 h-3 rounded-full ${c.color}`}></div>
             <span>{c.name}</span>
           </div>
        ))}
      </div>
    </div>
  );
};