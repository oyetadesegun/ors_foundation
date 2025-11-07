import DonationForm from "@/components/donate/DonationForm";
import Hero from "@/components/donate/Hero";
import RecentCauses from "@/components/donate/RecentCauses";

function Donate() {
  return (
    <div className="bg-gray-100">
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-3 py-16 max-w-7xl mx-auto gap-6">
        <div className="col-span-2">
          <DonationForm />
        </div>
        <div className="hidden md:block">
          <RecentCauses />
        </div>
      </div>
    </div>
  );
}

export default Donate;
