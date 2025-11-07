"use client";

import { Button } from "@/components/ui/button";
import { TextAlignStart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const menus = [
  { name: "HOME", path: "/" },
  { name: "DONATE", path: "/donate" },
  { name: "ABOUT", path: "#" },
  { name: "CONTACTS", path: "#" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center pl-6 md:pl-12 backdrop-blur-sm bg-black/10 text-white">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-2xl font-bold flex items-center gap-2"
            >
              <Image
                src="/logo.png"
                alt="Charitia Logo"
                width={40}
                height={40}
              />{" "}
              ORS FOUNDATION
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex space-x-8 text-sm font-medium h-full">
          {menus.map((menu) => {
            const isActive = pathname === menu.path;
            return (
              <Link
                href={menu.path}
                key={menu.name}
                className={`hover:text-primary transition h-full py-4 ${
                  isActive ? "border-t-2 border-primary" : ""
                }`}
              >
                {menu.name}
              </Link>
            );
          })}
        </nav>

        <Button
          onClick={() => router.push("/donate")}
          className="font-bold rounded-none p-6 px-12 h-full text-black hidden md:block"
        >
          DONATE
        </Button>
        {open ? (
          <X
            className="w-6 h-6 cursor-pointer md:hidden m-4"
            onClick={() => setOpen(!open)}
          />
        ) : (
          <TextAlignStart
            className="w-6 h-6 cursor-pointer md:hidden m-4"
            onClick={() => setOpen(!open)}
          />
        )}
      </header>
      {open && (
        <div className="fixed inset-0 z-20 bg-black/60 backdrop-blur-md flex flex-col justify-center items-center py-6 space-y-5 text-white md:hidden">
          {menus.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="hover:text-primary transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
