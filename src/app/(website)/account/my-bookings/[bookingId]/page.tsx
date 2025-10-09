"use client";

import React from "react";
import {
  Calendar,
  Car,
  CircleCheckBig,
  CircleX,
  MapPin,
  SquarePen,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const fetchBookingDetails = async (bookingId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/booking/${bookingId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch booking details");
  }

  return response.json();
};

const BookingDetails = ({ params }: { params: { bookingId: string } }) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["booking", params.bookingId],
    queryFn: () => fetchBookingDetails(params.bookingId),
  });

  if (error instanceof Error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error loading booking details: {error.message}
      </div>
    );
  }

  // Function to determine the styling for payment status
  const getPaymentStatusStyles = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "Pending",
        };
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Completed",
        };
      case "failed":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Failed",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          label: "Unknown",
        };
    }
  };

  const paymentStatus = data?.data?.payment_status
    ? getPaymentStatusStyles(data.data.payment_status)
    : null;

  return (
    <div>
      <div className="bg-white rounded-[6px] border border-[#0000001A] shadow-[0px_2px_8px_0px_#00000029] px-4 py-5 md:py-6 mb-5 md:mb-6">
        <div className="flex items-center justify-between">
          <h5 className="text-lg md:text-xl font-medium text-[#2F2F2F] leading-[120%]">
            {isLoading ? (
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            ) : (
              `Booking # ${params?.bookingId}`
            )}
          </h5>
          <div className="flex items-center gap-4">
           
            {isLoading ? (
              <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-full"></div>
            ) : (
              paymentStatus && (
                <span
                  className={`flex items-center gap-1 ${paymentStatus.bg} ${paymentStatus.text} text-sm font-normal leading-[120%] py-[9px] px-[21px] rounded-full`}
                >
                   <CircleCheckBig />
                  {paymentStatus.label}
                </span>
              )
            )}
          </div>
        </div>

        <div className="space-y-6 border py-6 rounded-[6px] mt-[22px] px-5">
          <div>
            {isLoading ? (
              <div className="space-y-4">
                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-4"></div>
                <div className="flex items-center gap-3 p-3 rounded-lg">
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-medium text-gray-900 mb-4">
                  {data?.data?.user?.name || "User Name"}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">
                        Wash #1 : {data?.data?.dates?.[0]?.slot || "N/A"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {data?.data?.dates?.[0]?.date
                          ? new Date(
                              data?.data?.dates?.[0]?.date
                            ).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="space-y-3 p-3">
            {isLoading ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-200 animate-pulse rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">
                      {data?.data?.location?.address || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">Vehicle</p>
                    <p className="text-sm text-gray-600">
                      {data?.data?.licensePlate || "N/A"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="border-t pt-4">
            {isLoading ? (
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-6 w-16 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : (
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Paid</span>
                <span className="font-semibold text-lg">
                  ${data?.data?.price || "0"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-[10px] pt-5 md:pt-7 lg:pt-[35px]">
          {isLoading ? (
            <>
              <div className="w-1/2 h-12 bg-gray-200 animate-pulse rounded-[6px]"></div>
              <div className="w-1/2 h-12 bg-gray-200 animate-pulse rounded-[6px]"></div>
            </>
          ) : (
            <>
              <button className="w-1/2 flex items-center justify-center gap-[10px] bg-[#499FC0] py-4 px-[25px] rounded-[6px] text-sm font-medium text-white leading-[120%]">
                <SquarePen className="w-[18px] h-[18px] text-white" /> Modify
                Booking
              </button>
              <button className="w-1/2 flex items-center justify-center gap-[10px] bg-[#D90202] py-4 px-[25px] rounded-[6px] text-sm font-medium text-white leading-[120%]">
                <CircleX className="w-[18px] h-[18px] text-white" /> Cancel
                Booking
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;