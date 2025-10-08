import React from "react";
import AccountSidebar from "./_components/account-sidebar";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#F9FAFB] pt-10 md:pt-[54px] lg:pt-[68px] pb-20 md:pb-[110px] lg:pb-[140px]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8  ">
        <h4 className="text-xl md:text-[22px] lg:text-2xl font-semibold leading-[120%] text-[#499FC0]">
          Account Settings
        </h4>
        <p className="text-base md:text-[17px] lg:text-lg font-medium text-[#282828] leading-[120%] pt-3 md:pt-4">
          Manage your account preferences and information
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-10 md:pt-[60px] lg:pt-20">
          <div className="md:col-span-2">
            <AccountSidebar />
          </div>
          <main className="md:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
