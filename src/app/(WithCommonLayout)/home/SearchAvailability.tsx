"use client";

import { Button } from "@/components/ui/button";
import Shell from "@/components/ui/core/Shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listingCategory } from "@/types/object";
import Link from "next/link";
import { useState } from "react";

const SearchAvailability = () => {
  const [category, setCategory] = useState("");

  //   console.log("category", category);
  return (
    <Shell className="my-16 flex flex-col justify-center items-center">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          For rates <span className="text-primary">& Availability</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Search your <span className="text-indigo-500">House</span>{" "}
        </p>
      </div>
      <div className="min-w-max flex gap-5">
        <Select
          onValueChange={(value) => setCategory(value === "all" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              All
            </SelectItem>
            {listingCategory.map((category) => (
              <SelectItem
                key={category.id}
                className="cursor-pointer"
                value={category.name}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Link href={`/available-listings?category=${category}`}>
          <Button>View</Button>
        </Link>
      </div>
    </Shell>
  );
};

export default SearchAvailability;
