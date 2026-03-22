// components/newsletter.tsx
"use client";

import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SplitText from "./SplitText";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute left-0 bottom-0 w-24 h-24 text-primary opacity-30">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M20 70 C30 30, 70 30, 80 70"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            <SplitText
              text="Subscribe To Our Newsletter"
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
          </h2>
          <p className="text-gray-400">
            Subscribe to receive updates, stories, and opportunities straight to
            your inbox.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="flex items-center gap-6 w-full md:w-[500px]"
        >
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="flex-1 border-none h-[50px] p-6 bg-white focus-visible:ring-0 focus-visible:ring-offset-0 text-gray-800 rounded-full"
          />
          <Button
            type="submit"
            disabled={loading}
            className=" text-black rounded-full p-5 w-24 h-full"
          >
            {loading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
