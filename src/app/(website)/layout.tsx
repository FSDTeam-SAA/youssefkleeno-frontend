
import Navbar from "@/components/shared/Navbar";
import "./../globals.css";
import Footer from "@/components/shared/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
