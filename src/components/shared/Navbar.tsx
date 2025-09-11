
"use client"
import { Button } from "@/components/ui/button"
import { Car, Menu,X} from "lucide-react"
import React, { use, useState } from 'react'

const Navbar = () => {
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div>
           {/* Navigation */}
  <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div
                className=" rounded-full flex items-center justify-center"
              >
                <Car className="w-12 h-12 text-black" />
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-8">
                <a href="#services" className="text-[#2F2F2F] text-md hover:text-gray-900 transition-colors">
                  Services
                </a>
                <a href="#how-it-works" className="text-[#2F2F2F] text-md hover:text-gray-900 transition-colors">
                  How it Works
                </a>
                <a href="#pricing" className="text-[#2F2F2F] text-md hover:text-gray-900 transition-colors">
                  Pricing
                </a>
              </div>
            </div>

            <div className="hidden md:flex">
              <Button style={{ backgroundColor: "#499FC0" }} className="hover:opacity-90">
                Get Started
              </Button>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#services"
                  className="block px-3 py-2 text-[#2F2F2F] text-md hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#how-it-works"
                  className="block px-3 py-2 text-[#2F2F2F] text-md hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </a>
                <a
                  href="#pricing"
                  className="block px-3 py-2 text-[#2F2F2F] text-md hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <div className="px-3 py-2">
                  <Button
                    style={{ backgroundColor: "#499FC0" }}
                    className="w-full hover:opacity-90"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

    </div>
  )
}

export default Navbar