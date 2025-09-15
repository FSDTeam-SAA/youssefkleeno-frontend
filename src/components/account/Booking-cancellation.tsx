"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { AlertTriangle, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface BookingCancellationProps {
  bookingId: string
  onBack: () => void
}

export function BookingCancellation({ bookingId, onBack }: BookingCancellationProps) {
    console.log(bookingId)
  const [reason, setReason] = useState("")
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleCancelBooking = () => {
    setShowConfirmDialog(true)
  }

  const confirmCancellation = () => {
    // Simulate API call
    setTimeout(() => {
        toast.success("Booking cancelled successfully!")
      setShowConfirmDialog(false)
      onBack()
    }, 1000)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <X className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">Cancel Your Booking</CardTitle>
              <p className="text-gray-600 mt-1">
                Are you absolutely sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Water Wash</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">📅 Wash # 1 02/06/2025</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>9:00 AM-10:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">📅 Wash # 1 02/06/2025</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>9:00 AM-10:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">📅 Wash # 1 02/06/2025</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>9:00 AM-10:00 AM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">📅 Wash # 1 02/06/2025</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span>9:00 AM-10:00 AM</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-gray-600">📍 Location</span>
              </div>
              <div className="text-gray-600 ml-6">Home 123 Main St</div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-600">🚗 Vehicle</span>
              </div>
              <div className="text-gray-600 ml-6">Car</div>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Cancellation Policy</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>Our cancellation policy is as follows:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>More than 24 hours before: Full refund</li>
                <li>12-24 hours before: 75% refund</li>
                <li>6-12 hours before: 50% refund</li>
                <li>Less than 6 hours: 25% refund</li>
                <li>No show: No refund</li>
              </ul>
            </div>
          </div>

          {/* Refund Breakdown */}
          <div className="border-t pt-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Original Amount</span>
                <span className="font-medium text-green-600">$29.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cancellation Fee</span>
                <span className="font-medium text-red-600">-$5.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Refund Amount</span>
                <span className="text-green-600">$24.00</span>
              </div>
            </div>
          </div>

          {/* Reason for Cancellation */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Reason for Cancellation
            </Label>
            <Textarea
              id="reason"
              placeholder="Please tell us why you are cancelling..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={handleCancelBooking} className="flex-1">
              Cancel Booking
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              </div>
              <DialogTitle>Confirm Cancellation</DialogTitle>
            </div>
            <DialogDescription>
              Are you absolutely sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <div className="flex justify-between text-sm">
              <span>Original Amount</span>
              <span className="font-medium">$29.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cancellation Fee</span>
              <span className="font-medium text-red-600">-$5.00</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Refund Amount</span>
              <span className="text-green-600">$24.00</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Keep Booking
            </Button>
            <Button variant="destructive" onClick={confirmCancellation}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
