import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const OurSpeciality = () => {
  return (
    <div className="mb-10">
      <section className="bg-gray-100 py-12 my-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center">
            Our <span className="text-primary">Specialty</span>{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 items-center">
            <Image
              src="/poster.avif"
              alt="Specialty"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <div>
              <p className="text-gray-600">
                Our rental properties are designed for comfort, offering modern
                interiors, spacious rooms, and well-maintained facilities.
              </p>
              <ul className="mt-4 space-y-2">
                {[
                  "Modern Interior Design",
                  "Fully Furnished Options",
                  "Pet-Friendly Rentals",
                  "Secure & Safe",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    ✅ {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 bg-secondary px-6 py-3">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">Ready to Move In?</h2>
          <p className="text-lg mt-2">
            Contact us today and find your perfect rental home.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:text-white px-6 py-3">
              Contact Us
            </Button>
            <Link href={"/all-listings"}>
              <Button className="bg-black text-white px-6 py-3">
                View Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurSpeciality;
