// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, MapPin, Car, ChevronRight } from "lucide-react"


// interface Booking {
//   id: string
//   service: string
//   date: string
//   time: string
//   location: string
//   vehicle: string
//   status: "confirmed" | "completed" | "cancelled"
//   price: number
// }

// interface MyBookingsProps {
//   onViewBooking: (bookingId: string) => void
//   onCancelBooking: (bookingId: string) => void
// }

// const mockBookings: Booking[] = [
//   {
//     id: "BK9520",
//     service: "Subscription Wash",
//     date: "02/06/2025",
//     time: "9:00 AM-10:00 AM",
//     location: "Home 123 Main St",
//     vehicle: "Car",
//     status: "confirmed",
//     price: 29,
//   },
//   {
//     id: "BK9521",
//     service: "Subscription Wash",
//     date: "02/06/2025",
//     time: "9:00 AM-10:00 AM",
//     location: "Home 123 Main St",
//     vehicle: "Car",
//     status: "confirmed",
//     price: 29,
//   },
// ]

// export function MyBookings({ onViewBooking, onCancelBooking }: MyBookingsProps) {
//    console.log(onViewBooking)
//   const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "confirmed":
//         return "bg-[#16A34A33] text-[#16A34A] border-green-200 h-[34px] px-5 rounded-[999px] hover:bg-[#16A34A33] "
//       case "completed":
//         return "bg-blue-100 text-blue-800 border-blue-200 h-[34px] px-5 rounded-[999px]"
//       case "cancelled":
//         return "bg-red-100 text-red-800 border-red-200 h-[34px] px-5 rounded-[999px]"
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200 h-[34px] px-5 rounded-[999px]"
//     }
//   }

//   const handleViewDetails = (bookingId: string) => {
//     setSelectedBooking(bookingId)
//   }

//   const renderBookingList = () => (
//     <div className="space-y-4">
//       {mockBookings.map((booking) => (
//         <Card key={booking.id} className="hover:shadow-md transition-shadow">
//           <CardContent className="p-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-[#499FC033] rounded-lg flex items-center justify-center">
//                   <Calendar className="h-4 w-4 text-[#499FC0]" />
//                 </div>
//                 <div>
//                   <h3 className="font-medium text-base text-[#2F2F2F]">{booking.service}</h3>
                
//                 </div>
//               </div>
              
//               <Badge className={getStatusColor(booking.status)}>
//                 {booking.status === "confirmed" ? "Confirmed" : booking.status}
//               </Badge>
//             </div>

//             <div className="space-y-2 text-sm text-gray-600 mb-4 border-b pb-4">
//               <p className="text-base text-[#2F2F2F] font-medium">Total Paid <span className="font-bold text-[#2F2F2F]">${booking.price}</span></p>
           
//             </div>

//             <Button variant="outline" onClick={() => handleViewDetails(booking.id)} className="w-full text-base text-[#2F2F2F] font-medium justify-between border-none shadow-none hover:bg-transparent p-0">
//               <div>
//                Booking ID:<span className="font-bold text-[#2F2F2F]">{booking.id}</span>
//               </div>
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )

//   const renderBookingDetails = () => {
//     const booking = mockBookings.find((b) => b.id === selectedBooking)
//     if (!booking) return null

//     return (
//       <Card className="p-6">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
//           <div>
//             <CardTitle className="text-xl font-semibold text-[#2F2F2F]">Booking # {booking.id}</CardTitle>
//             <Badge className={`${getStatusColor(booking.status)} mt-2`}>
//               {booking.status === "confirmed" ? "Confirmed" : booking.status}
//             </Badge>
//           </div>
//           <Button variant="outline" onClick={() => setSelectedBooking(null)}>
//             Back to Bookings
//           </Button>
//         </CardHeader>

//         <CardContent className="space-y-6 border py-6 rounded-[6px] ">
//           <div>
//             <h3 className="font-medium text-gray-900 mb-4">{booking.service}</h3>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3 p-3  rounded-lg">
//                 <Calendar className="h-5 w-5 text-gray-600" />
//                 <div>
//                   <p className="font-medium">Wash # 1 {booking.date}</p>
//                   <p className="text-sm text-gray-600">{booking.time}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-3  rounded-lg">
//                 <Calendar className="h-5 w-5 text-gray-600" />
//                 <div>
//                   <p className="font-medium">Wash # 1 {booking.date}</p>
//                   <p className="text-sm text-gray-600">{booking.time}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-3  rounded-lg">
//                 <Calendar className="h-5 w-5 text-gray-600" />
//                 <div>
//                   <p className="font-medium">Wash # 1 {booking.date}</p>
//                   <p className="text-sm text-gray-600">{booking.time}</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 p-3  rounded-lg">
//                 <Calendar className="h-5 w-5 text-gray-600" />
//                 <div>
//                   <p className="font-medium">Wash # 1 {booking.date}</p>
//                   <p className="text-sm text-gray-600">{booking.time}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3 p-3">
//             <div className="flex items-center gap-3">
//               <MapPin className="h-5 w-5 text-gray-600" />
//               <div>
//                 <p className=" font-medium">Location</p>
//                 <p className="text-sm text-gray-600">{booking.location}</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Car className="h-5 w-5 text-gray-600" />
//               <div>
//                 <p className=" font-medium">Vehicle</p>
//                 <p className="text-sm text-gray-600">{booking.vehicle}</p>
//               </div>
//             </div>
//           </div>

//           <div className="border-t pt-4">
//             <div className="flex justify-between items-center mb-4">
//               <span className="font-medium">Total Paid</span>
//               <span className="font-semibold text-lg">${booking.price}</span>
//             </div>

//             <div className="flex gap-3">
//               <Button
//                 variant="outline"
//                 className="flex-1 text-white border-blue-200 hover:bg-[#499FC0]/90 hover:text-white bg-transparent h-[50px] bg-[#499FC0]"
//               >
//                 Modify Booking
//               </Button>
//               <Button variant="destructive" className="flex-1 h-[50px] bg-[#D90202]/90" onClick={() => onCancelBooking(booking.id)}>
//                 Cancel Booking
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <div>
//       {selectedBooking ? (
//         renderBookingDetails()
//       ) : (
//         <div>
//           <CardContent>{renderBookingList()}</CardContent>
//         </div>
//       )}
//     </div>
//   )
// }



"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Car, ChevronRight } from "lucide-react"

// Define TypeScript interfaces for API response
interface WashType {
  _id: string
  serviceName: string
}

interface BookingDate {
  date: string
  slot: string
  wash_type: WashType
  _id: string
}

interface Location {
  address: string
  lat: number
  lng: number
}

interface User {
  _id: string
  name: string
  email: string
}

interface Vehicle {
  _id: string
}

interface ApiBooking {
  _id: string
  user: User
  bookingType: string
  licensePlate: string
  vehicle: Vehicle
  dates: BookingDate[]
  price: number
  payment_status: "pending" | "confirmed" | "completed" | "cancelled"
  location: Location
  createdAt: string
  updatedAt: string
  __v: number
}

interface ApiResponse {
  success: boolean
  message: string
  data: ApiBooking[]
}

// Interface for the component's booking data
interface Booking {
  id: string
  service: string
  date: string
  time: string
  location: string
  vehicle: string
  status: "confirmed" | "completed" | "cancelled" | "pending"
  price: number
}

interface MyBookingsProps {
  onViewBooking: (bookingId: string) => void
  onCancelBooking: (bookingId: string) => void
}

// Function to fetch bookings from API
const fetchBookings = async (): Promise<ApiResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`)
  if (!response.ok) {
    throw new Error("Failed to fetch bookings")
  }
  return response.json()
}

export function MyBookings({ onViewBooking, onCancelBooking }: MyBookingsProps) {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  // Use TanStack Query to fetch bookings
  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  })

  // Map API data to component's Booking interface
  const bookings: Booking[] = data?.data?.map((apiBooking: ApiBooking) => ({
    id: apiBooking._id,
    service: apiBooking.dates[0]?.wash_type.serviceName || "Unknown Service",
    date: apiBooking.dates[0]?.date
      ? new Date(apiBooking.dates[0].date).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      : "N/A",
    time: apiBooking.dates[0]?.slot || "N/A",
    location: apiBooking.location.address || "Unknown Location",
    vehicle: apiBooking.licensePlate || "Unknown Vehicle",
    status: apiBooking.payment_status,
    price: apiBooking.price,
  })) || []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-[#16A34A33] text-[#16A34A] border-green-200 h-[34px] px-5 rounded-[999px] hover:bg-[#16A34A33]"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200 h-[34px] px-5 rounded-[999px]"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200 h-[34px] px-5 rounded-[999px]"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 h-[34px] px-5 rounded-[999px]"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 h-[34px] px-5 rounded-[999px]"
    }
  }

  const handleViewDetails = (bookingId: string) => {
    setSelectedBooking(bookingId)
    onViewBooking(bookingId)
  }

  const renderBookingList = () => {
    if (isLoading) {
      return <div>Loading bookings...</div>
    }

    if (error) {
      return <div>Error loading bookings: {(error as Error).message}</div>
    }

    if (bookings.length === 0) {
      return <div>No bookings found.</div>
    }

    return (
      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#499FC033] rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-[#499FC0]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-base text-[#2F2F2F]">{booking.service}</h3>
                  </div>
                </div>
                <Badge className={getStatusColor(booking.status)}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4 border-b pb-4">
                <p className="text-base text-[#2F2F2F] font-medium">
                  Total Paid <span className="font-bold text-[#2F2F2F]">${booking.price}</span>
                </p>
              </div>

              <Button
                variant="outline"
                onClick={() => handleViewDetails(booking.id)}
                className="w-full text-base text-[#2F2F2F] font-medium justify-between border-none shadow-none hover:bg-transparent p-0"
              >
                <div>
                  Booking ID: <span className="font-bold text-[#2F2F2F]">{booking.id}</span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const renderBookingDetails = () => {
    const booking = bookings.find((b) => b.id === selectedBooking)
    if (!booking) return null

    return (
      <Card className="p-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-xl font-semibold text-[#2F2F2F]">Booking # {booking.id}</CardTitle>
            <Badge className={`${getStatusColor(booking.status)} mt-2`}>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
          <Button variant="outline" onClick={() => setSelectedBooking(null)}>
            Back to Bookings
          </Button>
        </CardHeader>

        <CardContent className="space-y-6 border py-6 rounded-[6px]">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{booking.service}</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Wash #1 {booking.date}</p>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-gray-600">{booking.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Car className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium">Vehicle</p>
                <p className="text-sm text-gray-600">{booking.vehicle}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Total Paid</span>
              <span className="font-semibold text-lg">${booking.price}</span>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 text-white border-blue-200 hover:bg-[#499FC0]/90 hover:text-white bg-transparent h-[50px] bg-[#499FC0]"
              >
                Modify Booking
              </Button>
              <Button
                variant="destructive"
                className="flex-1 h-[50px] bg-[#D90202]/90"
                onClick={() => onCancelBooking(booking.id)}
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      {selectedBooking ? (
        renderBookingDetails()
      ) : (
        <div>
          <CardContent>{renderBookingList()}</CardContent>
        </div>
      )}
    </div>
  )
}