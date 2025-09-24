"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"


export function PersonalInformation() {

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-06-15",
    streetAddress: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      toast.success("Profile updated successfully!")
      setIsEditing(false)
    }, 1000)
  }

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      fullName: "John Smith",
      email: "john.smith@example.com",
      phone: "(555) 123-4567",
      dateOfBirth: "1985-06-15",
      streetAddress: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    })
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 bg-[#F2F2F2] !border-none">
        <CardTitle className="text-[18px] font-semibold text-[#282828] ">Personal Information </CardTitle>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="text-white bg-[#499FC0] border-[#499FC0] hover:bg-[#499FC0]/90 hover:text-white "
          >
            Update profile
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-6 bg-white pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-normal text-[#499FC0]">
              Full Name
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              disabled={!isEditing}
              className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-normal text-[#499FC0]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={!isEditing}
            className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-normal text-[#499FC0]">
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              disabled={!isEditing}
            className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-normal text-[#499FC0]">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
              disabled={!isEditing}
             className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="streetAddress" className="text-sm font-normal text-[#499FC0]">
            Street Address
          </Label>
          <Input
            id="streetAddress"
            value={formData.streetAddress}
            onChange={(e) => handleInputChange("streetAddress", e.target.value)}
            disabled={!isEditing}
          className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-normal text-[#499FC0]">
              City
            </Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              disabled={!isEditing}
             className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-normal text-[#499FC0]">
              State
            </Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              disabled={!isEditing}
             className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-sm font-normal text-[#499FC0]">
              ZIP Code
            </Label>
            <Input
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleInputChange("zipCode", e.target.value)}
              disabled={!isEditing}
            className="disabled:bg-gray-50 disabled:text-gray-900 border border-[#0000004D] rounded-[8px] h-[50px]"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-[#499FC0] hover:bg-[#499FC0]/90">
              Update now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
