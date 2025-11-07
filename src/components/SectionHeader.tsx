"use client";

import { HandHeart } from "lucide-react";
import { cn } from "@/lib/utils";
import SplitText from "./SplitText";

interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  className?: string;
}

export default function SectionHeader({
  subtitle,
  title,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn("text-center pb-12  max-w-xl w-full mx-auto", className)}
    >
      {subtitle && (
        <p className="text-emerald-700 font-semibold  mb-2">{subtitle}</p>
      )}
      <SplitText
        text={title}
        delay={60}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, x: 40 }}
        to={{ opacity: 1, x: 0 }}
        threshold={0.1}
        rootMargin="0px"
        textAlign="center"
      />

      {/* Decorative divider */}
      <div className="flex items-center justify-center space-x-2">
        <div className="flex flex-col items-end space-y-1">
          <div className="w-12 h-px bg-emerald-700" />
          <div className="w-24 h-px bg-emerald-700" />
        </div>
        <HandHeart className="text-emerald-700 w-5 h-5" />
        <div className="space-y-1">
          <div className="w-12 h-px bg-emerald-700" />
          <div className="w-24 h-px bg-emerald-700" />
        </div>
      </div>
    </div>
  );
}
