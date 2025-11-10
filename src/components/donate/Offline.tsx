"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OfflineProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const accounts = [
  { currency: "NGN", number: "1310327133" },
  { currency: "GBP", number: "5061663913" },
  { currency: "USD", number: "5075449233" },
  { currency: "EUR", number: "5081382867" },
];

export default function Offline({ open, setOpen }: OfflineProps) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied!", { description: `${text} copied to clipboard.` });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Bank Transfer Details
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            You can make donations directly to the foundation’s bank account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {accounts.map((acc) => (
            <div
              key={acc.currency}
              className="flex items-center justify-between p-3 border rounded-xl hover:bg-muted/30 transition"
            >
              <div>
                <p className="font-medium">{acc.number}</p>
                <p className="text-xs text-muted-foreground">
                  {acc.currency} Account
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(acc.number)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="text-center space-y-1">
          <p className="font-semibold">OKIKIJESU REBECCA SHENKOYA FOUNDATION</p>
          <p className="text-sm text-muted-foreground">ZENITH BANK</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
