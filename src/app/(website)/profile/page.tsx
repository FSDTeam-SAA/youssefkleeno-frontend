"use client"

import { AccountSidebar } from "@/components/account/Account-sidebar"
import { BookingCancellation } from "@/components/account/Booking-cancellation"
import { MyBookings } from "@/components/account/My-bookings"
import { PersonalInformation } from "@/components/account/Personal-information"
import { SecuritySettings } from "@/components/account/Security-settings"
import { ShareExperience } from "@/components/account/Share-experience"
import { useState } from "react"


export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("personal-information")
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)
  const [showCancellation, setShowCancellation] = useState(false)

  const renderContent = () => {
    if (showCancellation && selectedBooking) {
      return (
        <BookingCancellation
          bookingId={selectedBooking}
          onBack={() => {
            setShowCancellation(false)
            setSelectedBooking(null)
          }}
        />
      )
    }

    switch (activeSection) {
      case "personal-information":
        return <PersonalInformation/>
      case "security":
        return <SecuritySettings />
      case "my-bookings":
        return (
          <MyBookings
            onViewBooking={(bookingId) => setSelectedBooking(bookingId)}
            onCancelBooking={(bookingId) => {
              setSelectedBooking(bookingId)
              setShowCancellation(true)
            }}
          />
        )
      case "share-experience":
        return <ShareExperience />
      default:
        return <PersonalInformation />
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#499FC0] text-balance">Account Settings</h1>
          <p className="text-[18px] text-[#282828] font-medium mt-4">Manage your account preferences and information</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <AccountSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>

          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
