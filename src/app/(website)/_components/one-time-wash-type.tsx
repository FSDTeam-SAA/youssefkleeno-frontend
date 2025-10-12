"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Loader from "@/components/Loader";

export interface ServiceImage {
  url: string;
  public_id: string;
}

export interface Service {
  _id: string;
  serviceName: string;
  price: number;
  washType: string;
  serviceImage: ServiceImage;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServiceData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  services: Service[];
}

export interface ServiceResponse {
  success: boolean;
  message: string;
  data: ServiceData;
}

interface MontlyWashTypeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (service: Service) => void; // trigger next step on Continue
}

const OneTimeWashType = ({
  open,
  onOpenChange,
  onNext,
}: MontlyWashTypeProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [selectedServiceObj, setSelectedServiceObj] = useState<Service | null>(
    null
  );

  const { data, isLoading } = useQuery<ServiceResponse>({
    queryKey: ["one-time-wash-type"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service?washType=One-time Wash`
      ).then((res) => res.json()),
  });

  console.log("data", data);

  const handleSelect = (service: Service) => {
    setSelectedServiceId(service._id);
    setSelectedServiceObj(service);
  };

  const handleContinue = () => {
    if (selectedServiceObj) {
      onNext(selectedServiceObj); // send selected service to parent
      onOpenChange(false); // close modal
    } else {
      alert("Please select a wash type first!");
    }
  };

  return (
    <>
      <Loader loading={isLoading} />
      {!isLoading && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="space-y-4">
            <h4 className="text-xl md:text-2xl lg:text-[32px] font-semibold text-black text-center">
              Select Wash Type
            </h4>

            <div className="pt-6 pb-4 max-h-[320px] overflow-y-auto">
              {data?.data?.services?.map((item) => {
                const isSelected = selectedServiceId === item._id;
                return (
                  <div
                    key={item._id}
                    onClick={() => handleSelect(item)}
                    className={`flex items-center justify-between mb-4 cursor-pointer p-4 rounded-md border transition ${
                      isSelected
                        ? "border-[#499FC0] bg-[#E5F6FB]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className={`flex items-center gap-4 `}>
                      <div className="bg-[#0066CC33] p-[15px] rounded-full">
                        <Image
                          src={item.serviceImage.url || "/no-image.png"}
                          alt={item.serviceName}
                          width={40}
                          height={40}
                          className="object-cover rounded-full"
                        />
                      </div>

                      <h4 className="text-base md:text-lg font-semibold text-[#03090D] leading-[120%]">
                        {item.serviceName}
                      </h4>
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-[#03090D] leading-[120%]">
                        ${item.price}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleContinue}
              className="w-full h-[55px] bg-[#499FC0] text-white rounded-md"
            >
              Continue
            </button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default OneTimeWashType;
