import React from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { CheckCircle,  Droplets,  Calendar } from "lucide-react"
import { Button } from './ui/button'
const Services = () => {
  return (
    <div>

            {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose between a one-time wash or subscribe for regular cleaning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Subscription */}
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">Monthly Subscription</CardTitle>
                <CardDescription>
                  Get your car washed regularly with monthly subscription and save money
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Flexible scheduling, manage dates online</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Easy cleaning report</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Get Monthly Subscription</Button>
              </CardContent>
            </Card>

            {/* One-time Wash */}
            <Card className="relative overflow-hidden">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-blue-500" />
                </div>
                <CardTitle className="text-2xl">One-time Wash</CardTitle>
                <CardDescription>
                  Perfect for special occasions or when you need a quick car wash without commitment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">Same day service available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">No commitment required</span>
                  </div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600">Book One-time Wash</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services