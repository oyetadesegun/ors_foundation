"use client";

import { useState } from "react";
import { DollarSign, PoundSterling } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const currencies = ["NGN", "USD", "EUR", "GBP"];

export function CurrencySelector({
  onSelect,
  defaultValue = "NGN",
}: {
  onSelect?: (value: string) => void;
  defaultValue?: string;
}) {
  const [selected, setSelected] = useState(defaultValue);

  const handleSelect = (currency: string) => {
    setSelected(currency);
    onSelect?.(currency);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "bg-secondary text-white rounded-full w-14 h-14 flex flex-col items-center justify-center",
            "hover:bg-secondary/90 transition"
          )}
        >
          <span className="font-medium mt-0.5">{selected}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-24">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency}
            onClick={() => handleSelect(currency)}
            className={cn(
              "cursor-pointer",
              selected === currency && "font-semibold bg-muted"
            )}
          >
            {currency}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
