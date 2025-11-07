"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const SLIDE_DURATION = 6000;

const slides = [
  {
    id: 1,
    image: "/background.jpg",
    subtitle: "Start Donating To Poor People",
    title: (
      <>
        Giving help <br /> To Those{" "}
        <span className="text-primary">peoples</span> <br /> Who Need It
      </>
    ),
  },
  {
    id: 2,
    image: "/background2.jpg",
    subtitle: "Together We Can Make a Change",
    title: (
      <>
        Helping <span className="text-primary">hands</span> <br /> For a Better
        Tomorrow
      </>
    ),
  },
  {
    id: 3,
    image: "/background3.jpg",
    subtitle: "Support Communities in Need",
    title: (
      <>
        Be a <span className="text-primary">reason</span> <br /> Someone Smiles
        Today
      </>
    ),
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    startAutoSlide();
  };

  const slide = slides[current];

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide.id}
            src={slide.image}
            alt="Hero background"
            initial={{ opacity: 0, scale: 1 }}
            animate="enter"
            exit="exit"
            variants={{
              enter: {
                opacity: 1,
                scale: 1.1,
                transition: {
                  opacity: { duration: 1.2 },
                  scale: { duration: 6 },
                },
              },
              exit: {
                opacity: 0,
                scale: 1.12,
                transition: {
                  opacity: { duration: 0.7 },
                  scale: { duration: 0.7 },
                },
              },
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-24 text-white max-w-4xl">
        <motion.p
          key={`subtitle-${slide.id}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-primary text-sm md:text-base mb-3"
        >
          {slide.subtitle}
        </motion.p>

        <motion.h1
          key={`title-${slide.id}`}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-7xl font-extrabold leading-snug"
        >
          {slide.title}
        </motion.h1>

        <motion.div
          key={`buttons-${slide.id}`}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex gap-6"
        >
          <Button
            onClick={() => router.push("/about")}
            variant={"secondary"}
            className=" text-white px-6 py-6 md:px-12 md:py-7 rounded font-bold text-md"
          >
            Discover More
          </Button>
          <Button
            onClick={() => router.push("/contact")}
            className=" text-black px-6 py-6 md:px-12 md:py-7 rounded font-bold text-md border-none"
          >
            Get A Quote
          </Button>
        </motion.div>
      </div>

      <div className="absolute right-10 md:right-24 top-auto bottom-10 md:bottom-auto md:top-1/2 -translate-y-1/2 flex flex-row md:flex-col gap-4 z-10">
        <button
          onClick={prevSlide}
          className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 md:w-6 h-5 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary text-black flex items-center justify-center shadow hover:bg-primary"
        >
          <ArrowRight className="w-5 md:w-6 h-5 md:h-6" />
        </button>
      </div>
    </section>
  );
}
