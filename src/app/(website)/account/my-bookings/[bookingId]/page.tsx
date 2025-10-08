import { Calendar, Car, CircleCheckBig, CircleX, MapPin, SquarePen } from "lucide-react";
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
        {/* content */}
         <div className="space-y-6 border py-6 rounded-[6px] mt-[22px] px-5">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{"dsdsfasfdsad"}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Wash #1 : {"dsdsfasfdsad"}</p>
                  <p className="text-sm text-gray-600">{"122121"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-gray-600">{"dsdsfasfdsad"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Vehicle</p>
                <p className="text-sm text-gray-600">{"dsdsfasfdsad"}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Paid</span>
              <span className="font-semibold text-lg">${"dasdfffffffffff"}</span>
            </div>

           
          </div>
        </div>
        {/* button  */}
        <div className="w-full flex items-center justify-between gap-[10px] pt-5 md:pt-7 lg:pt-[35px]">
            <button className="w-1/2 flex items-center justify-center gap-[10px] bg-[#499FC0] py-4 px-[25px] rounded-[6px] text-sm font-medium text-white leading-[120%]"><SquarePen className="w-[18px] h-[18px] text-white"/> Modify Booking</button>
            <button className="w-1/2 flex items-center justify-center gap-[10px] bg-[#D90202] py-4 px-[25px] rounded-[6px] text-sm font-medium text-white leading-[120%]"><CircleX className="w-[18px] h-[18px] text-white"/> Cancel Booking</button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
