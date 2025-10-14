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
  serviceDescription: string;
  note: string;
  price: number;
  washType: string;
  serviceImage: ServiceImage;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ServiceData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  services: Service[];
}

interface ServiceResponse {
  success: boolean;
  message: string;
  data: ServiceData;
}

interface MontlyWashTypeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (service: Service) => void; // trigger next step on Continue
}

const MonthlyWashType = ({
  open,
  onOpenChange,
  onNext,
}: MontlyWashTypeProps) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [selectedServiceObj, setSelectedServiceObj] = useState<Service | null>(
    null
  );

  const { data, isLoading } = useQuery<ServiceResponse>({
    queryKey: ["monthly-wash-type"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/service?washType=Monthly Subscription`
      ).then((res) => res.json()),
  });

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
                    className={`mb-4 cursor-pointer p-4 rounded-md border transition ${
                      isSelected
                        ? "border-[#499FC0] bg-[#E5F6FB]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className={`flex items-center gap-4`}>
                      <div className="bg-[#0066CC33] p-3 rounded-full">
                        <Image
                          src={item.serviceImage.url || "/no-image.png"}
                          alt={item.serviceName}
                          width={40}
                          height={40}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </div>

                      <h4 className="text-base font-semibold">
                        {item.serviceName}
                      </h4>
                    </div>
                    <p className="text-base font-normal text-[#03090D] leading-[120%] pt-2 md:pt-3">{item?.serviceDescription}</p>
                    {
                      item?.note && (
                        <p className="bg-[#FACC1533] px-3 py-[14px] border border-[#FACC15] text-sm font-normal text-[#854D0E] leading-[120%] mt-2 md:mt-3 rounded-[6px]"><span className="font-medium">Note :</span>{item?.note}</p>
                      )
                    }
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

export default MonthlyWashType;
