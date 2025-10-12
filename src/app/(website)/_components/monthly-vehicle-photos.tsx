
"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Camera } from "lucide-react";
import Image from "next/image";

interface VehicleDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (details: { photo: File; licensePlate: string }) => void; // 👈 send actual file
}

const MonthlyVehiclePhotos = ({ open, onOpenChange, onNext }: VehicleDetailsModalProps) => {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [licensePlate, setLicensePlate] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleContinue = () => {
    if (!photo || !licensePlate.trim()) {
      alert("Please upload a vehicle photo and enter your license plate number!");
      return;
    }

    onNext({ photo, licensePlate }); // ✅ send file itself
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4">
        <h4 className="text-2xl font-semibold text-center">Vehicle Photos</h4>

        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="vehicle-photo-upload"
          />
          <label htmlFor="vehicle-photo-upload" className="cursor-pointer">
            {photoPreview ? (
              <Image
                src={photoPreview}
                alt="Vehicle Preview"
                width={200}
                height={200}
                className="object-cover rounded-md"
              />
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <Camera className="w-20 h-20 text-[#333333]" />
                <p className="text-lg md:text-xl text-[#499FC0] font-medium py-2">
                  Upload a Photo
                </p>
                <p className="text-base md:text-lg font-medium text-[#2F2F2F]">
                  Tap to add vehicle photo
                </p>
              </div>
            )}
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">License Plate Number</label>
          <input
            type="text"
            placeholder="Enter your plate number"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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

export default MonthlyVehiclePhotos;

