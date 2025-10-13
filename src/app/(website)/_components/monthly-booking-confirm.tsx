"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, Check, House, UserStar } from "lucide-react";

interface MonthlySubscribeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  bookingDate: [
    {
      date: string; // যেমন '2025/10/18'
      timeSlot: string; // যেমন '9:00 AM-9:00 AM'
      steamWash: boolean; // true/false
      timeSlots: Array<string>; // sub array of available time slots
    }
  ];
  location: string;
  serviceType: string;
}

const MonthlyBookingConfirm = ({
  open,
  onOpenChange,
  bookingId,
  bookingDate,
  location,
  serviceType,
}: MonthlySubscribeProps) => {
  // console.log("fdfdfdt", bookingDate);
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="space-y-0 gap-0">
          <h4 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-black leading-[150%] text-center pb-6 md:pb-8 lg:pb-10">
            Booking Confirmed
          </h4>

          <div className="space-y-3 md:space-y-4 rounded-[8px] border border-[rgba(0,0,0,0.10)] p-4 md:p-5 lg:p-6">
            <div>
              <div className="flex items-center justify-center pb-4">
              <div className="p-[10px] bg-[#E6F9E9] rounded-full">
                <div className="p-[10px] bg-[#B1EBBA] rounded-full">
                  <div className="p-[6px] bg-[#00B728] rounded-full flex items-center justify-center">
                    <Check className="w-[35px] h-[35px] text-white" />
                  </div>
                </div>
              </div>
            </div>
            </div>
            <p className="flex items-center justify-between">
              <span className="text-base md:text-lg font-medium leading-[120%] text-[#2F2F2F]">
                Booking ID
              </span>{" "}
              <span className="text-lg md:text-xl font-semibold text-[#2F2F2F] leading-[120%]">
                {bookingId}
              </span>
            </p>

            <div>
              {bookingDate?.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col">
                    {/* Top Row */}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-[#2F2F2F]" />
                      <p className="text-base md:text-lg font-semibold text-[#2F2F2F]">
                        Wash # {index + 1} : {item?.date}
                      </p>
                    </div>

                    {/* Address Line */}
                    <p className="text-sm md:text-base text-[#6C6C6C] mt-1 pl-[30px]">
                      {item?.timeSlot}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col">
              {/* Top Row */}
              <div className="flex items-center gap-2">
                <House className="w-5 h-5 text-[#2F2F2F]" />
                <p className="text-base md:text-lg font-semibold text-[#2F2F2F]">
                  Location
                </p>
              </div>

              {/* Address Line */}
              <p className="text-sm md:text-base text-[#6C6C6C] mt-1 pl-[30px]">
                {location}
              </p>
            </div>

            <div className="flex flex-col">
              {/* Top Row */}
              <div className="flex items-center gap-2">
                <UserStar className="w-5 h-5 text-[#2F2F2F]" />
                <p className="text-base md:text-lg font-semibold text-[#2F2F2F]">
                  Service
                </p>
              </div>

              {/* service Line */}
              <p className="text-sm md:text-base text-[#6C6C6C] mt-1 pl-[30px]">
                {serviceType}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MonthlyBookingConfirm;
