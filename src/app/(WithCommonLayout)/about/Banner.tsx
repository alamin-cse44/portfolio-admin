import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center bg-gray-900 text-white text-center px-4">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <Image
        src="/banner.avif" 
        alt="Rental House"
        fill
        className="object-cover brightness-75 "
      />
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold">
          Find Your Dream Rental
        </h1>
        <p className="text-lg md:text-xl mt-2">
          Comfort, convenience, and affordability all in one place.
        </p>
        <Link href={"/all-listings"}>
          <Button className="mt-6 text-lg px-6 py-3 bg-primary">
            Explore Listings
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
