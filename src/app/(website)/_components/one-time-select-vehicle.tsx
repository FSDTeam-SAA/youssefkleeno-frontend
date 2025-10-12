"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loader from "@/components/Loader";

export interface VehicleImage {
  url: string;
  public_id: string;
}

export interface Vehicle {
  _id: string;
  vehicleName: string;
  washType: string;
  vehicleImage: VehicleImage;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VehicleData {
  vehicles: Vehicle[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface VehicleResponse {
  success: boolean;
  message: string;
  data: VehicleData;
}


interface MonthlySelectVehicleProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (vehicle: Vehicle) => void;
}

const OneTimeSelectVehicle = ({
  open,
  onOpenChange,
  onNext,
}: MonthlySelectVehicleProps) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");
  const [selectedVehicleObj, setSelectedVehicleObj] = useState<Vehicle | null>(
    null
  );

  const { data, isLoading } = useQuery<VehicleResponse>({
    queryKey: ["one-time-vehicles"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vehicle?washType=One-time Wash`
      ).then((res) => res.json()),
  });

  const handleSelect = (vehicle: Vehicle) => {
    setSelectedVehicleId(vehicle._id);
    setSelectedVehicleObj(vehicle);
  };

  const handleContinue = () => {
    if (selectedVehicleObj) {
      onNext(selectedVehicleObj); // pass vehicle to parent
    } else {
      alert("Please select a vehicle first!");
    }
  };

  return (
    <>
      <Loader loading={isLoading} />

      {!isLoading && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="space-y-0 gap-0">
            <h4 className="text-xl md:text-2xl lg:text-[32px] font-semibold text-black text-center">
              Select Your Vehicle
            </h4>

            <div className="pt-6 md:pt-8 lg:pt-10 pb-[26px] max-h-[320px] overflow-y-auto">
              {data?.data?.vehicles?.map((item) => {
                const isSelected = selectedVehicleId === item._id;
                return (
                  <div
                    key={item._id}
                    onClick={() => handleSelect(item)}
                    className={`flex items-center gap-[14px] mb-4 cursor-pointer rounded-[6px] py-[16px] px-[16px] transition-all ${
                      isSelected
                        ? "border-[1.5px] border-[#499FC0] bg-[#E5F6FB]"
                        : "bg-white border border-[#0000001A]"
                    }`}
                  >
                    <div className="bg-[#0066CC33] p-[15px] rounded-full">
                      <Image
                        src={item.vehicleImage.url || "/no-image.png"}
                        alt={item.vehicleName}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-base md:text-lg font-semibold text-[#1F2937]">
                      {item.vehicleName}
                    </h4>
                  </div>
                );
              })}
            </div>

            <button
              className="w-full h-[55px] text-base font-medium text-white bg-[#499FC0] rounded-[6px]"
              onClick={handleContinue}
            >
              Continue
            </button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OneTimeSelectVehicle;
