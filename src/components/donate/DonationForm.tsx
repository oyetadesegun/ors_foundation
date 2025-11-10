"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { DollarSign, AlertTriangle } from "lucide-react";
import SplitText from "../SplitText";
import Offline from "./Offline";
import { CurrencySelector } from "./CurrencySelector";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

export default function DonationForm() {
  const presetAmounts = [20, 50, 100, 200];
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [currency, setCurrency] = useState("NGN");

  const handleAmountClick = (value: number) => {
    setAmount(value);
    setCustom("");
  };

  const handleCustomChange = (value: string) => {
    setCustom(value);
    setAmount(Number(value) || 0);
  };

  const handleCustomClick = () => {
    setCustom("0");
    setAmount(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  async function handlePay() {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        merchantTransactionReference: `DONATE-${Date.now()}`,
        redirectUrl: "http://localhost.com/",
        customer: {
          firstName: "John",
          lastName: "Doe",
          currency,
          phoneNumber: "08123456789",
          address: "Lagos, Nigeria",
          emailAddress: "john@example.com",
        },
      }),
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = data.paymentLink;
    } else {
      toast.error("Payment failed: " + data.error);
    }
  }

  const [donating, setDonationg] = useState(false);
  const handleDonate = async () => {
    try {
      setDonationg(true);
      if (paymentMethod === "offline") {
        setIsOffline(true);
      } else {
        await handlePay();
      }
    } catch (error) {
    } finally {
      setDonationg(false);
    }
  };

  return (
    <section className="bg-white p-6 md:p-10 rounded-2xl space-y-8 py-16 ">
      <SplitText
        text="Help Children Rise out of Poverty"
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
        Business tailored IT design, management & support services business
        agency elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </p>
      <h3 className="text-2xl font-bold text-gray-900">
        Support Where It Counts.
      </h3>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Your Donation:</h3>

        <div className="flex items-center gap-4 bg-gray-100 rounded-full">
          <CurrencySelector
            defaultValue="NGN"
            onSelect={(currency) => setCurrency(currency)}
          />
          <Input
            ref={inputRef}
            type="number"
            value={custom || amount}
            onChange={(e) => handleCustomChange(e.target.value)}
            className="bg-transparent outline-none w-full font-bold border-none shadow-none text-xl text-gray-800"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-2">
          {presetAmounts.map((val) => (
            <button
              key={val}
              onClick={() => handleAmountClick(val)}
              className={`px-6 py-2 rounded-full border text-md font-bold transition-all ${
                amount === val && !custom
                  ? "bg-secondary text-white border-secondary"
                  : "bg-white text-gray-800 border-gray-300 hover:border-teal-700"
              }`}
            >
              {val}
            </button>
          ))}
          <button
            onClick={handleCustomClick}
            className={`px-6 py-2 rounded-full border text-md font-bold ${
              custom
                ? "bg-secondary text-white border-secondary"
                : "bg-white text-gray-800 border-gray-300 hover:border-teal-700"
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">
          Select Payment Method
        </h3>
        <RadioGroup
          defaultValue="credit"
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          className="flex flex-wrap gap-6 mt-2"
        >
          <label className="flex items-center gap-2">
            <RadioGroupItem value="offline" />
            <span>Offline Donation</span>
          </label>
          <label className="flex items-center gap-2">
            <RadioGroupItem value="credit" />
            <span>Credit Card</span>
          </label>
        </RadioGroup>
      </div>

      <div>
        <Button
          className="w-full  text-black text-lg font-semibold py-6 rounded-md"
          onClick={handleDonate}
          disabled={donating}
        >
          {donating && <Spinner />}
          Donate Now
        </Button>
      </div>
      <Offline open={isOffline} setOpen={setIsOffline} />
    </section>
  );
}
