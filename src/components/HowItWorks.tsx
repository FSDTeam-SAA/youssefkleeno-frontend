import React from 'react'

import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Car, CheckCircle, CreditCard, Droplet, MapPin } from 'lucide-react'

const HowItWorks = () => {
  return (
    <div>

      {/* Redesigned How It Works Section with better grid layout and visual flow */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 text-balance">Getting your car washed has never been easier</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto">
            {/* Step 1 */}
            <Card className="text-left border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className="w-14 h-14 text-white rounded-md flex items-center justify-center text-xl font-semibold "
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Car className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Choose Your Service</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Select between one-time wash or monthly subscription based on your needs
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-left border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className="w-14 h-14 text-white rounded-md flex items-center justify-center text-xl font-semibold "
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Droplet className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Select Vehicle & Wash Type</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Choose your vehicle type and preferred wash method</p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-left border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className="w-14 h-14 text-white rounded-md flex items-center justify-center text-xl font-semibold "
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <MapPin className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Set Location</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Pin your location on the map or enter address manually</p>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-left border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className="w-14 h-14 text-white rounded-md flex items-center justify-center text-xl font-semibold "
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <Calendar className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Schedule</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Pick a convenient date and time for your car wash</p>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="text-left border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className="w-14 h-14 text-white rounded-md flex items-center justify-center text-xl font-semibold "
                    style={{ backgroundColor: "#499FC0" }}
                  >
                   <CreditCard className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Payment</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Secure payment through our platform</p>
              </CardContent>
            </Card>

            {/* Step 6 */}
            <Card className="text-left border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div
                    className="w-14 h-14 text-white rounded-md flex items-center justify-center text-xl font-semibold "
                    style={{ backgroundColor: "#499FC0" }}
                  >
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">Confirmation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Receive confirmation and enjoy your clean car</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}

export default HowItWorks