import MyListingsTable from "@/components/modules/listing/MyListingTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const MyListingPage = () => {
    return (
        <div>
      <div className="flex justify-left mt-6">
        <Link href={"/listings/create-listing"}>
          <Button className="px-6 py-2 bg-primary text-white uppercase text-lg rounded-lg font-medium hover:bg-primary-dark transition">
            <PlusIcon className="text-xl" />  Create listing
          </Button>
        </Link>
      </div>
      <h2 className="mt-2"> N.B: To Delete or Update any listing please Add one & do on it!!!</h2>
      <MyListingsTable />
    </div>
    );
};

export default MyListingPage;