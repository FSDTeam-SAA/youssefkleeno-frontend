import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { CheckCircle,  Droplets,  Calendar, Zap } from "lucide-react"
import { Button } from './ui/button'
const Services = () => {
  return (
    <div>

       {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              Choose between a one-time wash or subscribe for regular cleaning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-left pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className="w-16 h-14 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">Monthly Subscription</CardTitle>
                 
                  </div>
                </div>
                   <CardDescription className="text-base mt-1">
                      Save money with our monthly plan. Get 4 washes per month, one each week.
                    </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Only $29/month for 4 washes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Flexible scheduling, change dates anytime</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">1 deep cleaning session</span>
                  </div>
                </div>
                <Button
                  style={{ backgroundColor: "#499FC0" }}
                  className="w-full hover:opacity-90 text-white py-3 text-lg font-semibold"
                >
                  Get Monthly Subscription
                </Button>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-left pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Droplets className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">One-time Wash</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Perfect for when you need a quick clean without commitment. Available for all vehicle types.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Choose between eco-friendly dry wash or water wash</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">We come to your location</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-gray-700">Schedule at your convenience</span>
                  </div>
                </div>
                <Button
                  style={{ backgroundColor: "#499FC0" }}
                  className="w-full hover:opacity-90 text-white py-3 text-lg font-semibold"
                >
                  Book a One-time Wash
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services