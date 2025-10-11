


"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import MonthlyPaymentDiscount from "@/app/(website)/_components/monthly-payment-discount";
import { toast } from "sonner";
import MonthlySelectDate, { SelectedDate } from "@/app/(website)/_components/text";
import { useMutation } from "@tanstack/react-query";

const Services = () => {
  const userId = `68bff87720fffa3bb06f1206`;

  // Step modals state
  const [monthlySubscribeOpen, setMonthlySubscribeOpen] = useState(false);
  const [monthlySelectVehicleOpen, setMonthlySelectVehicleOpen] = useState(false);
  const [monthlyWashTypeOpen, setMonthlyWashTypeOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [monthlyVehiclePhotosModalOpen, setMonthlyVehiclePhotosModalOpen] = useState(false);
  const [dateSelectionModalOpen, setDateSelectionModalOpen] = useState(false);
  const [paymentDiscountModalOpen, setPaymentDiscountModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Selected data state
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedWashType, setSelectedWashType] = useState<Service | null>(null);
  const [selectedMonthlyVehiclePhoto, setSelectedMonthlyVehiclePhoto] = useState<{
    photo: string | File;
    licensePlate: string;
  } | null>(null);
  console.log("Selected Vehicle Details:", selectedMonthlyVehiclePhoto);
  const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
  const washtypeId = selectedWashType?._id;

  // ✅ Booking API mutation
const { mutate } = useMutation({
  mutationKey: ["create-booking"],
  mutationFn: async () => {
    const formData = new FormData();
    formData.append("user", userId);
    formData.append("bookingType", "subscription");
    formData.append("licensePlate", selectedMonthlyVehiclePhoto?.licensePlate || "");
    formData.append("vehicle", selectedVehicle?._id || "");
    formData.append("location", JSON.stringify({ address: "welkj", lat: 3222, lng: 3232 }));
    formData.append("dates", JSON.stringify(
      selectedDates.map((d) => ({
        date: d.date,
        slot: d.timeSlot,
        wash_type: d.steamWash ? washtypeId : null,
      }))
    ));

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
  onError: (error: any) => {
    toast.error(error.message || "Booking failed!");
  },
});


  const handleContinue = (selectedDatesFromModal: SelectedDate[]) => {
    if (!selectedVehicle) return toast.error("Please select a vehicle!");
    if (!selectedWashType) return toast.error("Please select a wash type!");
    if (!selectedLocation) return toast.error("Please enter a location!");
    if (!selectedMonthlyVehiclePhoto) return toast.error("Please upload vehicle photos!");
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
          <div className="grid md:grid-cols-2 gap-8 mx-auto">
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
                  Save money with our monthly plan. Get 4 washes per month, one each week.
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

        {dateSelectionModalOpen && (
          <MonthlySelectDate
            open={dateSelectionModalOpen}
            onOpenChange={setDateSelectionModalOpen}
            washtypeId={washtypeId || ""}
            onNext={handleContinue}
          />
        )}

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

export default Services;





// "use client";
// import React, { useState } from "react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// export interface SelectedDate {
//   date: string; // e.g., "2025-10-09"
//   timeSlot: string; // e.g., "8:00 AM-10:00 AM"
//   steamWash: boolean; // Whether Steam Wash is selected
// }
// import { CheckCircle, Droplets, Calendar, Zap, Car } from "lucide-react";
// import { Button } from "./ui/button";
// import MonthlySubscribe from "@/app/(website)/_components/monthly-subscribe";
// import MonthlySelectVehicle, {
//   Vehicle,
// } from "@/app/(website)/_components/monthly-select-vehicle";
// import { Service } from "@/app/(website)/_components/monthly-wash-type";
// import MonthlyWashType from "@/app/(website)/_components/monthly-wash-type";
// import MonthlyLocation from "@/app/(website)/_components/monthly-location";
// import MonthlyVehiclePhotos from "@/app/(website)/_components/monthly-vehicle-photos";
// import MonthlySelectDate from "@/app/(website)/_components/text";
// const Services = () => {
//   const [monthlySubscribeOpen, setMonthlySubscribeOpen] = useState(false);
//   const [monthlySelectVehicleOpen, setMonthlySelectVehicleOpen] =
//     useState(false);
//   const [monthlyWashTypeOpen, setMonthlyWashTypeOpen] = useState(false);
//   const [locationModalOpen, setLocationModalOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   console.log("Selected Location:", selectedLocation);
//   const [monthlyVehiclePhotosModalOpen, setMonthlyVehiclePhotosModalOpen] =
//     useState(false);
//   const [selectedMonthlyVehiclePhoto, setSelectedMonthlyVehiclePhoto] =
//     useState<{
//       photoName: string;
//       licensePlate: string;
//     } | null>(null);
//   console.log("Selected Vehicle Details:", selectedMonthlyVehiclePhoto);

//   const [dateSelectionModalOpen, setDateSelectionModalOpen] = useState(false);
//   const [selectedDates, setSelectedDates] = useState<SelectedDate[]>([]);
//   console.log("Selected Dates:", selectedDates, setSelectedDates);

//   // ✅ store selected vehicle
//   const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
//   console.log("Selected Vehicle item:", selectedVehicle);

//   // store select wash type
//   const [selectedWashType, setSelectedWashType] = useState<Service | null>(
//     null
//   );

//   const washtypeId = selectedWashType?._id;
//   console.log("Selected Wash Type:", selectedWashType, washtypeId);

//   return (
//     <div>
//       {/* Services Section */}
//       <section id="services" className="py-16 lg:py-24 bg-gray-50">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-900 mb-4">
//               Our Services
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
//               Choose between a one-time wash or subscribe for regular cleaning
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8  mx-auto">
//             <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
//               <CardHeader className="text-left pb-6">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <div
//                     className="w-16 h-14 rounded-lg flex items-center justify-center"
//                     style={{ backgroundColor: "#499FC0" }}
//                   >
//                     <Calendar className="w-8 h-8 text-white" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xl font-semibold">
//                       Monthly Subscription
//                     </CardTitle>
//                   </div>
//                 </div>
//                 <CardDescription className="text-base text-[#2F2F2F] mt-1">
//                   Save money with our monthly plan. Get 4 washes per month, one
//                   each week.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
//                       <Calendar className="w-4 h-4 text-[#499FC0]" />
//                     </div>
//                     <span className="text-gray-700">
//                       Only $29/month for 4 washes
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
//                       <Calendar className="w-4 h-4  text-[#499FC0]" />
//                     </div>
//                     <span className="text-gray-700">
//                       Flexible scheduling, change dates anytime
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
//                       <Zap className="w-4 h-4  text-[#499FC0]" />
//                     </div>
//                     <span className="text-gray-700">
//                       1 deep cleaning session
//                     </span>
//                   </div>
//                 </div>
//                 <Button
//                   onClick={() => setMonthlySubscribeOpen(true)}
//                   style={{ backgroundColor: "#499FC0" }}
//                   className="w-full hover:opacity-90 text-white h-[45px] text-lg font-semibold"
//                 >
//                   Get Monthly Subscription
//                 </Button>
//               </CardContent>
//             </Card>

//             <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-[32px]">
//               <CardHeader className="text-left pb-6">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <div
//                     className="w-20 h-14 rounded-lg flex items-center justify-center"
//                     style={{ backgroundColor: "#499FC0" }}
//                   >
//                     <Car className="w-10 h-10 text-white" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-xl font-semibold">
//                       One-time Wash
//                     </CardTitle>
//                   </div>
//                 </div>
//                 <div>
//                   <CardDescription className="text-base text-[#2F2F2F] mt-1">
//                     Perfect for when you need a quick clean without commitment.
//                     Available for all vehicle types.
//                   </CardDescription>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
//                       <Droplets className="w-4 h-4  text-[#499FC0]" />
//                     </div>
//                     <span className="text-gray-700">
//                       Choose between eco-friendly dry wash or water wash
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
//                       <CheckCircle className="w-4 h-4  text-[#499FC0]" />
//                     </div>
//                     <span className="text-gray-700">
//                       We come to your location
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-6 h-6 rounded-full   flex items-center justify-center flex-shrink-0">
//                       <Calendar className="w-4 h-4  text-[#499FC0]" />
//                     </div>
//                     <span className="text-gray-700">
//                       Schedule at your convenience
//                     </span>
//                   </div>
//                 </div>
//                 <Button
//                   style={{ backgroundColor: "#499FC0" }}
//                   className="w-full hover:opacity-90 text-white h-[45px] text-lg font-semibold"
//                 >
//                   Book a One-time Wash
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* monthly subscribe modal  */}
//       <>
//         {monthlySubscribeOpen && (
//           <MonthlySubscribe
//             open={monthlySubscribeOpen}
//             onOpenChange={setMonthlySubscribeOpen}
//             onNext={() => {
//               setMonthlySubscribeOpen(false);
//               setMonthlySelectVehicleOpen(true);
//             }}
//           />
//         )}

//         {/* monthly select vehicle modal  */}
//         {monthlySelectVehicleOpen && (
//           <MonthlySelectVehicle
//             open={monthlySelectVehicleOpen}
//             onOpenChange={setMonthlySelectVehicleOpen}
//             onNext={(vehicle) => {
//               setSelectedVehicle(vehicle); // store vehicle
//               setMonthlySelectVehicleOpen(false);
//               setMonthlyWashTypeOpen(true); // open wash type modal only after Continue
//             }}
//           />
//         )}

//         {/* monthly select wash type modal  */}
//         {monthlyWashTypeOpen && (
//           <MonthlyWashType
//             open={monthlyWashTypeOpen}
//             onOpenChange={setMonthlyWashTypeOpen}
//             onNext={(service) => {
//               setSelectedWashType(service); // store selected wash type
//               setMonthlyWashTypeOpen(false);
//               setLocationModalOpen(true);
//             }}
//           />
//         )}

//         {/* monthly location modal  */}
//         {locationModalOpen && (
//           <MonthlyLocation
//             open={locationModalOpen}
//             onOpenChange={setLocationModalOpen}
//             onNext={(location) => {
//               setSelectedLocation(location);
//               setLocationModalOpen(false);
//               setMonthlyVehiclePhotosModalOpen(true);
//             }}
//           />
//         )}

//         {/* monthly vehicle photos modal */}
//         {monthlyVehiclePhotosModalOpen && (
//           <MonthlyVehiclePhotos
//             open={monthlyVehiclePhotosModalOpen}
//             onOpenChange={setMonthlyVehiclePhotosModalOpen}
//             onNext={(details) => {
//               setSelectedMonthlyVehiclePhoto(details);
//               setMonthlyVehiclePhotosModalOpen(false);
//               setDateSelectionModalOpen(true);
//             }}
//           />
//         )}

//         {dateSelectionModalOpen && (
//           <MonthlySelectDate
//             open={dateSelectionModalOpen}
//             onOpenChange={setDateSelectionModalOpen}
//             washtypeId={washtypeId || ""}
//             onNext={(selectedDates) => {
//               // setSelectedDates(selectedDates);
//               // Proceed to payment or final submission here
//               console.log("Dates selected. Proceed to payment.", selectedDates);
//             }}
            
//           />
//         )}
//       </>
//     </div>
//   );
// };

// export default Services;
