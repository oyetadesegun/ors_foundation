"use client";

import AnimatedContent from "@/components/AnimatedContent";
import SectionHeader from "../../SectionHeader";
import DonationCard from "./DonationCard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ICause } from "@/components/causes/CauseForm";

function Causes() {
  const [causes, setCauses] = useState<ICause[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCauses = async () => {
    setLoading(true);
    const res = await fetch("/api/causes");
    const data = await res.json();
    setCauses(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCauses();
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container w-full max-w-7xl mx-auto px-4">
        <SectionHeader
          subtitle="Together, We Can Change Lives"
          title="Bring Hope to Those Who Need It Most"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {causes.map((cause) => (
            <DonationCard key={cause._id} {...cause} />
          ))}
        </div>
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          threshold={0.1}
          delay={0.1}
        >
          <div className="flex justify-center mt-14 ">
            <Button className="font-bold px-10 py-8 text-lg text-black rounded">
              More Causes
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}

export default Causes;
