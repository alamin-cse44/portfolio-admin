"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IListing } from "@/types";
import { getAllListings } from "@/services/ListingService";
import ListingCard from "@/components/ui/core/ListingCard";
import Shell from "@/components/ui/core/Shell";

const AvailableListings = () => {
  const [listings, setListings] = useState<IListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    setCategory(searchParams.get("category"));
  }, [searchParams]);

  const fetchListings = async () => {
    if (!category) return; // Avoid unnecessary API calls

    setLoading(true);
    try {
      const queryParams: Record<string, string> = {};
      if (category) queryParams.category = category;

      const query = new URLSearchParams(queryParams).toString();
      const res = await getAllListings(query);

      if (!res) throw new Error("Failed to fetch listings");

      setListings(res?.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [category]);

  return (
    <Shell className="mt-10">
      {!listings.length && !loading && <p>No Data to show!!!</p>}
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <div className="space-y-10 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {listings?.map((apartment) => (
              <ListingCard listing={apartment} key={apartment?._id} />
            ))}
          </div>
        </div>
      )}
    </Shell>
  );
};

export default AvailableListings;
