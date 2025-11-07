import { Mail, Phone, User, MessageSquare } from "lucide-react";

export default function ContactForm() {
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

          <form className="space-y-5">
            <div className="relative">
              <input
                type="text"
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
