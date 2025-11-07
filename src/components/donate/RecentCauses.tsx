"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CauseItem {
  id: number;
  title: string;
  date: string;
  image: string;
}

const causes: CauseItem[] = [
  {
    id: 1,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2025",
    image: "/support1.jpg",
  },
  {
    id: 2,
    title: "Where Innovation Meets Foundation",
    date: "November 19, 2025",
    image: "/value2.jpg",
  },
  {
    id: 3,
    title: "Structures That Stand, Dreams That Soar",
    date: "November 22, 2025",
    image: "/card.jpg",
  },
];

export default function RecentCauses() {
  return (
    <Card className="w-full max-w-sm bg-white border-none shadow-none rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Causes</h3>

        <div className="space-y-5">
          {causes.map((cause) => (
            <div key={cause.id} className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center text-gray-500 text-sm gap-1">
                  <Calendar size={14} />
                  <span>{cause.date}</span>
                </div>
                <p className="text-gray-900 font-medium leading-snug hover:text-teal-700 cursor-pointer">
                  {cause.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
