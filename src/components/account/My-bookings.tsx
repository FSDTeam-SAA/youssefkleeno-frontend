"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Car, ChevronRight } from "lucide-react"


interface Booking {
  id: string
  service: string
  date: string
  time: string
  location: string
  vehicle: string
  status: "confirmed" | "completed" | "cancelled"
  price: number
}

interface MyBookingsProps {
  onViewBooking: (bookingId: string) => void
  onCancelBooking: (bookingId: string) => void
}

const mockBookings: Booking[] = [
  {
    id: "BK9520",
    service: "Subscription Wash",
    date: "02/06/2025",
    time: "9:00 AM-10:00 AM",
    location: "Home 123 Main St",
    vehicle: "Car",
    status: "confirmed",
    price: 29,
  },
  {
    id: "BK9521",
    service: "Subscription Wash",
    date: "02/06/2025",
    time: "9:00 AM-10:00 AM",
    location: "Home 123 Main St",
    vehicle: "Car",
    status: "confirmed",
    price: 29,
  },
]

export function MyBookings({ onViewBooking, onCancelBooking }: MyBookingsProps) {
   console.log(onViewBooking)
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleViewDetails = (bookingId: string) => {
    setSelectedBooking(bookingId)
  }

  const renderBookingList = () => (
    <div className="space-y-4">
      {mockBookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{booking.service}</h3>
                  <p className="text-sm text-gray-500">Total Paid ${booking.price}</p>
                </div>
              </div>
              <Badge className={getStatusColor(booking.status)}>
                {booking.status === "confirmed" ? "Confirmed" : booking.status}
              </Badge>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Booking ID: {booking.id}</span>
              </div>
            </div>

            <Button variant="outline" onClick={() => handleViewDetails(booking.id)} className="w-full justify-between">
              View Details
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderBookingDetails = () => {
    const booking = mockBookings.find((b) => b.id === selectedBooking)
    if (!booking) return null

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div>
            <CardTitle className="text-xl font-semibold">Booking # {booking.id}</CardTitle>
            <Badge className={`${getStatusColor(booking.status)} mt-2`}>
              {booking.status === "confirmed" ? "Confirmed" : booking.status}
            </Badge>
          </div>
          <Button variant="outline" onClick={() => setSelectedBooking(null)}>
            Back to Bookings
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-4">{booking.service}</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Wash # 1 {booking.date}</p>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Wash # 1 {booking.date}</p>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Wash # 1 {booking.date}</p>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium">Wash # 1 {booking.date}</p>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-gray-600">{booking.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Car className="h-4 w-4 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Vehicle</p>
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
                className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
              >
                Modify Booking
              </Button>
              <Button variant="destructive" className="flex-1" onClick={() => onCancelBooking(booking.id)}>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">My Bookings</CardTitle>
          </CardHeader>
          <CardContent>{renderBookingList()}</CardContent>
        </Card>
      )}
    </div>
  )
}
