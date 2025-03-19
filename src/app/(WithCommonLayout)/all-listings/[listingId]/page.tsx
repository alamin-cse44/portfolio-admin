import Gallery from "@/components/modules/listing/Gallery";
import RentRequestForm from "@/components/modules/listing/RentRequestModal";
import Shell from "@/components/ui/core/Shell";
import { getSingleListingByLandlord } from "@/services/ListingService";

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  const listing = await getSingleListingByLandlord(listingId);


  return (
    <Shell className="mt-10">
      <h2 className="text-xl">
        Details of{" "}
        <span className="text-primary font-semibold">
          {listing?.data?.apartmentType}
        </span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  my-5">
        {/* Left Side - Image Gallery */}
        <Gallery listing={listing?.data} />

        {/* Right Side - Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 border w-full h-48 max-w-md">
          <h3 className="text-lg font-semibold mb-4">Book This Apartment</h3>
          
          <RentRequestForm listing={listing?.data} />
        </div>
      </div>
    </Shell>
  );
};

export default ListingDetailsPage;
