"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IListing } from "@/types";
import { getAllListings } from "@/services/ListingService";
import ListingCard from "@/components/ui/core/ListingCard";
import { listingCategory } from "@/types/object";

const ViewAllListings = () => {
  const router = useRouter();
  const [listings, setListings] = useState<IListing[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const fetchListings = async () => {
    setLoading(true); // Show loader before fetching

    try {
      const queryParams: Record<string, string> = {};
      if (search) queryParams.search = search;
      if (category && category !== "") queryParams.category = category;
      if (pageSize) queryParams.limit = pageSize.toString();
      if (pageIndex) queryParams.page = pageIndex.toString();

      const query = new URLSearchParams(queryParams).toString();
      router.push(`${pathname}?${query}`);

      const res = await getAllListings(query);

      if (!res) throw new Error("Failed to fetch listings");
      console.log(res);

      setListings(res?.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };
  // Fetch listings
  useEffect(() => {
    fetchListings();
  }, [search, category, pageSize, pageIndex]);

  console.log("listings", listings);

  // Paginate the data using useMemo
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return listings?.slice(start, end);
  }, [listings, pageIndex, pageSize]);

  return (
    <div className="space-y-10 mb-10">
      {/* Search & Filter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Input
          placeholder="Search with category, location & title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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

        <Select onValueChange={(value) => setPageSize(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder={`Items view: ${pageSize}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="2">
              2
            </SelectItem>
            <SelectItem className="cursor-pointer" value="10">
              10
            </SelectItem>
            <SelectItem className="cursor-pointer" value="20">
              20
            </SelectItem>
            <SelectItem className="cursor-pointer" value="50">
              50
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <>
          {/* Apartments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {listings?.map((apartment: IListing) => (
              <ListingCard listing={apartment} key={apartment?._id} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center mb-4 ">
            <div></div>

            <div>
              <Button
                disabled={pageIndex === 0}
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              >
                Prev
              </Button>
              <span className="mx-4">
                Page {pageIndex + 1} of {Math.ceil(listings?.length / pageSize)}
              </span>
              <Button
                disabled={(pageIndex + 1) * pageSize >= listings?.length}
                onClick={() => setPageIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewAllListings;
