"use client";
import {
  Lock,
  LogOut,
  MessageSquareCode,
  ShoppingCart,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AccountSidebar = () => {
  const pathName = usePathname();

  const sidebarItems = [
    {
      id: 1,
      name: "Personal Information",
      href: "/account/personal-information",
      icon: User,
    },
    {
      id: 2,
      name: "Security",
      href: "/account/security",
      icon: Lock,
    },
    {
      id: 3,
      name: "My Bookings",
      href: "/account/my-bookings",
      icon: ShoppingCart,
    },
    {
      id: 4,
      name: "Share your exprience",
      href: "/account/share-your-exprience",
      icon: MessageSquareCode,
    },
  ];
  return (
    <div className="bg-white rounded-[6px] shadow-[0px_2px_8px_0px_#00000029]">
      <div className="flex items-center gap-3 py-6 md:py-7 lg:py-8 px-4 md:px-5 lg:px-6 border-b border-[#0000001A]">
        <Image src="/profiles.jpg" width={100} height={100} alt="profile" className="w-[80px] h-[80px] object-cover rounded-full"/>
        <div>
            <h3 className="text-xl font-medium leading-[120%] text-[#111827]">John Smith</h3>
            <p className="text-base font-normal leading-[120%] text-[#282828] pt-3">john.smith@example.com</p>
        </div>
      </div>
      <div className="flex flex-col gap-5 py-6 md:py-7 lg:py-8 px-4 md:px-5 lg:px-6">
        {sidebarItems?.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            className={`${
              pathName === item?.href
                ? "bg-[#499FC01A] border-[2px] border-[#499FC01A]  text-[#499FC0] "
                : "bg-transparent border-none text-[#282828]"
            } flex items-center gap-2 cursor-pointer py-[13px] px-6 rounded-[6px] `}
          >
            <item.icon
              className={`w-6 h-6 ${
                pathName === item?.href ? "text-[#499FC0]" : "text-[#2F2F2F]"
              }`}
            />
            <p className={`text-base font-medium  leading-[120%]  "}`}>
              {item.name}
            </p>
          </Link>
        ))}
      </div>
      <div className="border-t border-[#0000001A] rounded-[6px] py-6 md:py-7 lg:py-8 px-4 md:px-5 lg:px-6">
        <button className="flex items-center gap-2 text-base font-medium leading-[120%] text-[#BD0202] px-6">
          <LogOut className="w-6 h-6 text-[#BD0202]" /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default AccountSidebar;
