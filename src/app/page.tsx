import Hero from "@/components/Hero";
import HomePage from "@/components/HomePage";
import Services from "@/components/Services";
import WashType from "@/components/WashType";
import Image from "next/image";

export default function Home() {
  return (
<div>
  <Hero/>
  <Services/>
  <WashType/>
<HomePage/>
</div>
  );
}
