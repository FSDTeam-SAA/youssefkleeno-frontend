"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { User, Shield, Calendar, MessageSquare, LogOut } from "lucide-react";

interface AccountSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    id: "personal-information",
    label: "Personal Information",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "my-bookings",
    label: "My Bookings",
    icon: Calendar,
  },
  {
    id: "share-experience",
    label: "Share your experience",
    icon: MessageSquare,
  },
];

export function AccountSidebar({
  activeSection,
  onSectionChange,
}: AccountSidebarProps) {
  return (
    <Card className="p-6 !bg-[#FFFFFF] !rounded-[6px] !sticky top-0 ">
      {/* User Profile */}
      <div className="flex items-center gap-3 mb-8 border-b border-[#E5E7EB] pb-4">
        <Avatar className="h-[80px] w-[80px]">
          <AvatarImage src="/professional-headshot.png" alt="John Smith" />
          <AvatarFallback className="bg-red-500 text-white font-medium">
            JS
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-[#111827] truncate">
            John Smith
          </h3>
          <p className="text-sm text-[#282828] font-normal truncate">
            john.smith@example.com
          </p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-colors",
                isActive
                  ? "bg-[#499FC01A] text-[#499FC0] border border-[#499FC04D]"
                  : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 flex-shrink-0",
                  isActive ? "text-[#499FC0]" : "text-gray-700"
                )}
              />
              <span
                className={cn(
                  "text-base font-medium",
                  isActive ? "text-[#499FC0]" : "text-[#282828]"
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </Card>
  );
}
