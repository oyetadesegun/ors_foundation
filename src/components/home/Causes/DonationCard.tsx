"use client";

import AnimatedContent from "@/components/AnimatedContent";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DonationCard() {
  const router = useRouter();
  return (
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
      <div className=" bg-white rounded-2xl shadow-xs overflow-hidden  p-3 ">
        <div className="relative">
          <img
            src="/card.jpg"
            alt="Child"
            className="w-full h-48 object-cover rounded-2xl"
          />
          <span className="absolute -bottom-3 right-3 bg-secondary text-white text-sm font-medium px-6 py-2 rounded">
            Health
          </span>
        </div>

        <div className="space-y-6 mt-2">
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900">
              Children we work with
            </h3>
            <p className="text-gray-500 text-sm">
              Lorem ipsum dolor sit amet, consete sadipscing elitr, sed diam
              nonum
            </p>
          </div>

          <div className="bg-secondary/10 rounded-xl p-4">
            <div className="flex justify-between text-sm font-semibold  mb-2">
              <span>Donation</span>
              <span>85%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <span className="text-gray-700">
                Raised: <span className="font-semibold">$8500</span>
              </span>
              <span className="text-gray-700">
                Goal:{" "}
                <span className="font-semibold text-primary">$10,000</span>
              </span>
            </div>
          </div>

          <Button
            variant={"secondary"}
            onClick={() => router.push("/donate")}
            className="w-full justify-between px-10 py-7 text-md  items-center hover:bg-primary hover:text-black  text-white font-bold rounded"
          >
            Donate Now
            <ArrowUpRight className="w-8 h-8" />
          </Button>
        </div>
      </div>
    </AnimatedContent>
  );
}
