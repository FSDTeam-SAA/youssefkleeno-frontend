"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Droplets, Calendar, Car } from "lucide-react";
import { Button } from "./ui/button";
import { Vehicle } from "@/app/(website)/_components/monthly-select-vehicle";
import { Service } from "@/app/(website)/_components/monthly-wash-type";
import MonthlyVehiclePhotos from "@/app/(website)/_components/monthly-vehicle-photos";
import MonthlyPaymentDiscount from "@/app/(website)/_components/monthly-payment-discount";
import { toast } from "sonner";
import { SelectedDate } from "@/app/(website)/_components/text";
import { useMutation } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import MonthlySelectDate from "@/app/(website)/_components/monthly-select-date";
import Loader from "./Loader";
import OneTimeSelectVehicle from "@/app/(website)/_components/one-time-select-vehicle";
import OneTimeWashType from "@/app/(website)/_components/one-time-wash-type";

const OneTimeLocation = dynamic(
  () => import("@/app/(website)/_components/one-time-location"),
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

const OneTimeService = () => {
  const userId = `68bff87720fffa3bb06f1206`;

  // Step modals state
  const [oneTimeSelectVehicleOpen, setOneTimeSelectVehicleOpen] =
    useState(false);
  const [oneTimeWashTypeOpen, setOneTimeWashTypeOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [monthlyVehiclePhotosModalOpen, setMonthlyVehiclePhotosModalOpen] =
    useState(false);
  const [dateSelectionModalOpen, setDateSelectionModalOpen] = useState(false);
  const [paymentDiscountModalOpen, setPaymentDiscountModalOpen] =
    useState(false);

  // Selected data state
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedWashType, setSelectedWashType] = useState<Service | null>(
    null
  );
  const [selectedMonthlyVehiclePhoto, setSelectedMonthlyVehiclePhoto] =
    useState<{
      photo: string | File;
      licensePlate: string;
    } | null>(null);
  console.log("Selected Vehicle Details:", selectedMonthlyVehiclePhoto);
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  // ✅ Position state lifted up here
  const [position, setPosition] = useState<[number, number]>(defaultPosition);

  console.log(position);
  const washtypeId = selectedWashType?._id;
  const [bookingId, setBookingId] = useState("");
  console.log("select location", selectedLocation);

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
    toast.success("Payment successful! Subscription activated.");
  };
  return (
    <div>
      {/* One-time Wash Card */}
      <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
        <CardHeader className="text-left pb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div
              className="w-20 h-14 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "#499FC0" }}
            >
              <Car className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-xl font-semibold">
              One-time Wash
            </CardTitle>
          </div>
          <CardDescription className="text-base text-[#2F2F2F] mt-1">
            Perfect for when you need a quick clean without commitment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Droplets className="w-4 h-4 text-[#499FC0]" />
              <span>Choose between eco or water wash</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-4 h-4 text-[#499FC0]" />
              <span>We come to your location</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-[#499FC0]" />
              <span>Schedule at your convenience</span>
            </div>
          </div>
          <Button
            onClick={() => setOneTimeSelectVehicleOpen(true)}
            style={{ backgroundColor: "#499FC0" }}
            className="w-full hover:opacity-90 text-white h-[45px] text-lg font-semibold"
          >
            Book a One-time Wash
          </Button>
        </CardContent>
      </Card>

      {/* Modals */}
      <>
        {oneTimeSelectVehicleOpen && (
          <OneTimeSelectVehicle
            open={oneTimeSelectVehicleOpen}
            onOpenChange={setOneTimeSelectVehicleOpen}
            onNext={(vehicle) => {
              setSelectedVehicle(vehicle);
              setOneTimeSelectVehicleOpen(false);
              setOneTimeWashTypeOpen(true);
            }}
          />
        )}

        {oneTimeWashTypeOpen && (
          <OneTimeWashType
            open={oneTimeWashTypeOpen}
            onOpenChange={setOneTimeWashTypeOpen}
            onNext={(service) => {
              setSelectedWashType(service);
              setOneTimeWashTypeOpen(false);
              setLocationModalOpen(true);
            }}
          />
        )}

        {locationModalOpen && (
          <OneTimeLocation
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
              onNext={handleContinue}
            />
          )}
        </div>

        {paymentDiscountModalOpen && (
          <MonthlyPaymentDiscount
            bookingId={bookingId}
            open={paymentDiscountModalOpen}
            onOpenChange={setPaymentDiscountModalOpen}
            onNext={handlePaymentComplete}
          />
        )}
      </>
    </div>
  );
};

export default OneTimeService;
