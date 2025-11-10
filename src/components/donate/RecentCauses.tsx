"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ICause } from "../causes/CauseForm";
import moment from "moment";

export default function RecentCauses() {
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
    <Card className="w-full max-w-sm bg-white border-none shadow-none rounded-2xl">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Recent Causes</h3>

        <div className="space-y-5">
          {causes.map((cause) => (
            <div key={cause._id} className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <img
                  src={cause.image || ""}
                  alt={cause.title}
                  className="object-cover h-full w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center text-gray-500 text-sm gap-1">
                  <Calendar size={14} />
                  <span>{moment(cause.createdAt).calendar()}</span>
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
