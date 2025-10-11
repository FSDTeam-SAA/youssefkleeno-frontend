"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface SelectedDate {
  date: string; // e.g., "2025-10-09"
  timeSlot: string; // e.g., "8:00 AM-10:00 AM"
  steamWash: boolean; // Whether Steam Wash is selected
}
import { CheckCircle, Droplets, Calendar, Zap, Car } from "lucide-react";
import { Button } from "./ui/button";
import MonthlySubscribe from "@/app/(website)/_components/monthly-subscribe";
import MonthlySelectVehicle, {
  Vehicle,
} from "@/app/(website)/_components/monthly-select-vehicle";
import { Service } from "@/app/(website)/_components/monthly-wash-type";
import MonthlyWashType from "@/app/(website)/_components/monthly-wash-type";
import MonthlyLocation from "@/app/(website)/_components/monthly-location";
import MonthlyVehiclePhotos from "@/app/(website)/_components/monthly-vehicle-photos";
import MonthlySelectDate from "@/app/(website)/_components/text";
const Services = () => {
  const [monthlySubscribeOpen, setMonthlySubscribeOpen] = useState(false);
  const [monthlySelectVehicleOpen, setMonthlySelectVehicleOpen] =
    useState(false);
  const [monthlyWashTypeOpen, setMonthlyWashTypeOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  console.log("Selected Location:", selectedLocation);
  const [monthlyVehiclePhotosModalOpen, setMonthlyVehiclePhotosModalOpen] =
    useState(false);
  const [selectedMonthlyVehiclePhoto, setSelectedMonthlyVehiclePhoto] =
    useState<{
      photoName: string;
      licensePlate: string;
    } | null>(null);
  console.log("Selected Vehicle Details:", selectedMonthlyVehiclePhoto);

  const [dateSelectionModalOpen, setDateSelectionModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  console.log("Selected Dates:", selectedDates, setSelectedDates);

  // ✅ store selected vehicle
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  console.log("Selected Vehicle item:", selectedVehicle);

  // store select wash type
  const [selectedWashType, setSelectedWashType] = useState<Service | null>(
    null
  );

  const washtypeId = selectedWashType?._id;
  console.log("Selected Wash Type:", selectedWashType, washtypeId);

  return (
    <div>
      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              Choose between a one-time wash or subscribe for regular cleaning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8  mx-auto">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
              <CardHeader className="text-left pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className="w-16 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">
                      Monthly Subscription
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-base text-[#2F2F2F] mt-1">
                  Save money with our monthly plan. Get 4 washes per month, one
                  each week.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-[#499FC0]" />
                    </div>
                    <span className="text-gray-700">
                      Only $29/month for 4 washes
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4  text-[#499FC0]" />
                    </div>
                    <span className="text-gray-700">
                      Flexible scheduling, change dates anytime
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4  text-[#499FC0]" />
                    </div>
                    <span className="text-gray-700">
                      1 deep cleaning session
                    </span>
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

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
              <CardHeader className="text-left pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className="w-20 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Car className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">
                      One-time Wash
                    </CardTitle>
                  </div>
                </div>
                <div>
                  <CardDescription className="text-base text-[#2F2F2F] mt-1">
                    Perfect for when you need a quick clean without commitment.
                    Available for all vehicle types.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4  text-[#499FC0]" />
                    </div>
                    <span className="text-gray-700">
                      Choose between eco-friendly dry wash or water wash
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4  text-[#499FC0]" />
                    </div>
                    <span className="text-gray-700">
                      We come to your location
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4  text-[#499FC0]" />
                    </div>
                    <span className="text-gray-700">
                      Schedule at your convenience
                    </span>
                  </div>
                </div>
                <Button
                  style={{ backgroundColor: "#499FC0" }}
                  className="w-full hover:opacity-90 text-white h-[45px] text-lg font-semibold"
                >
                  Book a One-time Wash
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* monthly subscribe modal  */}
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

        {/* monthly select vehicle modal  */}
        {monthlySelectVehicleOpen && (
          <MonthlySelectVehicle
            open={monthlySelectVehicleOpen}
            onOpenChange={setMonthlySelectVehicleOpen}
            onNext={(vehicle) => {
              setSelectedVehicle(vehicle); // store vehicle
              setMonthlySelectVehicleOpen(false);
              setMonthlyWashTypeOpen(true); // open wash type modal only after Continue
            }}
          />
        )}

        {/* monthly select wash type modal  */}
        {monthlyWashTypeOpen && (
          <MonthlyWashType
            open={monthlyWashTypeOpen}
            onOpenChange={setMonthlyWashTypeOpen}
            onNext={(service) => {
              setSelectedWashType(service); // store selected wash type
              setMonthlyWashTypeOpen(false);
              setLocationModalOpen(true);
            }}
          />
        )}

        {/* monthly location modal  */}
        {locationModalOpen && (
          <MonthlyLocation
            open={locationModalOpen}
            onOpenChange={setLocationModalOpen}
            onNext={(location) => {
              setSelectedLocation(location);
              setLocationModalOpen(false);
              setMonthlyVehiclePhotosModalOpen(true);
            }}
          />
        )}

        {/* monthly vehicle photos modal */}
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

        {dateSelectionModalOpen && (
          <MonthlySelectDate
            open={dateSelectionModalOpen}
            onOpenChange={setDateSelectionModalOpen}
            washtypeId={washtypeId || ""}
            onNext={(selectedDates) => {
              // setSelectedDates(selectedDates);
              // Proceed to payment or final submission here
              console.log("Dates selected. Proceed to payment.", selectedDates);
            }}
            
          />
        )}
      </>
    </div>
  );
};

export default Services;
