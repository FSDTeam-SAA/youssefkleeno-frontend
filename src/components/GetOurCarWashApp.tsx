import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  Download,
  Share,
  Copy,
  Droplets,
  Leaf,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
const GetOurCarWashApp = () => {
  return (
    <div className="bg-[#F9FAFB]">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-start mb-2">
          <Badge
            variant="secondary"
            className="bg-[#0066CC33] hover:bg-[#0066CC]/50 hover:text-white text-[#499FC0] px-4 py-2 rounded-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Available for iOS & Android
          </Badge>
        </div>
        <h1 className="text-[40px]   font-semibold text-[#2F2F2F] text-balance">
          Get Our Car Wash App
        </h1>
      </header>
      <div className="min-h-screen ">
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-[115px] items-center mx-auto">
            {/* Left Column - Phone Mockup */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                {/* Phone Frame */}
                <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center px-6 py-3 text-sm font-medium">
                      <span>3:28</span>
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-1 h-3 bg-black rounded-full"></div>
                          <div className="w-1 h-3 bg-black rounded-full"></div>
                          <div className="w-1 h-3 bg-black rounded-full"></div>
                          <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                        </div>
                        <div className="w-6 h-3 border border-black rounded-sm">
                          <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
                        </div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="px-4 pb-4 space-y-4">
                      {/* Greeting */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">
                            Hi Joy, ready for a wash
                          </span>
                        </div>
                        <div className="w-8 h-8 bg-orange-100 rounded-full"></div>
                      </div>

                      {/* Hero Card */}
                      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative p-4 h-full flex flex-col justify-between text-white">
                          <div>
                            <h3 className="font-bold text-lg">
                              Sparkling Clean Cars,
                            </h3>
                            <p className="text-cyan-200">Delivered To You</p>
                          </div>
                          <Button
                            size="sm"
                            className="bg-cyan-400 hover:bg-cyan-300 text-cyan-900 w-fit"
                          >
                            Booking now →
                          </Button>
                        </div>
                      </div>

                      {/* Service Options */}
                      <div className="grid grid-cols-2 gap-3">
                        <Card className="p-4 text-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-600 rounded"></div>
                          </div>
                          <p className="text-sm font-medium">
                            Subscription Wash
                          </p>
                        </Card>
                        <Card className="p-4 text-center">
                          <div className="w-8 h-8 bg-cyan-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-cyan-600" />
                          </div>
                          <p className="text-sm font-medium">One-time wash</p>
                        </Card>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600">
                          Refer & Earn
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Wash Types */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                          <h4 className="font-semibold">Our Wash Type</h4>
                        </div>

                        <Card className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Leaf className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium">Dry Wash</h5>
                              <p className="text-xs text-gray-600 mb-2">
                                Eco-friendly wash without using water
                              </p>
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-700 text-xs"
                              >
                                Eco-friendly
                              </Badge>
                            </div>
                          </div>
                        </Card>

                        <Card className="p-3">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Droplets className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium">Water Wash</h5>
                              <p className="text-xs text-gray-600 mb-2">
                                Water Wash
                              </p>
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                                <p className="text-xs text-yellow-800">
                                  <strong>Note:</strong> Only available if your
                                  location permits water usage. We&apos;ll
                                  confirm this after you select your location.
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-[#2F2F2F] leading-relaxed">
                  Experience the convenience of car washing at your fingertips.
                  Our mobile app makes scheduling and managing your car washes
                  easier than ever.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {[
                  "Book car washes with just a few taps",
                  "Track your washer's arrival in real-time",
                  "View before & after photos of your vehicle",
                  "Manage your subscription easily",
                  "Rate and review your experience",
                  "Exclusive mobile-only discounts",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#499FC0]" />
                    </div>
                    <span className="text-[#2F2F2F] text-base">{feature}</span>
                  </div>
                ))}
              </div>

              {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 px-4 sm:px-6 lg:px-8">
      <Button className="h-[50px] w-full sm:w-auto sm:flex-1 max-w-[200px]">
        <Image
          src="/image 3.png"
          alt="Download from Apple App Store"
          width={160}
          height={50}
          className="w-full h-full object-contain"
        />
      </Button>

      <Button className="h-[50px] w-full sm:w-auto sm:flex-1 max-w-[200px]">
        <Image
          src="/image 4.png"
          alt="Download from Google Play Store"
          width={160}
          height={50}
          className="w-full h-full object-contain"
        />
      </Button>
    </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GetOurCarWashApp;
