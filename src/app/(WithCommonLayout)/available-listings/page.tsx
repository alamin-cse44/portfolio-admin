import AvailableListings from "@/components/modules/listing/AvailableListings";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AvailableListings />
    </Suspense>
  );
}
