import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Metadata } from "next";
import LoginPage from "../login/page";

export const metadata: Metadata = {
  title: "Portfolio | Admin",
  description: "Find Your Dream RentalComfort, convenience, and affordability all in one place.",
};

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Navbar /> */}
      <LoginPage />
      <main className="">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default CommonLayout;
