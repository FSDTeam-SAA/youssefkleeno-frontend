import GetOurCarWashApp from "@/components/GetOurCarWashApp";
import Hero from "@/components/Hero";
import HomePage from "@/components/HomePage";
import HowItWorks from "@/components/HowItWorks";
import Services from "@/components/Services";
import WashType from "@/components/WashType";

export default function Home() {
  return (
<div>
  <Hero/>
  <Services/>
  <WashType/>
  <HowItWorks/>
  <GetOurCarWashApp/>
<HomePage/>
</div>
  );
}
