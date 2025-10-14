"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Zap } from "lucide-react";
import { Button } from "./ui/button";
import MonthlySubscribe from "@/app/(website)/_components/monthly-subscribe";
import MonthlySelectVehicle, {
  Vehicle,
} from "@/app/(website)/_components/monthly-select-vehicle";
import { Service } from "@/app/(website)/_components/monthly-wash-type";
import MonthlyWashType from "@/app/(website)/_components/monthly-wash-type";
import MonthlyVehiclePhotos from "@/app/(website)/_components/monthly-vehicle-photos";
import MonthlyPaymentDiscount from "@/app/(website)/_components/monthly-payment-discount";
import { toast } from "sonner";

import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import MonthlySelectDate, { SelectedDate } from "@/app/(website)/_components/monthly-select-date";
import Loader from "./Loader";
import MonthlyBookingConfirm from "@/app/(website)/_components/monthly-booking-confirm";

const MonthlyLocation = dynamic(
  () => import("@/app/(website)/_components/monthly-location"),
  {
    ssr: false,
  }
);

interface MyError {
  message: string;
  // add any other properties you expect the error object to have
}

// ✅ Default map position
const defaultPosition: [number, number] = [51.505, -0.09];

const MonthlyService = () => {
  const userId = `68bff87720fffa3bb06f1206`;

  // Step modals state
  const [monthlySubscribeOpen, setMonthlySubscribeOpen] = useState(false);
  const [monthlySelectVehicleOpen, setMonthlySelectVehicleOpen] =
    useState(false);
  const [monthlyWashTypeOpen, setMonthlyWashTypeOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [monthlyVehiclePhotosModalOpen, setMonthlyVehiclePhotosModalOpen] =
    useState(false);
  const [dateSelectionModalOpen, setDateSelectionModalOpen] = useState(false);
  const [paymentDiscountModalOpen, setPaymentDiscountModalOpen] =
    useState(false);

  const [monthlyBookingConfirmModalOpen, setMonthlyBookingConfirmModalOpen] =
    useState(false);

  // Selected data state
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedWashType, setSelectedWashType] = useState<Service | null>(
    null
  );

  // console.log(selectedWashType);
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log(totalPrice);
  const [selectedMonthlyVehiclePhoto, setSelectedMonthlyVehiclePhoto] =
    useState<{
      photo: string | File;
      licensePlate: string;
    } | null>(null);
  // console.log("Selected Vehicle Details:", selectedMonthlyVehiclePhoto);
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  // ✅ Position state lifted up here
  const [position, setPosition] = useState<[number, number]>(defaultPosition);

  // console.log("date", selectedDates);

  // console.log(position);
  const washtypeId = selectedWashType?._id;
  const [bookingId, setBookingId] = useState("");
  // console.log("select location", selectedLocation);

  // ✅ Booking API mutation
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-booking"],
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("user", userId);
      formData.append("bookingType", "subscription");
      formData.append(
        "licensePlate",
        selectedMonthlyVehiclePhoto?.licensePlate || ""
      );
      formData.append("vehicle", selectedVehicle?._id || "");
      formData.append(
        "location",
        JSON.stringify({
          address: selectedLocation,
          lat: position[0],
          lng: position[1],
        })
      );
      formData.append(
        "dates",
        JSON.stringify(
          selectedDates.map((d) => ({
            date: d.date,
            slot: d.timeSlot,
            wash_type: d.steamWash ? washtypeId : null,
          }))
        )
      );

      // ✅ Add binary file
      if (selectedMonthlyVehiclePhoto?.photo) {
        formData.append("car", selectedMonthlyVehiclePhoto.photo);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
        method: "POST",
        body: formData, // ✅ send binary safely
      });

      if (!res.ok) throw new Error("Failed to create booking");
      return res.json();
    },
    onSuccess: (data) => {
      toast.success("Booking created successfully!");
      setDateSelectionModalOpen(false);
      setPaymentDiscountModalOpen(true);
      setBookingId(data?.data?._id);
      setTotalPrice(data?.data?.price);
    },
    onError: (error: MyError) => {
      toast.error(error.message || "Booking failed!");
    },
  });

  const handleContinue = (selectedDatesFromModal: SelectedDate[]) => {
    if (!selectedVehicle) return toast.error("Please select a vehicle!");
    if (!selectedWashType) return toast.error("Please select a wash type!");
    if (!selectedLocation) return toast.error("Please enter a location!");
    if (!selectedMonthlyVehiclePhoto)
      return toast.error("Please upload vehicle photos!");
    if (selectedDatesFromModal.length !== 4)
      return toast.error("Please select exactly 4 dates!");

    setSelectedDates(selectedDatesFromModal);
    mutate(); // ✅ Call booking API here
  };

  const handlePaymentComplete = () => {
    setPaymentDiscountModalOpen(false);
    setMonthlyBookingConfirmModalOpen(true);
  };

  return (
    <div>
      {/* Monthly Subscription Card */}
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
        <CardHeader className="text-left pb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div
              className="w-16 h-14 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#499FC0" }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Monthly Subscription
            </CardTitle>
          </div>
          <CardDescription className="text-base text-[#2F2F2F] mt-1">
            Save money with our monthly plan. Get 4 washes per month, one each
            week.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-[#499FC0]" />
              <span>Only $29/month for 4 washes</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-[#499FC0]" />
              <span>Flexible scheduling, change dates anytime</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="w-4 h-4 text-[#499FC0]" />
              <span>1 deep cleaning session</span>
            </div>
          </div>
          <Button
            onClick={() => setMonthlySubscribeOpen(true)}
            style={{ backgroundColor: "#499FC0" }}
            className="w-full hover:opacity-90 text-white h-[45px] text-lg font-semibold"
          >
            Get Monthly Subscription
          </Button>
        </CardContent>
      </Card>

      {/* Modals */}
      <>
        {monthlySubscribeOpen && (
          <MonthlySubscribe
            open={monthlySubscribeOpen}
            onOpenChange={setMonthlySubscribeOpen}
            onNext={() => {
              setMonthlySubscribeOpen(false);
              setMonthlySelectVehicleOpen(true);
            }}
          />
        )}

        {monthlySelectVehicleOpen && (
          <MonthlySelectVehicle
            open={monthlySelectVehicleOpen}
            onOpenChange={setMonthlySelectVehicleOpen}
            onNext={(vehicle) => {
              setSelectedVehicle(vehicle);
              setMonthlySelectVehicleOpen(false);
              setMonthlyWashTypeOpen(true);
            }}
          />
        )}

        {monthlyWashTypeOpen && (
          <MonthlyWashType
            open={monthlyWashTypeOpen}
            onOpenChange={setMonthlyWashTypeOpen}
            onNext={(service) => {
              setSelectedWashType(service);
              setMonthlyWashTypeOpen(false);
              setLocationModalOpen(true);
            }}
          />
        )}

        {locationModalOpen && (
          <MonthlyLocation
            open={locationModalOpen}
            onOpenChange={setLocationModalOpen}
            position={position}
            setPosition={setPosition}
            onNext={(location) => {
              setSelectedLocation(location);
              setLocationModalOpen(false);
              setMonthlyVehiclePhotosModalOpen(true);
            }}
          />
        )}

        {monthlyVehiclePhotosModalOpen && (
          <MonthlyVehiclePhotos
            open={monthlyVehiclePhotosModalOpen}
            onOpenChange={setMonthlyVehiclePhotosModalOpen}
            onNext={(details) => {
              setSelectedMonthlyVehiclePhoto(details);
              setMonthlyVehiclePhotosModalOpen(false);
              setDateSelectionModalOpen(true);
            }}
          />
        )}

        <div>
          <Loader loading={isPending} />
          {!isPending && dateSelectionModalOpen && (
            <MonthlySelectDate
              open={dateSelectionModalOpen}
              onOpenChange={setDateSelectionModalOpen}
              washtypeId={washtypeId || ""}
              serViceName={selectedWashType?.serviceName || ""}
              onNext={handleContinue}
            />
          )}
        </div>

        {paymentDiscountModalOpen && (
          <MonthlyPaymentDiscount
            bookingId={bookingId}
            totalPrice={totalPrice}
            open={paymentDiscountModalOpen}
            onOpenChange={setPaymentDiscountModalOpen}
            onNext={handlePaymentComplete}
          />
        )}

        {monthlyBookingConfirmModalOpen && (
          <MonthlyBookingConfirm
            open={monthlyBookingConfirmModalOpen}
            onOpenChange={setMonthlyBookingConfirmModalOpen}
            bookingId={bookingId}
            bookingDate={
              selectedDates?.length > 0
                ? selectedDates 
                : [{ date: "", timeSlot: "", steamWash: false, timeSlots: [] }] 
            }
            location={selectedLocation}
            serviceType={selectedWashType?.washType || ""}
          />
        )}
      </>
    </div>
  );
};

export default MonthlyService;
