import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Bed, Bath, Star, Share2, ListCollapse } from "lucide-react";
import Link from "next/link";
import { Button } from "../button";
import { IListing } from "@/types";

// TODO: Listing types
const ListingCard = ({ listing }: { listing: IListing }) => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-md">
      <div className="relative h-56 w-full">
        <Image
          src={listing?.image?.[0].url}
          alt={listing?.apartmentType}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{listing?.apartmentType}</h3>
        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <ListCollapse className="h-4 w-4 text-gray-400" /> {listing?.category}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <MapPin className="h-4 w-4 text-gray-400" /> {listing?.location}
        </div>
        {/* Divider */}
        <div className="border-b border-gray-200 my-3"></div>
        <div className="flex justify-between items-center mt-2 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-gray-400" /> {listing?.bedrooms} - Bedrooms
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-gray-400" /> 2
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold">{listing?.price}</p>
          <div className="flex items-center gap-2 text-gray-500">
            <Share2 className="h-5 w-5 cursor-pointer hover:text-gray-700" />
            <Star className="h-5 w-5 cursor-pointer hover:text-yellow-500" />
          </div>
        </div>
        <Link href={`/all-listings/${listing?._id}`}>
          <Button
            variant="outline"
            className="w-full mt-4 border border-primary text-md rounded-lg hover:bg-primary hover:text-white transition"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
