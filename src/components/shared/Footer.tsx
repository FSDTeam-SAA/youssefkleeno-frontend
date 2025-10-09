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
             <div className="flex flex-col sm:flex-row gap-4 pt-4">
                         <Button className="h-[50px]">
                           <Image
                             src="/image 3.png"
                             alt="app store"
                             width={1000}
                             height={1000}
                             className="w-full h-full  object-cover"
                           />
                         </Button>
         
                         <Button className="h-[50px]">
                           <Image
                             src="/image 4.png"
                             alt="app store"
                             width={1000}
                             height={1000}
                             className="w-full h-full  object-cover"
                           />
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