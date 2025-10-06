import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Footer = () => {
  return (
    <div>

        
      {/* Footer */}
      <footer className="bg-[#28576A] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                {/* <div
                className=" rounded-full flex items-center justify-center"
              >
                <Car className="w-12 h-12 text-black" />
              </div> */}
              <Image src="/footerLogo.png" alt="logo" width={100} height={100} className=''/>
        
              </div> 
              <p className="text-white mb-4">
                Professional mobile car wash services at your doorstep. Eco-friendly solutions for a sparkling clean
                car.
              </p>
              <div className="text-sm text-white">
                <p>© 2024 CleanCar. All rights reserved.</p>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Services</h3>
              <ul className="space-y-2 text-white">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Dry Wash
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Water Wash
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Steam Wash
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Monthly Subscription
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
              <div className="space-y-2 text-white">
                <p>123 Main Street, Anytown, ST 12345</p>
                <p>Phone: (555) 123-4567</p>
                <p>Email: info@cleancar.com</p>
              </div>
            </div>

            {/* Download App */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Download Our App</h3>
              <div className="space-y-3">
                <Button className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span>App Store</span>
                </Button>
                <Button className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <span>Google Play</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer