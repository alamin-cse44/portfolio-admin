import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative lg:h-[90vh] h-[50vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/poster.avif"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="rounded-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full px-6">
        <h3 className="text-lg md:text-xl font-light">
          Good Service is our passion
        </h3>
        <h1 className="text-4xl md:text-6xl font-bold mt-2">
          Awesome apartment Villa
        </h1>
        <div className="w-16 h-1 bg-yellow-400 mt-3"></div>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">
          No matter what the weather, no matter what the situation we are in, if
          we have the right perspective in life, life will always be beautiful!
        </p>

        <Link href={"/all-listings"}>
          <Button className="text-lg font-semibold mt-6 shadow-lg rounded-full p-6">
            ALL LISTINGS
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
