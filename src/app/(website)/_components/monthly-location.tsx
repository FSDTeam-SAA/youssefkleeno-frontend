













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

