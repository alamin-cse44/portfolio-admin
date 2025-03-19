"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { Edit, Trash } from "lucide-react";
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
import { deleteListingByAdmin } from "@/services/AdminService";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/DeleteConfirmationModal";
import { getAllListings } from "@/services/ListingService";
import Link from "next/link";
import { listingCategory } from "@/types/object";

const ListingsTable = () => {
  const router = useRouter();
  const [listings, setListings] = useState<IListing[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const fetchListings = async () => {
    setLoading(true); // Show loader before fetching

    try {
      const queryParams: Record<string, string> = {};
      if (search) queryParams.search = search;
      if (category && category !== "") queryParams.category = category;
      if (pageSize) queryParams.limit = pageSize.toString();
      if (pageIndex) queryParams.page = pageIndex.toString();
      queryParams.sortOrder = "desc";
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

  // Handle delete
  const handleDelete = async (data: IListing) => {
    // console.log(data);
    if(listings?.length <= 7){
      toast.error("Cannot delete! Please Add one or more!!");
      return;
    }
    setSelectedId(data?._id);
    setSelectedItem(data?.apartmentType);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteListingByAdmin(selectedId);
        console.log(res);
        if (res.success) {
          fetchListings();
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IListing>[] = [
    { accessorKey: "apartmentType", header: "Title" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "location", header: "Location" },
    { accessorKey: "price", header: "Price" },
    { accessorKey: "bedrooms", header: "Bedrooms" },
    // {
    //   accessorKey: "role",
    //   header: "Role",
    //   cell: ({ row }) => (
    //     <Select
    //       onValueChange={(value) => handleUpdateRole(row.original._id, value)}
    //     >
    //       <SelectTrigger>
    //         <SelectValue placeholder={row.original.role} />
    //       </SelectTrigger>
    //       <SelectContent>
    //         <SelectItem value="admin">Admin</SelectItem>
    //         <SelectItem value="landLord">LandLord</SelectItem>
    //         <SelectItem value="tenant">Tenant</SelectItem>
    //       </SelectContent>
    //     </Select>
    //   ),
    // },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex justify-between">
          <button
            className="text-red-500"
            title="Delete"
            onClick={() => handleDelete(row.original)}
          >
            <Trash className="w-5 h-5" />
          </button>
          <Link href={`/listings/${row.original?._id}`}>
            <button className="text-green-500" title="Update">
              <Edit className="w-5 h-5" />
            </button>
          </Link>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4 p-4">
      {/* Search & Filter Inputs */}
      <div className="flex gap-2">
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
        {/* <Select
          onValueChange={(value) => setStatus(value === "all" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              All
            </SelectItem>
            <SelectItem className="cursor-pointer" value="true">
              Blocked
            </SelectItem>
            <SelectItem className="cursor-pointer" value="false">
              Active
            </SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="border p-2 bg-gray-100">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {loading && "Loading..."}
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center p-2">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 ">
        <div>
          <Select onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder={`Rows: ${pageSize}`} />
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
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ListingsTable;
