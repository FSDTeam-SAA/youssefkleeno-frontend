// import React, { useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";

// export interface VehicleImage {
//   url: string;
//   public_id: string;
// }

// export interface Vehicle {
//   _id: string;
//   vehicleName: string;
//   washType: string;
//   vehicleImage: VehicleImage;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// export interface VehicleData {
//   vehicles: Vehicle[];
//   total: number;
//   page: number;
//   limit: number;
//   totalPages: number;
// }

// export interface VehicleResponse {
//   success: boolean;
//   message: string;
//   data: VehicleData;
// }

// const MonthlySelectVehicle = ({
//   open,
//   onOpenChange,
// onSelect,
// }: {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//    onSelect: (vehicle: Vehicle) => void;
// }) => {

//     const [selectedVehicle, setSelectedVehicle] = useState<string>("");
//   const { data } = useQuery<VehicleResponse>({
//     queryKey: ["vehicles"],
//     queryFn: () =>
//       fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/vehicle?washType=Monthly Subscription`
//       ).then((res) => res.json()),
//   });

//   console.log(data?.data?.vehicles);

//     const handleSelect = (vehicle: Vehicle) => {
//     setSelectedVehicleId(vehicle._id);
//     onSelect(vehicle); // ✅ send selected vehicle back to parent
//     onOpenChange(false); // ✅ close modal after selection
//   };
//   return (
//     <div>
//       <Dialog open={open} onOpenChange={onOpenChange}>
//         <DialogContent className="space-y-0 gap-0">
//           <h4 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-black leading-[150%] text-center">
//             Select Your Vehicle
//           </h4>

//           <div className="pt-6 md:pt-8 lg:pt-10 pb-[26px] md:pb-[20px] lg:pb-[16px]">
//             {data?.data?.vehicles?.map((item) => {
//                   const isSelected = selectedVehicleId === item._id;
//               return (
//                 <div
//                   key={item._id}
//                   className={`flex items-center gap-[14px] mb-4 md:mb-5 lg:mb-6  cursor-pointer rounded-[6px] py-[16px] md:py-[20px] lg:py-[23px] px-[16px] md:px-[20px] lg:px-[24px] ${isSelected ? "border-[1.5px] border-[#499FC04D] bg-[#499FC01A]" : "bg-white border border-[#0000001A]"} `}
//                 >
//                   <div className="bg-[#0066CC33]  p-[15px] rounded-full ">
//                     <Image
//                       src={item?.vehicleImage?.url}
//                       alt={item.vehicleName}
//                       width={100}
//                       height={100}
//                       className="object-cover w-[32px] h-[32px]"
//                     />
//                   </div>
//                   <h4 className="text-base md:text-lg font-semibold text-[#1F2937] leading-[120%]">
//                     {item.vehicleName}
//                   </h4>
//                 </div>
//               );
//             })}
//           </div>
//           <div>
//             <button className="w-full h-[65px] text-base font-medium text-white leading-[120%] bg-[#499FC0] rounded-[6px] py-[23px] px-[50px]">
//               Continue
//             </button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default MonthlySelectVehicle;


"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

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
  onSelect: (vehicle: Vehicle) => void; // ✅ new prop
}

const MonthlySelectVehicle = ({
  open,
  onOpenChange,
  onSelect,
}: MonthlySelectVehicleProps) => {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("");

  const { data } = useQuery<VehicleResponse>({
    queryKey: ["vehicles"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vehicle?washType=Monthly Subscription`
      ).then((res) => res.json()),
  });

  const handleSelect = (vehicle: Vehicle) => {
    setSelectedVehicleId(vehicle._id);
    onSelect(vehicle); // ✅ send selected vehicle back to parent
    // onOpenChange(false); // ✅ close modal after selection
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-0 gap-0">
        <h4 className="text-2xl font-semibold text-black text-center">
          Select Your Vehicle
        </h4>

        <div className="pt-6 pb-[26px] max-h-[320px] overflow-y-auto">
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
                    src={item.vehicleImage.url}
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
          onClick={() => onOpenChange(false)}
        >
          Continue
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlySelectVehicle;

