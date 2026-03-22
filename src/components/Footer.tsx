import {
  Mail,
  MapPin,
  
  ChevronRight,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Newsletter from "./Newsletter";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="relative bg-secondary text-white z-20">
      <div className="absolute inset-0 bg-black/70"></div>
      <Newsletter />
      <Separator className=" max-w-7xl mx-auto w-full " />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 border-b border-gray-700">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="Charitia Logo" width={40} height={40} />
            <span className="text-2xl font-semibold">ORS FOUNDATION</span>
          </div>
          <p className="text-gray-300 text-sm">
            ORS Foundation is an organization that stands on the core values of
            Integrity, Transparency, and Discipline.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <div className="h-0.5 w-12 bg-yellow-500 mb-6" />
          <ul className="space-y-3 text-gray-300">
            {[
              { path: "/about", label: "About Us" },
              { path: "/donate", label: "Donate Us" },
              { path: "/donate", label: "Our Causes" },
              { path: "/contact", label: "Contact Us" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className="hover:text-yellow-400 flex items-center gap-2"
                >
                  <ChevronRight size={16} /> {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
          <div className="h-0.5 w-12 bg-yellow-500 mb-6" />
          <ul className="space-y-4 text-gray-300">
            {/* <li className="flex gap-3 items-start">
              <MapPin className="text-yellow-500 w-5 h-5 mt-1" />
              <span>Flat 20, Reynolds Neck, North Helenaville, FV77 8WS</span>
            </li> */}
            <li className="flex gap-3 items-center">
              <FaWhatsapp className="text-yellow-500 w-5 h-5" />
              <span> +2349071663551</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="text-yellow-500 w-5 h-5" />
              <span>info@orsfoundation.org</span>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 items-start ">
          <Link
            href="#"
            className="bg-primary text-black p-2 rounded-full  transition"
          >
            <Facebook size={18} />
          </Link>
          <Link
            href="#"
            className="bg-primary text-black p-2 rounded-full  transition"
          >
            <Instagram size={18} />
          </Link>
          <Link
            href="#"
            className="bg-primary text-black p-2 rounded-full  transition"
          >
            <Twitter size={18} />
          </Link>
          <Link
            href="#"
            className="bg-primary text-black p-2 rounded-full  transition"
          >
            <Linkedin size={18} />
          </Link>
        </div>
      </div>

      <div className="relative z-10 bg-primary text-black py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium">
            <Link href="/contact" className="hover:underline">
              Contact us
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Terms & Conditions
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
          <p className="text-sm">
            © 2025 <span className="font-semibold">ORS FOUNDATION</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
