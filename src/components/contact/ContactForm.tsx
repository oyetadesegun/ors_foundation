"use client";

import { Mail, Phone, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }

    const data = {
      name,
      email,
      phone: formData.get("phone"),
      message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        alert(`✅ ${result.message || "Message sent successfully!"}`);
        form.reset();
      } else {
        alert(`❌ ${result.error || "Failed to send message."}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("❌ An error occurred while sending the message.");
    }
  }

  return (
    <section className="py-20 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-secondary font-semibold mb-2">Get In Touch</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            We’d love to hear from you! Whether you want to support our mission,
            volunteer, or learn more about our work, feel free to reach out.
            Together, we can make a lasting difference.
          </p>

          <div className="bg-[#f4fafb] border rounded-xl p-6 mb-6 flex items-start gap-4">
            <div className="p-3 bg-yellow-500/10 text-primary rounded-lg">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                Call Us:
              </h4>
              <p className="text-gray-700">+2349071663551</p>
            </div>
          </div>

          <div className="bg-[#f4fafb] border rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-yellow-500/10 text-primary rounded-lg">
              <Mail size={24} />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                E-Mail Us:
              </h4>
              <p className="text-gray-700">info@orsfoundation.org</p>
            </div>
          </div>
        </div>

        <div className="border rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Fill Up The Form
          </h3>
          <p className="text-gray-600 mb-8">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                className="w-full bg-gray-100 rounded-lg py-4 pl-4 pr-10 outline-none focus:ring-2 focus:ring-primary"
              />
              <User
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                className="w-full bg-gray-100 rounded-lg py-4 pl-4 pr-10 outline-none focus:ring-2 focus:ring-primary"
              />
              <Mail
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Phone Number"
                className="w-full bg-gray-100 rounded-lg py-4 pl-4 pr-10 outline-none focus:ring-2 focus:ring-primary"
              />
              <Phone
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="relative">
              <textarea
                placeholder="Your Message..."
                rows={4}
                id="message"
                name="message"
                className="w-full bg-gray-100 rounded-lg py-4 pl-4 pr-10 outline-none resize-none focus:ring-2 focus:ring-primary"
              ></textarea>
              <MessageSquare
                size={18}
                className="absolute right-4 top-6 text-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
