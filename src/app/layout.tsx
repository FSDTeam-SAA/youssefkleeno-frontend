import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import '../styles/leaflet.css'; 

import { Toaster } from "sonner";
import Providers from "@/components/provider/QueryClientProvider";
import "leaflet/dist/leaflet.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["100", "200", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Car Wash",
  description: "Car Wash",
  icons: {
    icon: "/navlogo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} font-sans antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
