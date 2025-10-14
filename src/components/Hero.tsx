"use client";
import React from "react";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center  justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: ` url('/herobg.png')`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8  text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Sparkling Clean Cars,{" "}
            <span className="text-blue-400">Delivered To You</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-xl mb-8 max-w-4xl  text-pretty text-start opacity-90">
            Experience the convenience of professional car washing services at
            your doorstep. Choose between our monthly or weekly subscription
            plans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start items-center">
            <Button
              onClick={() => {
                const section = document.getElementById("services");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              size="lg"
              className="bg-[#499FC0] hover:bg-[#499FC0]/90 text-white px-8 py-3 text-md w-full sm:w-auto"
            >
              Monthly Wash <MoveRight className="" />
            </Button>
            <Button
              onClick={() => {
                const section = document.getElementById("services");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg w-full sm:w-auto bg-transparent"
            >
              One-time Wash
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
