"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";

const MonthlySubscribe = ({
  open,
  onOpenChange,
  setMonthlySelectVehicleOpen,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  monthlySelectVehicleOpen: boolean;
  setMonthlySelectVehicleOpen: (monthlySelectVehicleOpen: boolean) => void;
}) => {
  const handleModal = () => {
    setMonthlySelectVehicleOpen(true);
    onOpenChange(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="space-y-0 gap-0">
          <h4 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-black leading-[150%] text-center">
            Your monthly Wash Plan
          </h4>
          <h5 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-[#499FC0] leading-[150%] text-center pt-2 md:pt-3 lg:pt-4">
            $29{" "}
            <sub className="text-base md:text-lg font-normal text-[#2F2F2F] leading-[150%]">
              /month
            </sub>
          </h5>
          <ul className="py-6 md:py-8 lg:py-10">
            <li className="flex items-center gap-2 text-base md:text-lg lg:text-xl font-medium text-[#2F2F2F] leading-[120%]">
              <Check className="w-6 h-6 text-[#039A06]" /> 4 washes per month (1
              per week)
            </li>
            <li className="flex items-center gap-2 text-base md:text-lg lg:text-xl font-medium text-[#2F2F2F] leading-[120%]">
              <Check className="w-6 h-6 text-[#039A06]" /> Choose your preferred
              dates and times
            </li>
            <li className="flex items-center gap-2 text-base md:text-lg lg:text-xl font-medium text-[#2F2F2F] leading-[120%]">
              <Check className="w-6 h-6 text-[#039A06]" /> Flexibility to change
              schedule
            </li>
            <li className="flex items-center gap-2 text-base md:text-lg lg:text-xl font-medium text-[#2F2F2F] leading-[120%]">
              <Check className="w-6 h-6 text-[#039A06]" /> 1 deep cleaning
              session
            </li>
          </ul>

          <div>
            <button
              onClick={handleModal}
              className="w-full h-[65px] text-base font-medium text-white leading-[120%] bg-[#499FC0] rounded-[6px] py-[23px] px-[50px]"
            >
              Subscribe Now
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MonthlySubscribe;
