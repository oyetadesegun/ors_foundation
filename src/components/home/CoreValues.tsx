"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SplitText from "../SplitText";
import { TabsContent } from "@radix-ui/react-tabs";
import CountUp from "../CountUp";
import { useRouter } from "next/navigation";

export default function CoreValues() {
  const router = useRouter();
  const [tab, setTab] = useState("mission");

  return (
    <section className="relative bg-white py-16 px-6 lg:px-24 flex flex-col lg:flex-row items-center gap-10">
      <div className="relative w-full lg:w-1/2 flex justify-start mb-5 md:mb-0">
        <div className="overflow-hidden rounded-2xl w-full md:w-[75%] h-[65vh] relative shadow-lg">
          <Image
            src="/value.jpg"
            alt="Smiling child"
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        <div className="absolute -bottom-10 right-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg ">
          <Image
            src="/value2.jpg"
            alt="Children laughing"
            width={300}
            height={200}
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 space-y-6">
        <h4 className="text-emerald-700 font-semibold  mb-2">
          Supporting Our Cause Together
        </h4>
        <SplitText
          text="Our Core Values"
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

        <p className="text-gray-600">
          These values guide our approach to improving lives and creating
          sustainable change.
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="">
            <Tabs defaultValue="Integrity">
              <TabsList className="w-full bg-transparent">
                {["Integrity", "Transparency", "Discipline"].map((item) => (
                  <TabsTrigger
                    key={item}
                    value={item}
                    className="data-[state=active]:bg-secondary data-[state=active]:text-white p-5 rounded-full font-bold text-md"
                  >
                    {item}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="Integrity">
                <p className="space-y-2 text-gray-700 mt-4">
                  We uphold the highest ethical standards in all our activities
                  and relationships with donors, beneficiaries, and partners.
                </p>
              </TabsContent>
              <TabsContent value="Transparency">
                <p className="space-y-2 text-gray-700 mt-4">
                  We maintain open and honest communication about our
                  operations, ensuring full accountability for all resources
                  entrusted to us.
                </p>
              </TabsContent>
              <TabsContent value="Discipline">
                <p className="space-y-2 text-gray-700 mt-4">
                  We are committed to consistency and excellence in our work,
                  ensuring efficient use of resources to maximize our impact.
                </p>
              </TabsContent>
            </Tabs>

            <div className="flex gap-10 mt-8">
              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-xl font-bold text-teal-700">
                  75%
                </div>
                <p className="mt-2 text-gray-700 text-sm">Treatment Helping</p>
              </div>

              <div className="text-center">
                <div className="relative w-20 h-20 mx-auto rounded-full border-4 border-teal-700 flex items-center justify-center text-xl font-bold text-teal-700">
                  90%
                </div>
                <p className="mt-2 text-gray-700 text-sm">
                  Highest Fund Raised
                </p>
              </div>
            </div>
          </div>
          <Card className=" w-96 border border-gray-200">
            <CardContent className="p-2 text-center space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-secondary">
                  Donate Now
                </h3>
                <p className="text-2xl font-bold text-yellow-500">
                  ${" "}
                  <CountUp
                    from={0}
                    to={40456}
                    separator=","
                    direction="up"
                    duration={3}
                  />
                </p>
              </div>
              <hr />
              <div>
                <h4 className="text-gray-700 font-medium">Total Fundraised</h4>
                <p className="text-2xl font-bold text-secondary">
                  $
                  <CountUp
                    from={0}
                    to={1540456}
                    separator=","
                    direction="up"
                    duration={3}
                  />
                </p>
              </div>
              <Button
                variant={"secondary"}
                onClick={() => router.push("/donate")}
                className="w-full text-white rounded font-bold text-md"
              >
                Donate
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
