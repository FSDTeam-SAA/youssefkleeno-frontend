"use client";
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Star } from "lucide-react"
import { useQuery } from "@tanstack/react-query";
import { ReviewResponse } from "@/types/reviews";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import React from "react";

export default function HomePage() {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5OTA0MDczLCJleHAiOjE3NTk5OTA0NzN9.mn6lRS1vsu-PjKQO0KRFZLAY135W9YRsEVc1R6Z5nCo";


  const { data } = useQuery<ReviewResponse>({
    queryKey: ["get-review-website"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get-review-website`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });
  const reviews = data?.data || [];

  const plugin = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile App Section */}
      {/* <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get Our Car Wash App</h2>
              <p className="text-lg text-[#2F2F2F] text-[18px] font-midium mb-8">
                Experience the convenience of car washing at your fingertips. Our mobile app makes scheduling, tracking,
                and managing your car wash services easier than ever.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Book car washes on the go</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Track your service in real-time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Manage subscriptions easily</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>View before & after photos of your vehicle</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Secure payment options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>24/7 customer support</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black hover:bg-gray-800 text-white flex items-center space-x-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <span>App Store</span>
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white flex items-center space-x-2">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <span>Google Play</span>
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                  <div className="w-full h-full bg-[#F9FAFB]  border rounded-[2.5rem] overflow-hidden">
                    <div className="bg-blue-500 h-20 flex items-center justify-center">
                      <span className="text-white font-semibold">Car Wash App</span>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                        <Smartphone className="w-12 h-12 text-gray-400" />
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-100 h-4 rounded"></div>
                        <div className="bg-gray-100 h-4 rounded w-3/4"></div>
                      </div>
                      <Button className="w-full bg-blue-500 text-white">Book Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-[#FFFFFF]">
        <div className=" container mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F2F2F] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#2F2F2F]  font-midium">Everything you need to know about our car wash service</p>
          </div>

          <div className="w-full mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-[#F9FAFB]  border rounded-lg px-6">
                <AccordionTrigger className="text-left text-xl  text-[#499FC0] font-midium">How does the mobile car wash service work?</AccordionTrigger>
                <AccordionContent className="text-[#2F2F2F] text-[18px] font-midium">
                  Our mobile car wash service brings professional cleaning directly to your location. Simply book
                  through our app or website, and our trained professionals will arrive with all necessary equipment and
                  eco-friendly products.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-[#F9FAFB]  border rounded-lg px-6">
                <AccordionTrigger className="text-left text-xl  text-[#499FC0] font-midium">
                  What is the difference between wash and water wash?
                </AccordionTrigger>
                <AccordionContent className="text-[#2F2F2F] text-[18px] font-midium">
                  Our dry wash uses eco-friendly, waterless cleaning products that are safe for your car and the
                  environment. Water wash uses traditional methods with water and soap, providing a thorough clean but
                  requires more resources.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-[#F9FAFB]  border rounded-lg px-6">
                <AccordionTrigger className="text-left text-xl  text-[#499FC0] font-midium">How long does a typical car wash take?</AccordionTrigger>
                <AccordionContent className="text-[#2F2F2F] text-[18px] font-midium">
                  A standard car wash typically takes 30-45 minutes, depending on the size of your vehicle and the type
                  of service selected. Premium services may take up to an hour.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-[#F9FAFB]  border rounded-lg px-6">
                <AccordionTrigger className="text-left text-xl  text-[#499FC0] font-midium">Do I need to be present during the car wash?</AccordionTrigger>
                <AccordionContent className="text-[#2F2F2F] text-[18px] font-midium">
                  While it&apos;s not required, we recommend being present or having someone available to provide access to
                  your vehicle and answer any questions our team might have.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-[#F9FAFB]  border rounded-lg px-6">
                <AccordionTrigger className="text-left text-xl  text-[#499FC0] font-midium">How does the subscription plan work?</AccordionTrigger>
                <AccordionContent className="text-[#2F2F2F] text-[18px] font-midium">
                  Our subscription plans offer regular car washes at discounted rates. You can choose weekly, bi-weekly,
                  or monthly schedules, and easily manage your subscription through our mobile app.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-[#F9FAFB]  border rounded-lg px-6">
                <AccordionTrigger className="text-left text-xl  text-[#499FC0] font-midium">Is the service available in all areas?</AccordionTrigger>
                <AccordionContent className="text-[#2F2F2F] text-[18px] font-midium">
                  We currently serve most metropolitan areas. Check our app or website to see if we service your
                  location. We&apos;re constantly expanding our coverage area.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-8">
              <p className="text-[#2F2F2F] text-[18px] font-midium mb-4">Still have questions? Contact our support team!</p>
              {/* <Button variant="outline">Contact Support</Button> */}
              <p className="text-base text-[#499FC0] font-medium">support@carwash.com</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-[#2F2F2F] text-[18px] font-midium">
              Don&apos;t just take our word for it - read what satisfied customers have to say
            </p>
          </div>

          {/* ShadCN Carousel Slider */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 sm:-ml-4">
              {reviews.length > 0 ? (
                reviews.map((item) =>
                  item.review.map((rev) => (
                    <CarouselItem
                      key={rev._id}
                      className="pl-2 sm:pl-4 sm:basis-1/2 lg:basis-1/3"
                    >
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex mb-4">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            {[...Array(5 - rev.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-gray-300" />
                            ))}
                          </div>
                          <p className="text-[#2F2F2F] text-[18px] font-midium mb-4">
                            &apos;{rev.text}&apos;
                          </p>
                          <div className="flex items-center space-x-3">
                            {rev.user?.avatar?.url ? (
                              <Image
                                src={rev.user.avatar.url}
                                alt={rev.user.name}
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {rev.user?.name?.charAt(0) || "U"}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold">{rev.user?.name}</p>
                              <p className="text-sm text-gray-500">Customer</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))
                )
              ) : (
                <p className="text-center text-gray-500 w-full">No reviews found</p>
              )}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

    </div>
  )
}
