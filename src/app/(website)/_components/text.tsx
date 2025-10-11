"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export interface Schedule {
  _id: string;
  day: string;
  slot_1: string;
  slot_2: string;
  slot_3: string;
  slot_4: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ScheduleResponse {
  success: boolean;
  message: string;
  data: Schedule[];
}

export interface SelectedDate {
  date: string; // Format: YYYY/MM/DD
  timeSlot: string;
  steamWash: boolean;
  timeSlots: string[];
}

interface MonthlyDateSelectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (selectedDates: SelectedDate[]) => void;
  washtypeId: string | null;
}

const MonthlySelectDate = ({
  open,
  onOpenChange,
  onNext,
}: MonthlyDateSelectionProps) => {
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const currentDate = new Date();

  const formatDate = (year: number, month: number, day: number) => {
    const mm = month < 10 ? `0${month}` : month;
    const dd = day < 10 ? `0${day}` : day;
    return `${year}/${mm}/${dd}`;
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const fetchSlotsForDate = async (date: string): Promise<string[]> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/time/by-date?date=${date}`
      );
      const result: ScheduleResponse = await res.json();
      if (!res.ok || !result.data || result.data.length === 0) {
        throw new Error(result.message || "No schedules found");
      }
      const slots = result.data
        .flatMap((d) => [d.slot_1, d.slot_2, d.slot_3, d.slot_4])
        .filter(Boolean);
      if (slots.length === 0) throw new Error("No time slots available");
      return slots;
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch slots");
      return [];
    }
  };

  const handleDateSelect = async (day: number) => {
    const dateStr = formatDate(2025, 10, day);
    const date = new Date(dateStr.replace(/\//g, "-"));
    if (date < currentDate) return;

    const existing = selectedDates.find((d) => d.date === dateStr);
    if (existing) {
      setSelectedDates(selectedDates.filter((d) => d.date !== dateStr));
    } else if (selectedDates.length < 4) {
      const slots = await fetchSlotsForDate(dateStr);
      if (slots.length === 0) return;
      setSelectedDates([
        ...selectedDates,
        { date: dateStr, timeSlot: slots[0], steamWash: false, timeSlots: slots },
      ]);
    }
  };

  const handleTimeSlotChange = (date: string, timeSlot: string) => {
    setSelectedDates((prev) =>
      prev.map((d) => (d.date === date ? { ...d, timeSlot } : d))
    );
  };

  const handleSteamWashChange = (date: string, checked: boolean) => {
    setSelectedDates((prev) =>
      prev.map((d) => (d.date === date ? { ...d, steamWash: checked } : d))
    );
  };

  const handleContinue = () => {
    if (selectedDates.length !== 4) {
      toast.error("Please select exactly 4 dates!");
      return;
    }
    onNext(selectedDates);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4">
        <h4 className="text-2xl font-semibold text-center">Select 4 Dates</h4>
        <div className="border border-gray-300 rounded-md p-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekdays.map((day) => (
              <div key={day} className="text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map((day) => {
              const dateStr = formatDate(2025, 10, day);
              const date = new Date(dateStr.replace(/\//g, "-"));
              const isSelected = selectedDates.some((d) => d.date === dateStr);
              const isPast = date < currentDate;
              const isHovered = hoveredDate === dateStr;

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  onMouseEnter={() => setHoveredDate(dateStr)}
                  onMouseLeave={() => setHoveredDate(null)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                    isPast
                      ? "bg-gray-200 cursor-not-allowed"
                      : isSelected
                      ? "bg-[#499FC0] text-white"
                      : isHovered
                      ? "bg-blue-100"
                      : "hover:bg-blue-100"
                  }`}
                  disabled={isPast}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        {selectedDates.length > 0 && (
          <div className="space-y-4">
            {selectedDates.map((dateObj, index) => (
              <div key={index} className="border border-gray-300 p-2 rounded-md">
                <p className="text-sm font-medium">
                  Wash #{index + 1} - {dateObj.date}
                </p>
                {dateObj.timeSlots.length > 0 ? (
                  <select
                    value={dateObj.timeSlot}
                    onChange={(e) =>
                      handleTimeSlotChange(dateObj.date, e.target.value)
                    }
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  >
                    {dateObj.timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-red-500 mt-1 text-sm">
                    No time slots available for this date
                  </p>
                )}
                <div className="mt-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`steam-wash-${index}`}
                      checked={dateObj.steamWash}
                      onCheckedChange={(checked) =>
                        handleSteamWashChange(dateObj.date, !!checked)
                      }
                    />
                    <Label
                      htmlFor={`steam-wash-${index}`}
                      className="text-sm font-medium text-[#03090D] leading-[120%]"
                    >
                      Steam Wash
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={handleContinue}
          className="w-full h-[55px] bg-[#499FC0] text-white rounded-md"
        >
          Continue to Payment
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlySelectDate;








// "use client";

// import React, { useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { toast } from "sonner";

// export interface Schedule {
//   _id: string;
//   day: string;
//   slot_1: string;
//   slot_2: string;
//   slot_3: string;
//   slot_4: string;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

// export interface ScheduleResponse {
//   success: boolean;
//   message: string;
//   data: Schedule[];
// }

// export interface SelectedDate {
//   date: string; // Format: YYYY/MM/DD
//   timeSlot: string;
//   steamWash: boolean;
//   timeSlots: string[];
// }

// interface MonthlyDateSelectionProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onNext: (selectedDates: SelectedDate[]) => void;
//   washtypeId: string | null;
// }

// const MonthlySelectDate = ({
//   open,
//   onOpenChange,
//   onNext,
//   washtypeId,
// }: MonthlyDateSelectionProps) => {
//   const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
//   const [hoveredDate, setHoveredDate] = useState<string | null>(null);
//   const currentDate = new Date();

//   // Format date as YYYY/MM/DD
//   const formatDate = (year: number, month: number, day: number) => {
//     const mm = month < 10 ? `0${month}` : month;
//     const dd = day < 10 ? `0${day}` : day;
//     return `${year}/${mm}/${dd}`;
//   };

//   // Days and weekdays
//   const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
//   const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

//   // Fetch slots for a specific date
//   const fetchSlotsForDate = async (date: string): Promise<string[]> => {
//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/time/by-date?date=${date}`
//       );
//       const result: ScheduleResponse = await res.json();
//       if (!res.ok || !result.data || result.data.length === 0) {
//         throw new Error(result.message || "No schedules found");
//       }
//       const slots = result.data
//         .flatMap((d) => [d.slot_1, d.slot_2, d.slot_3, d.slot_4])
//         .filter(Boolean);
//       if (slots.length === 0) throw new Error("No time slots available");
//       return slots;
//     } catch (err: any) {
//       toast.error(err.message || "Failed to fetch slots");
//       return [];
//     }
//   };

//   // Handle selecting a date
//   const handleDateSelect = async (day: number) => {
//     const dateStr = formatDate(2025, 10, day); // YYYY/MM/DD
//     const date = new Date(dateStr.replace(/\//g, "-")); // JS Date needs "-" for comparison
//     if (date < currentDate) return;

//     const existing = selectedDates.find((d) => d.date === dateStr);
//     if (existing) {
//       setSelectedDates(selectedDates.filter((d) => d.date !== dateStr));
//     } else if (selectedDates.length < 4) {
//       const slots = await fetchSlotsForDate(dateStr);
//       if (slots.length === 0) return;
//       setSelectedDates([
//         ...selectedDates,
//         { date: dateStr, timeSlot: slots[0], steamWash: false, timeSlots: slots },
//       ]);
//     }
//   };

//   const handleTimeSlotChange = (date: string, timeSlot: string) => {
//     setSelectedDates((prev) =>
//       prev.map((d) => (d.date === date ? { ...d, timeSlot } : d))
//     );
//   };

//   const handleSteamWashChange = (date: string, checked: boolean) => {
//     setSelectedDates((prev) =>
//       prev.map((d) => (d.date === date ? { ...d, steamWash: checked } : d))
//     );
//   };

//   const handleContinue = () => {
//     if (selectedDates.length !== 4) {
//       toast.error("Please select exactly 4 dates!");
//       return;
//     }

//     const submissionDates = selectedDates.map((d) => ({
//       date: d.date,
//       slot: d.timeSlot,
//       wash_type: d.steamWash ? washtypeId : null,
//     }));

//     console.log("Final submission data:", submissionDates);
//     onNext(selectedDates);
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="space-y-4">
//         <h4 className="text-2xl font-semibold text-center">Select 4 Dates</h4>

//         {/* Calendar */}
//         <div className="border border-gray-300 rounded-md p-4">
//           <div className="grid grid-cols-7 gap-1 text-center mb-2">
//             {weekdays.map((day) => (
//               <div key={day} className="text-sm font-medium text-gray-600">
//                 {day}
//               </div>
//             ))}
//           </div>
//           <div className="grid grid-cols-7 gap-1">
//             {daysInMonth.map((day) => {
//               const dateStr = formatDate(2025, 10, day);
//               const date = new Date(dateStr.replace(/\//g, "-"));
//               const isSelected = selectedDates.some((d) => d.date === dateStr);
//               const isPast = date < currentDate;
//               const isHovered = hoveredDate === dateStr;

//               return (
//                 <button
//                   key={day}
//                   onClick={() => handleDateSelect(day)}
//                   onMouseEnter={() => setHoveredDate(dateStr)}
//                   onMouseLeave={() => setHoveredDate(null)}
//                   className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
//                     isPast
//                       ? "bg-gray-200 cursor-not-allowed"
//                       : isSelected
//                       ? "bg-[#499FC0] text-white"
//                       : isHovered
//                       ? "bg-blue-100"
//                       : "hover:bg-blue-100"
//                   }`}
//                   disabled={isPast}
//                 >
//                   {day}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Selected Dates */}
//         {selectedDates.length > 0 && (
//           <div className="space-y-4">
//             {selectedDates.map((dateObj, index) => (
//               <div key={index} className="border border-gray-300 p-2 rounded-md">
//                 <p className="text-sm font-medium">
//                   Wash #{index + 1} - {dateObj.date}
//                 </p>

//                 {dateObj.timeSlots.length > 0 ? (
//                   <select
//                     value={dateObj.timeSlot}
//                     onChange={(e) =>
//                       handleTimeSlotChange(dateObj.date, e.target.value)
//                     }
//                     className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                   >
//                     {dateObj.timeSlots.map((slot) => (
//                       <option key={slot} value={slot}>
//                         {slot}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <p className="text-red-500 mt-1 text-sm">
//                     No time slots available for this date
//                   </p>
//                 )}

//                 <div className="mt-4 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id={`steam-wash-${index}`}
//                       checked={dateObj.steamWash}
//                       onCheckedChange={(checked) =>
//                         handleSteamWashChange(dateObj.date, !!checked)
//                       }
//                     />
//                     <Label
//                       htmlFor={`steam-wash-${index}`}
//                       className="text-sm font-medium text-[#03090D] leading-[120%]"
//                     >
//                       Steam Wash
//                     </Label>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           onClick={handleContinue}
//           className="w-full h-[55px] bg-[#499FC0] text-white rounded-md"
//         >
//           Continue to Payment
//         </button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default MonthlySelectDate;
