"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/services/AuthService";
import { protectedRoutes } from "@/constants";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [cartQuantity, setCartQuantity] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const { user, setIsLoading } = useUser();
  // console.log("user ", user);
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const menuItems = [
    { title: "Home", link: "/" },
    { title: "Dashboard", link: "/profile" },
    { title: "All Listings", link: "/all-listings" },
    { title: "About Us", link: "/about" },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-white shadow-md rounded-xl relative">
        <div className="flex items-center justify-between px-3 py-1.5 container mx-auto ">
          {/* Left Section - Logo & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
              {isOpen ? (
                <X className="text-gray-600 w-6 h-6" />
              ) : (
                <Menu className="text-gray-600 w-6 h-6" />
              )}
            </button>
            {/* <span className="text-blue-600 text-2xl font-bold text-center">BasaFinder</span> */}
            <Link href={"/"}>
              <Image
                src="/logo.webp"
                alt="Rental House"
                width={'60'}
                height={'30'}
                className="rounded-lg"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item, index) => (
              <Link href={item.link} key={index}>
                <button
                  onClick={() => setActive(item.title)}
                  className={cn(
                    "text-gray-600 hover:text-black relative font-medium",
                    active === item.title && "text-black"
                  )}
                >
                  {item.title}
                  {/* {active === item.title && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600"></span>
                  )} */}
                </button>
              </Link>
            ))}
          </div>

          {/* Right Section - Cart, Bell, Login, Avatar */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search"
                className="w-40 md:w-52"
              />
            </div>

            {!user ? (
              <Link href={"/login"}>
                <Button className="">Login</Button>
              </Link>
            ) : (
              <>
                <div className="relative">
                  <ShoppingCart className="text-gray-600 cursor-pointer" />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                      {cartQuantity}
                    </span>
                  )}
                </div>
                <Popover>
                  <PopoverTrigger>
                    <Avatar>
                      <AvatarImage src={user?.image} alt="@shadcn" />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-2 bg-white shadow-md rounded-md">
                    <Link href={"/profile"}>
                      <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                        Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {/* Background Overlay with Smooth Fade */}
      <div
        className={cn(
          "fixed inset-0 bg-black transition-opacity duration-300",
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sliding Drawer */}
      <div
        className={cn(
          "fixed z-20 top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-blue-600 text-2xl font-bold">BasaFinder</span>
          <button onClick={() => setIsOpen(false)}>
            <X className="text-gray-600 w-6 h-6" />
          </button>
        </div>

        {/* Drawer Menu Items */}
        <div className="flex flex-col space-y-2 p-6">
          {menuItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <button
                onClick={() => {
                  setActive(item.title);
                  setIsOpen(false);
                }}
                className="text-gray-700 text-lg hover:text-black"
              >
                {item.title}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
