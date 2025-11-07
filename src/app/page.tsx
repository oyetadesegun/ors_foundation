import ActivitiesSection from "@/components/home/ActivitiesSection";
import Causes from "@/components/home/Causes";
import CoreValues from "@/components/home/CoreValues";
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import SupportIntro from "@/components/home/SupportIntro";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <SupportIntro />
      <Causes />
      <CoreValues />
      <ActivitiesSection />
      <StatsSection />
    </div>
  );
}
