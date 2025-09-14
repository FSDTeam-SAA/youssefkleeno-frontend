import React from 'react'
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import {   Droplet, Leaf,  Zap } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
const WashType = () => {
  return (
    <div>

   <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-900 mb-4">Our Wash Type</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Dry Wash */}
            <Card className="text-left border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Dry Wash</CardTitle>
                </div>
                <p className="text-gray-600">Eco-friendly wash without using water</p>
              </CardHeader>
              <CardContent>
                <Badge  className="h-5 bg-[#039A0633] text-[#039A06] text-md  min-w-5 rounded-full px-4 py-4 font-mono tabular-nums shadow-none"
          variant="destructive">Eco-friendly</Badge> 
              </CardContent>
            </Card>

            {/* Water Wash */}
            <Card className="text-left border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Droplet className="w-8 h-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Water Wash</CardTitle>
                </div>
                <p className="text-gray-600 mb-4">Water Wash</p>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800 font-medium">
                    <strong>Note:</strong> Only available if your location permits water usage. We'll confirm this after
                    you select your location.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Steam Wash */}
            <Card className="text-left border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-xl font-bold">Steam Wash</CardTitle>
                </div>
                <p className="text-gray-600 mb-4">Deep cleaning with steam technology</p>
              </CardHeader>
              <CardContent>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <p className="text-sm text-orange-800 font-medium">
                    <strong>Note:</strong> One of the four wash options will include a Steam Wash.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WashType