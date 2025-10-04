import { CircleCheckBig, CircleX, SquarePen } from "lucide-react";
import React from "react";

const BookingDetails = ({ params }: { params: { bookingId: string } }) => {
  return (
    <div>
      <div className="bg-white rounded-[6px] border border-[#0000001A] shadow-[0px_2px_8px_0px_#00000029] px-4 py-5 md:py-6 mb-5 md:mb-6">
        <div className="flex items-center justify-between">
          <h5 className="text-lg md:text-xl font-medium text-[#2F2F2F] leading-[120%]">
            Booking # {params?.bookingId}
          </h5>
          <div>
            <button className="flex items-center gap-1 bg-[#16A34A33] text-sm font-normal text-[#16A34A] leading-[120%] py-[9px] px-[21px] rounded-full">
              <CircleCheckBig /> Confirmed
            </button>
          </div>
        </div>

        {/* button  */}
        <div className="w-full flex items-center justify-between gap-[10px] pt-5 md:pt-7 lg:pt-[35px]">
            <button className="w-1/2 flex items-center justify-center gap-[10px] bg-[#499FC0] py-4 px-[25px] rounded-[6px] text-sm font-medium text-white leading-[120%]"><SquarePen className="w-[18px] h-[18px] text-white"/> Modify Booking</button>
            <button className="w-1/2 flex items-center justify-center gap-[10px] bg-[#D90202] py-4 px-[25px] rounded-[6px] text-sm font-medium text-white leading-[120%]"><CircleX className="w-[18px] h-[18px] text-white"/> Modify Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
