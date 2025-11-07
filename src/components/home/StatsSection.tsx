"use client";

import { Users, Trophy, Heart, Globe } from "lucide-react";
import CountUp from "../CountUp";

const stats = [
  {
    id: 1,
    icon: <Heart className="w-8 h-8 text-white" />,
    value: 10,
    label: "Donations Received",
    unit: "M",
  },
  {
    id: 2,
    icon: <Users className="w-8 h-8 text-white" />,
    value: 500,
    label: "Lives Improved",
    unit: "K",
  },
  {
    id: 3,
    icon: <Trophy className="w-8 h-8 text-white" />,
    value: 120,
    label: "Successful Projects",
  },
  {
    id: 4,
    icon: <Globe className="w-8 h-8 text-white" />,
    value: 35,
    label: "Countries Reached",
  },
];

export default function StatsSection() {
  return (
    <section className="w-full py-14 px-6 flex justify-center">
      <div className="bg-primary rounded-2xl w-full max-w-6xl py-10 px-6 flex flex-col md:flex-row items-center justify-around gap-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left"
          >
            <div className="bg-secondary rounded-full w-28 h-28 flex items-center justify-center relative">
              <div className="absolute inset-2 border-2 border-dotted border-white rounded-full" />
              {stat.icon}
            </div>
            <div>
              <h3 className="text-3xl font-bold text-black">
                <CountUp
                  from={0}
                  to={stat.value}
                  separator=","
                  direction="up"
                  duration={1}
                />
                {stat.unit}+
              </h3>
              <p className="text-black whitespace-nowrap">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
