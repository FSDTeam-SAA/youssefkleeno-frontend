"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Interface for a selected date with time slot
interface SelectedDate {
  date: string; // e.g., "2025-10-09"
  timeSlot: string; // e.g., "8:00 AM-9:00 AM"
}

interface MonthlyDateSelectionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (selectedDates: SelectedDate[]) => void;
}

const MonthlySelectDate = ({ open, onOpenChange, onNext }: MonthlyDateSelectionProps) => {
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const currentDate = new Date("2025-10-09T15:28:00+06:00"); // Current date and time

  // Sample available time slots (can be fetched dynamically)
  const timeSlots = [
    "8:00 AM-9:00 AM",
    "9:00 AM-10:00 AM",
    "12:00 PM-1:00 PM",
    "2:00 PM-3:00 PM",
    "4:00 PM-5:00 PM",
  ];

  // Generate days for October 2025
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const handleDateSelect = (day: number) => {
    const dateStr = `2025-10-${day < 10 ? `0${day}` : day}`;
    const date = new Date(dateStr);
    if (date < currentDate) return; // Disable past dates

    const existingDateIndex = selectedDates.findIndex(d => d.date === dateStr);
    if (existingDateIndex > -1) {
      // Remove date if already selected (max 4 dates)
      const newSelectedDates = selectedDates.filter(d => d.date !== dateStr);
      setSelectedDates(newSelectedDates);
    } else if (selectedDates.length < 4) {
      // Add new date with default time slot
      setSelectedDates([...selectedDates, { date: dateStr, timeSlot: timeSlots[0] }]);
    }
  };

  const handleTimeSlotChange = (date: string, timeSlot: string) => {
    const newSelectedDates = selectedDates.map(d =>
      d.date === date ? { ...d, timeSlot } : d
    );
    setSelectedDates(newSelectedDates);
  };

  const handleContinue = () => {
    if (selectedDates.length !== 4) {
      alert("Please select exactly 4 dates!");
      return;
    }
    onNext(selectedDates);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4">
        <h4 className="text-2xl font-semibold text-center">Select 4 Dates</h4>

        {/* Calendar */}
        <div className="border border-gray-300 rounded-md p-4">
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {weekdays.map(day => (
              <div key={day} className="text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {daysInMonth.map(day => {
              const dateStr = `2025-10-${day < 10 ? `0${day}` : day}`;
              const date = new Date(dateStr);
              const isSelected = selectedDates.some(d => d.date === dateStr);
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

        {/* Selected Dates and Time Slots */}
        {selectedDates.length > 0 && (
          <div className="space-y-4">
            {selectedDates.map((dateObj, index) => (
              <div key={index} className="border border-gray-300 p-2 rounded-md">
                <p className="text-sm font-medium">Wash #{index + 1} - {new Date(dateObj.date).toLocaleDateString()}</p>
                <select
                  value={dateObj.timeSlot}
                  onChange={(e) => handleTimeSlotChange(dateObj.date, e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                >
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
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