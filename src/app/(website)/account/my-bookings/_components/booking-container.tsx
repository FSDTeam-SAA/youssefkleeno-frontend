import { Calendar, ChevronRight, CircleCheckBig } from "lucide-react";
import Link from "next/link";
import React from "react";

const BookingContainer = () => {
  const bookingData = [
    {
      id: 1,
      price: 29,
      bookingId: "BK9520",
    },
    {
      id: 2,
      price: 29,
      bookingId: "BK9521",
    },
  ];
  return (
    <>
      <div>
        {bookingData?.map((booking) => {
          return (
            <div
              key={booking.id}
              className="bg-white rounded-[6px] border border-[#0000001A] shadow-[0px_2px_8px_0px_#00000029] px-4 py-5 md:py-6 mb-5 md:mb-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-[26px] h-[26px] p-[5px] bg-[#499FC033] rounded-full">
                    <Calendar className="w-4 h-4 text-[#499FC0]" />
                  </div>

                  <span className="text-base font-medium text-[#2F2F2F] leading-[120%]">
                    Subscription Wash
                  </span>
                </div>
                <div>
                  <button className="flex items-center gap-1 bg-[#16A34A33] text-sm font-normal text-[#16A34A] leading-[120%] py-[9px] px-[21px] rounded-full">
                    <CircleCheckBig /> Confirmed
                  </button>
                </div>
              </div>
              <p className="text-base font-medium text-[#2F2F2F] leading-[120%] pt-3 md:pt-4 pb-4 md:pb-5 lg:pb-6 border-b border-[#0000001A]">
                Total Paid{" "}
                <span className="font-semibold pl-1"> ${booking.price}</span>
              </p>
              <Link href={`/account/my-bookings/${booking?.bookingId}`}>
                <div className="w-full flex items-center justify-between">
                  <p className="text-base font-medium text-[#2F2F2F] leading-[120%] pt-2 md:pt-3 lg:pt-[14px] ">
                    Booking ID
                    <span className="font-semibold pl-1">
                      {" "}
                      ${booking.bookingId}
                    </span>
                  </p>
                  <span className="pt-2 md:pt-3 lg:pt-[14px] ">
                    <ChevronRight className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BookingContainer;
