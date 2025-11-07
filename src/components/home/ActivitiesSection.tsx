import { Book, DollarSign, Heart, Hospital } from "lucide-react";
import SectionHeader from "../SectionHeader";

const activities = [
  {
    title: "Provision of Food and Clothing Items",
    description:
      "We provide essential food supplies and clothing to vulnerable families, ensuring that no one goes hungry or unclothed.",
    icon: <Heart className="w-8 h-8 " />,
  },
  {
    title: "Advancement of Education",
    description:
      "We support access to quality education through scholarships, school supplies, and mentorship programs for children and youth.",
    icon: <Book className="w-8 h-8 " />,
  },
  {
    title: "Start-up Capital for Businesses",
    description:
      "We empower individuals by providing small business grants and start-up funds to foster entrepreneurship and financial independence.",
    icon: <DollarSign className="w-8 h-8 " />,
  },
  {
    title: "Health Education and Health Promotion",
    description:
      "We raise awareness on healthy living, organize health outreaches, and provide medical assistance to improve community wellbeing.",
    icon: <Hospital className="w-8 h-8 " />,
  },
];

export default function ActivitiesSection() {
  return (
    <section className="py-20 bg-gray-100" id="activities">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionHeader
          subtitle="Our Activities"
          title="Making Impact Through Our Programs"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
