import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/query-provider";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Car Wash",
  description: "Car Wash",
  icons: {
    icon: "/navlogo.png",
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body
        className={`${montserrat.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
       <QueryProvider>
        {children}
       </QueryProvider>
        <Toaster/>
      </body>
    </html>
  );
}
