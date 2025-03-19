"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRentalRequest } from "@/types";
import { toast } from "sonner";
import {
  getAllTenantRequests,
  updateRentalStatus,
} from "@/services/RentingService";

const RentingRequestsTable = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<IRentalRequest[]>([]);
  const [status, setStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const fetchRequests = async () => {
    setLoading(true);

    try {
      const queryParams: Record<string, string> = {};
      if (status && status !== "") queryParams.isBlocked = status;
      if (pageSize) queryParams.limit = pageSize.toString();
      if (pageIndex) queryParams.page = pageIndex.toString();

      const query = new URLSearchParams(queryParams).toString();
      router.push(`${pathname}?${query}`);

      const res = await getAllTenantRequests(query);

      if (!res) throw new Error("Failed to fetch users");
      console.log(res);

      setRequests(res?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };
  // Fetch requests
  useEffect(() => {
    fetchRequests();
  }, [status, pageSize, pageIndex]);

  // console.log("requests", requests);

  // Paginate the data using useMemo
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return requests?.slice(start, end);
  }, [requests, pageIndex, pageSize]);

  // Handle role update
  const handleRentingRequest = async (userId: string, status: string) => {
    const statusInfo = {
      rentalStatus: status,
    };
    console.log("new role", statusInfo);
    try {
      if (userId) {
        const res = await updateRentalStatus(userId, statusInfo);
        console.log(res);
        if (res.success) {
          fetchRequests();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IRentalRequest>[] = [
    { accessorKey: "tenant.name", header: "Tenant" },
    { accessorKey: "tenant.email", header: "Tenant Email" },
    { accessorKey: "listing.category", header: "Apartment Type" },
    { accessorKey: "listing.bedrooms", header: "Bedrooms" },
    { accessorKey: "moveInDate", header: "Move In Date" },
    { accessorKey: "listing.price", header: "Price" },
    {
      accessorKey: "rentalStatus",
      header: "Renting Status",
      cell: ({ row }) => (
        <>
          {row.original.rentalStatus === "pending" && (
            <p
              className={`text-center px-2 rounded bg-blue-500 text-white p-2 `}
            >
              Pending
            </p>
          )}
          {row.original.rentalStatus === "approved" && (
            <p
              className={`text-center px-2 rounded bg-green-500 text-white p-2 `}
            >
              Approved
            </p>
          )}
          {row.original.rentalStatus === "rejected" && (
            <p
              className={`text-center px-2 rounded bg-red-500 text-white p-2 `}
            >
              Rejected
            </p>
          )}
        </>
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: ({ row }) => (
        <p
          className={`text-center px-2 rounded ${
            !row.original.paymentStatus
              ? "text-red-500 bg-red-100 p-2"
              : "text-green-500 bg-green-100 p-2"
          }`}
        >
          {row.original.paymentStatus ? "PAID" : "x"}
        </p>
      ),
    },
    {
      accessorKey: "rentalStatus",
      header: "Action",
      cell: ({ row }) => (
        <Select
          onValueChange={(value) =>
            handleRentingRequest(row.original._id as string, value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={row.original.rentalStatus} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="pending">Pending</SelectItem>
            <SelectItem className="cursor-pointer" value="approved">Approved</SelectItem>
            <SelectItem className="cursor-pointer" value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
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
      <div className="flex gap-2 w-[200px]">
        <Select
          onValueChange={(value) => setStatus(value === "all" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Renting Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              All
            </SelectItem>
            <SelectItem className="cursor-pointer" value="pending">
              Pending
            </SelectItem>
            <SelectItem className="cursor-pointer" value="approved">
              Approved
            </SelectItem>
            <SelectItem className="cursor-pointer" value="rejected">
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
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
            Page {pageIndex + 1} of {Math.ceil(requests?.length / pageSize)}
          </span>
          <Button
            disabled={(pageIndex + 1) * pageSize >= requests?.length}
            onClick={() => setPageIndex((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RentingRequestsTable;
