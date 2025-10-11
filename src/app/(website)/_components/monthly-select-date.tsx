// "use client";

// import React, { useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { useQuery } from "@tanstack/react-query";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

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

// // Interface for a selected date with time slot
// export interface SelectedDate {
//   date: string; // e.g., "2025-10-09"
//   timeSlot: string; // e.g., "8:00 AM-9:00 AM"
//   steamWash: boolean; // Steam Wash selected
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

//   // Format date for backend
//   const formatDateForBackend = (date: string) => date.replace(/-/g, "/");

//   // Fetch schedule for latest selected date
//   const { data } = useQuery<ScheduleResponse>({
//     queryKey: ["date-schedule", selectedDates],
//     queryFn: async () => {
//       if (selectedDates.length === 0) return null;
//       const latestDate = selectedDates[selectedDates.length - 1].date;
//       const formattedDate = formatDateForBackend(latestDate);
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/time/by-date?date=${formattedDate}`
//       );
//       if (!res.ok) throw new Error("Failed to fetch schedule");
//       return res.json();
//     },
//     enabled: selectedDates.length > 0,
//   });

//   // Default time slots
//   const defaultTimeSlots = [
//     "8:00 AM-9:00 AM",
//     "9:00 AM-10:00 AM",
//     "12:00 PM-1:00 PM",
//     "2:00 PM-3:00 PM",
//     "4:00 PM-5:00 PM",
//   ];

//   // Flatten time slots from API
//   const timeSlots =
//     data?.data?.flatMap((d) => [d.slot_1, d.slot_2, d.slot_3, d.slot_4]) ||
//     defaultTimeSlots;

//   // Days and weekdays
//   const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
//   const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

//   // Select date
//   const handleDateSelect = (day: number) => {
//     const dateStr = `2025-10-${day < 10 ? `0${day}` : day}`;
//     const date = new Date(dateStr);
//     if (date < currentDate) return;

//     const existingIndex = selectedDates.findIndex((d) => d.date === dateStr);
//     if (existingIndex > -1) {
//       const newSelected = selectedDates.filter((d) => d.date !== dateStr);
//       setSelectedDates(newSelected);
//     } else if (selectedDates.length < 4) {
//       setSelectedDates([
//         ...selectedDates,
//         { date: dateStr, timeSlot: timeSlots[0], steamWash: false },
//       ]);
//     }
//   };

//   // Change time slot
//   const handleTimeSlotChange = (date: string, timeSlot: string) => {
//     setSelectedDates((prev) =>
//       prev.map((d) => (d.date === date ? { ...d, timeSlot } : d))
//     );
//   };

//   // Change Steam Wash checkbox
//   const handleSteamWashChange = (date: string, checked: boolean) => {
//     setSelectedDates((prev) => {
//       const updated = prev.map((d) =>
//         d.date === date ? { ...d, steamWash: checked } : d
//       );
//       console.log("Updated Selected Dates:", updated); // 🔥 log real-time
//       return updated;
//     });
//   };

//   const handleContinue = () => {
//     if (selectedDates.length !== 4) {
//       alert("Please select exactly 4 dates!");
//       return;
//     }

//     // Map steamWash → washtypeId for API submission
//     const submissionDates = selectedDates.map((d) => ({
//       date: d.date,
//       slot: d.timeSlot,
//       wash_type: d.steamWash ? washtypeId : null,
//     }));

//     console.log("Final submission data:", submissionDates);

//     onNext(selectedDates); // keep original SelectedDate array for state
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
//               const dateStr = `2025-10-${day < 10 ? `0${day}` : day}`;
//               const date = new Date(dateStr);
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
//               <div
//                 key={index}
//                 className="border border-gray-300 p-2 rounded-md"
//               >
//                 <p className="text-sm font-medium">
//                   Wash #{index + 1} -{" "}
//                   {new Date(dateObj.date).toLocaleDateString()}
//                 </p>

//                 {/* Time slot select */}
//                 <select
//                   value={dateObj.timeSlot}
//                   onChange={(e) =>
//                     handleTimeSlotChange(dateObj.date, e.target.value)
//                   }
//                   className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                 >
//                   {timeSlots.map((slot) => (
//                     <option key={slot} value={slot}>
//                       {slot}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Steam Wash checkbox */}
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





// -------------------------------------------------

// "use client";

// import React, { useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { useQuery } from "@tanstack/react-query";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

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

// // Interface for a selected date with time slot
// interface SelectedDate {
//   date: string; // e.g., "2025-10-09"
//   timeSlot: string; // e.g., "8:00 AM-9:00 AM"
// }

// interface MonthlyDateSelectionProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onNext: (selectedDates: SelectedDate[]) => void;
// }

// const MonthlySelectDate = ({
//   open,
//   onOpenChange,
//   onNext,
// }: MonthlyDateSelectionProps) => {
//   const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
//   const [hoveredDate, setHoveredDate] = useState<string | null>(null);
//   const currentDate = new Date(); // Current date and time

//   console.log(selectedDates);
//   const formatDateForBackend = (date: string) => date.replace(/-/g, "/");
//   console.log(formatDateForBackend);

//   // get schedule by date
//   // const {data} = useQuery<ScheduleResponse>({
//   //   queryKey : ['date-schedule', selectedDates],
//   //   queryFn : ()=>fetch(`${process.env.NEXT_PUBLIC_API_URL}/time/by-date?date=${selectedDates}`).then((res)=>res.json())
//   // })
//   // get schedule by date
//   const { data } = useQuery<ScheduleResponse>({
//     queryKey: ["date-schedule", selectedDates],
//     queryFn: async () => {
//       if (selectedDates.length === 0) return null;

//       // You can fetch the latest selected date or loop through all if needed
//       const latestDate = selectedDates[selectedDates.length - 1].date;
//       const formattedDate = formatDateForBackend(latestDate);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/time/by-date?date=${formattedDate}`
//       );
//       if (!res.ok) throw new Error("Failed to fetch schedule");
//       return res.json();
//     },
//     enabled: selectedDates.length > 0, // only run when dates are selected
//   });

//   console.log("date select", data?.data);

//   const defaultTimeSlots = [
//     "8:00 AM-9:00 AM",
//     "9:00 AM-10:00 AM",
//     "12:00 PM-1:00 PM",
//     "2:00 PM-3:00 PM",
//     "4:00 PM-5:00 PM",
//   ];

//   // Extract and flatten dynamic time slots from API
//   const timeSlots =
//     data?.data?.flatMap((d) => [d.slot_1, d.slot_2, d.slot_3, d.slot_4]) ||
//     defaultTimeSlots;

//   console.log("timeSlots", timeSlots);

//   // Sample available time slots (can be fetched dynamically)
//   // const timeSlots = [
//   //   "8:00 AM-9:00 AM",
//   //   "9:00 AM-10:00 AM",
//   //   "12:00 PM-1:00 PM",
//   //   "2:00 PM-3:00 PM",
//   //   "4:00 PM-5:00 PM",
//   // ];

//   // Generate days for October 2025
//   const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
//   const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

//   const handleDateSelect = (day: number) => {
//     const dateStr = `2025-10-${day < 10 ? `0${day}` : day}`;
//     const date = new Date(dateStr);
//     if (date < currentDate) return; // Disable past dates

//     const existingDateIndex = selectedDates.findIndex(
//       (d) => d.date === dateStr
//     );
//     if (existingDateIndex > -1) {
//       // Remove date if already selected (max 4 dates)
//       const newSelectedDates = selectedDates.filter((d) => d.date !== dateStr);
//       setSelectedDates(newSelectedDates);
//     } else if (selectedDates.length < 4) {
//       // Add new date with default time slot
//       setSelectedDates([
//         ...selectedDates,
//         { date: dateStr, timeSlot: timeSlots[0] },
//       ]);
//     }
//   };

//   const handleTimeSlotChange = (date: string, timeSlot: string) => {
//     const newSelectedDates = selectedDates.map((d) =>
//       d.date === date ? { ...d, timeSlot } : d
//     );
//     setSelectedDates(newSelectedDates);
//   };

//   const handleContinue = () => {
//     if (selectedDates.length !== 4) {
//       alert("Please select exactly 4 dates!");
//       return;
//     }
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
//               const dateStr = `2025-10-${day < 10 ? `0${day}` : day}`;
//               const date = new Date(dateStr);
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

//         {/* Selected Dates and Time Slots */}
//         {selectedDates.length > 0 && (
//           <div className="space-y-4">
//             {selectedDates.map((dateObj, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-300 p-2 rounded-md"
//               >
//                 <p className="text-sm font-medium">
//                   Wash #{index + 1} -{" "}
//                   {new Date(dateObj.date).toLocaleDateString()}
//                 </p>
//                 <select
//                   value={dateObj.timeSlot}
//                   onChange={(e) =>
//                     handleTimeSlotChange(dateObj.date, e.target.value)
//                   }
//                   className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//                 >
//                   {timeSlots.map((slot) => (
//                     <option key={slot} value={slot}>
//                       {slot}
//                     </option>
//                   ))}
//                 </select>
//                 {/* <div className="mt-4 mb-2">
//                   <RadioGroup
//                     defaultValue="steam-wash"
//                     onValueChange={(value) => console.log("Selected:", value)}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="steam-wash" id="steam-wash" />
//                       <Label
//                         htmlFor="steam-wash"
//                         className="text-sm font-medium text-[#03090D] leading-[120%]"
//                       >
//                         Steam Wash
//                       </Label>
//                     </div>
//                   </RadioGroup>
//                 </div> */}
//                 <div className="mt-4 mb-2">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox id="steam-wash" />
//                     <Label
//                       htmlFor="steam-wash"
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
