import ViewAllListings from "@/components/modules/listing/ViewAllListings";
import Shell from "@/components/ui/core/Shell";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Basa Finder | Listings",
  description: "Find Your Dream RentalComfort, convenience, and affordability all in one place.",
};

const AllListings = () => {
  return (
    <Shell>
      <h2 className="text-2xl font-semibold my-5">
        All <span className="text-primary">Listings</span>
      </h2>
      <ViewAllListings />
    </Shell>
  );
};

export default AllListings;
