// "use client";

// import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import type { MapContainerProps, TileLayerProps, MarkerProps, PopupProps } from "react-leaflet";

// // ✅ Dynamic imports with proper TypeScript typing
// const MapContainer = dynamic<MapContainerProps>(
//   () => import("react-leaflet").then((m) => m.MapContainer),
//   { ssr: false }
// );

// const TileLayer = dynamic<TileLayerProps>(
//   () => import("react-leaflet").then((m) => m.TileLayer),
//   { ssr: false }
// );

// const Marker = dynamic<MarkerProps>(
//   () => import("react-leaflet").then((m) => m.Marker),
//   { ssr: false }
// );

// const Popup = dynamic<PopupProps>(
//   () => import("react-leaflet").then((m) => m.Popup),
//   { ssr: false }
// );

// type Props = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onNext: (location: string) => void;
// };

// const MonthlyLocation = ({ open, onOpenChange, onNext }: Props) => {
//   const [location, setLocation] = useState("");
//   const position: [number, number] = [51.505, -0.09];

//   const handleContinue = () => {
//     if (!location.trim()) {
//       alert("Please enter a location!");
//       return;
//     }
//     onNext(location);
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="space-y-5 w-[90vw] max-w-[600px] p-6">
//         <h4 className="text-2xl font-semibold text-center text-gray-800">
//           Your Location
//         </h4>

//         {/* 🗺️ Map Section */}
//         <div className="w-full h-[300px] rounded-md overflow-hidden shadow-sm">
//           <MapContainer
//             center={position}
//             zoom={13}
//             scrollWheelZoom={false}
//             className="h-full w-full z-0"
//           >
//             <TileLayer
//               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             />
//             <Marker position={position}>
//               <Popup>A sample location marker!</Popup>
//             </Marker>
//           </MapContainer>
//         </div>

//         {/* 📍 Location Input */}
//         <input
//           type="text"
//           placeholder="Enter your location..."
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#499FC0] text-gray-800"
//         />

//         {/* Continue Button */}
//         <button
//           onClick={handleContinue}
//           className="w-full h-[50px] bg-[#499FC0] hover:bg-[#3d8dac] transition text-white font-medium rounded-md"
//         >
//           Continue
//         </button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default MonthlyLocation;













"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Interface for props
interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (location: string) => void;
}

const MonthlyLocation = ({ open, onOpenChange, onNext }: LocationModalProps) => {
  const [location, setLocation] = useState("");

  const handleContinue = () => {
    if (!location.trim()) {
      alert("Please enter a location!");
      return;
    }
    onNext(location);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 w-[600px] max-w-full">
        <h4 className="text-2xl font-semibold text-center">Your Location</h4>

        {/* Map placeholder */}
        <div className="w-full h-[300px] bg-gray-200 rounded-md overflow-hidden">
          {/* Replace with real map (Leaflet, Google Maps, or Mapbox) */}
          <img
            src="/4ee726a9-8ffc-4fd7-a434-20fa70fa14c2.png"
            alt="Map"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Location input */}
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleContinue}
          className="w-full h-[55px] bg-[#499FC0] text-white rounded-md"
        >
          Continue
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlyLocation;

