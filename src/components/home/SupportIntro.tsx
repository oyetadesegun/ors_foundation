"use client";

import { CheckCircle2, Trophy } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import SplitText from "../SplitText";
import { Separator } from "../ui/separator";
import AnimatedContent from "../AnimatedContent";
import CountUp from "../CountUp";

export default function SupportIntro() {
  return (
    <section className="py-20 bg-white">
      <div className="container w-full max-w-7xl mx-auto px-4  grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative flex justify-start items-center">
          <div className="overflow-hidden rounded-2xl w-full md:w-[80%] h-[85vh] relative">
            <Image
              src="/support1.jpg"
              alt="Children smiling"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute top-auto bottom-5 md:bottom-auto md:top-1/2 right-0 md:right-10 w-[300px] h-[200px] md:h-[250px] rounded-2xl overflow-hidden shadow-lg ">
            <Image
              src="/support2.jpg"
              alt="Happy children"
              fill
              className="object-cover grayscale"
            />
          </div>

          <div className="absolute bottom-0 md:bottom-10 right-16 bg-white shadow-xl rounded-2xl px-6 py-4 flex flex-col gap-2 space-x-2">
            <div className="flex items-center gap-4">
              <h3 className="text-4xl font-bold text-emerald-700">
                <CountUp
                  from={0}
                  to={15}
                  separator=","
                  direction="up"
                  duration={1}
                />
                +
              </h3>
              <Trophy className="text-emerald-700" size={30} />
            </div>
            <p className="text-sm text-gray-500 -mt-1">Helping others</p>
          </div>
        </div>

        <div>
          <h4 className="text-emerald-700 font-semibold  mb-2">
            Supporting Our Cause Together
          </h4>
          <SplitText
            text=" Support Our Mission And Make A Difference"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            delay={60}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, x: 40 }}
            to={{ opacity: 1, x: 0 }}
            threshold={0.1}
            rootMargin="0px"
            textAlign="start"
          />
          <p className="text-gray-600 ">
            Providing tailored support and resources to empower vulnerable
            children and families — restoring hope and changing lives.
          </p>
          <Separator className="my-4" />

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {[
                "Giving Hope, Changing Lives",
                "Together We Can",
                "Every Act Counts",
                "Empower Through Charity",
                "Healing Communities",
                "Compassion in Action",
              ].map((item) => (
                <div key={item} className="flex items-center space-x-2">
                  <CheckCircle2 className="text-emerald-600 w-5 h-5" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </AnimatedContent>
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
            <div className="flex  items-center gap-20">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">
                  <CountUp
                    from={0}
                    to={99}
                    separator=","
                    direction="up"
                    duration={1}
                  />
                  +
                </h3>
                <p className="text-gray-500 text-sm">Active Reviews</p>
              </div>

              <div className="flex -space-x-3">
                {["/user1.jpg", "/user2.jpg", "/user3.jpg"].map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={`user${i}`}
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-white"
                  />
                ))}
              </div>
            </div>
          </AnimatedContent>
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
            <Button className="mt-8 font-bold px-10 py-8 text-lg text-black rounded">
              More About Us
            </Button>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
