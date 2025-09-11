

import { Button } from "@/components/ui/button"
import { Car,} from "lucide-react"
import React from 'react'

const Navbar = () => {
  return (
    <div>
           {/* Navigation */}
<nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className=" rounded-full flex items-center justify-center">
          {/* <Droplets className="w-5 h-5 text-white" /> */}
          <Car className="w-12 h-12 text-black" />
        </div>
      </div>

      {/* Centered nav links */}
      <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
        <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">
          Services
        </a>
        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
          How it Works
        </a>
        <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
          Pricing
        </a>
    
      </div>

      <div>
            <Button className="bg-blue-500 hover:bg-blue-600">Get Started</Button>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="sm">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </div>
  </div>
</nav>

    </div>
  )
}

export default Navbar