"use client";

import { Calendar, ChevronRight, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";

// Define TypeScript interfaces for the API response
interface Booking {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  bookingType: string;
  licensePlate: string;
  vehicle: null | string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  dates: {
    date: string;
    slot: string;
    wash_type: null | string;
    _id: string;
  }[];
  price: number;
  payment_status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    bookings: Booking[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Skeleton loader component
const BookingSkeleton = () => {
  return (
    <div className="bg-white rounded-[6px] border border-[#0000001A] shadow-[0px_2px_8px_0px_#00000029] px-4 py-5 md:py-6 mb-5 md:mb-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-[26px] h-[26px] bg-gray-200 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
      </div>
      <div className="h-4 w-40 bg-gray-200 rounded mt-3 md:mt-4 mb-4 md:mb-5 lg:mb-6"></div>
      <div className="flex items-center justify-between border-t border-[#0000001A] pt-2 md:pt-3 lg:pt-[14px]">
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const BookingContainer = () => {
  // Fetch bookings using TanStack Query v5
  const {
    data,
    isPending: isLoading,
    isError,
    error,
  } = useQuery<ApiResponse, Error>({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Render skeleton loaders while fetching data
  if (isLoading) {
    return (
      <div>
        {[...Array(2)].map((_, index) => (
          <BookingSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="text-red-500 text-center">
        Error fetching bookings: {error?.message || "Something went wrong"}
      </div>
    );
  }

  // Extract bookings from the API response
  const bookings = data?.data.bookings || [];

  return (
    <div>
      {bookings.length === 0 ? (
        <p className="text-center text-[#2F2F2F] text-base font-medium">
          No bookings found
        </p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-[6px] border border-[#0000001A] shadow-[0px_2px_8px_0px_#00000029] px-4 py-5 md:py-6 mb-5 md:mb-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[26px] h-[26px] p-[5px] bg-[#499FC033] rounded-full">
                  <Calendar className="w-4 h-4 text-[#499FC0]" />
                </div>
                <span className="text-base font-medium text-[#2F2F2F] leading-[120%]">
                  {booking.bookingType.charAt(0).toUpperCase() +
                    booking.bookingType.slice(1)}{" "}
                  Wash
                </span>
              </div>
              <div>
                <button
                  className={`flex items-center gap-1 ${
                    booking.payment_status === "confirmed"
                      ? "bg-[#16A34A33] text-[#16A34A]"
                      : "bg-[#FFD70033] text-[#FFD700]"
                  } text-sm font-normal leading-[120%] py-[9px] px-[21px] rounded-full`}
                >
                  <CircleCheckBig />
                  {booking.payment_status.charAt(0).toUpperCase() +
                    booking.payment_status.slice(1)}
                </button>
              </div>
            </div>
            <p className="text-base font-medium text-[#2F2F2F] leading-[120%] pt-3 md:pt-4 pb-4 md:pb-5 lg:pb-6 border-b border-[#0000001A]">
              Total Paid <span className="font-semibold pl-1">${booking.price}</span>
            </p>
            <Link href={`/account/my-bookings/${booking._id}`}>
              <div className="w-full flex items-center justify-between">
                <p className="text-base font-medium text-[#2F2F2F] leading-[120%] pt-2 md:pt-3 lg:pt-[14px]">
                  Booking ID
                  <span className="font-semibold pl-1">{booking._id}</span>
                </p>
                <span className="pt-2 md:pt-3 lg:pt-[14px]">
                  <ChevronRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BookingContainer;
