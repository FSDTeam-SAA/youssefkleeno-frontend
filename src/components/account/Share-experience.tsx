"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { Star } from "lucide-react"
import { toast } from "sonner"

export function ShareExperience() {

  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [description, setDescription] = useState("")

  const handleStarClick = (starRating: number) => {
    setRating(starRating)
  }

  const handleStarHover = (starRating: number) => {
    setHoveredRating(starRating)
  }

  const handleStarLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please rate us!")
      return
    }

    if (description.trim().length < 10) {
     toast.success("Review submitted successfully!")
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast.success("Review submitted successfully!")
      setRating(0)
      setDescription("")
    }, 1000)
  }

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return "Rate Us"
    }
  }

  return (
    <Card>
      <CardHeader className="bg-[#F2F2F2] !border-none">
        <CardTitle className="text-xl font-semibold text-[#282828]">Write a Natural Review</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3 mt-10">
          <Label className="text-xl font-medium text-[#333333]">Rate Us</Label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = star <= (hoveredRating || rating)
              return (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className="transition-colors duration-150"
                >
                  <Star
                    className={`h-8 w-8 ${
                      isActive ? "fill-[#FACC15] text-[#FACC15]" : "text-[#FACC15] hover:text-[#FACC15]/90"
                    }`}
                  />
                </button>
              )
            })}
            <span className="ml-3 text-sm font-medium text-gray-700">{getRatingText(hoveredRating || rating)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-xl font-medium text-[#333333">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Tell us about your experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          <p className="text-xs text-gray-500">{description.length}/500 characters</p>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-[#499FC0] hover:bg-[#499FC0]/90 text-white py-2 rounded-[6px] px-8"
            disabled={rating === 0 || description.trim().length < 10}
          >
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
