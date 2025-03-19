import Shell from "@/components/ui/core/Shell";
import React from "react";
import Banner from "./Banner";
import WhyUs from "./WhyUs";
import OurSpeciality from "./OurSpeciality";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Basa Finder | About Us",
  description: "Find Your Dream RentalComfort, convenience, and affordability all in one place.",
};

const AboutPage = () => {
  return (
    <Shell className="mt-2">
      <Banner />
      <WhyUs />
      <OurSpeciality />
    </Shell>
  );
};

export default AboutPage;
