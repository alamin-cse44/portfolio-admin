"use client";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { Trash } from "lucide-react";
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
import { IUserDetails } from "@/types";
import {
  blockUser,
  getAllUsers,
  updateUserRole,
} from "@/services/AdminService";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/ui/core/DeleteConfirmationModal";

const UsersTable = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUserDetails[]>([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true); // Show loader before fetching

    try {
      const queryParams: Record<string, string> = {};
      if (search) queryParams.search = search;
      if (role && role !== "") queryParams.role = role;
      if (status && status !== "") queryParams.isBlocked = status;
      if (pageSize) queryParams.limit = pageSize.toString();
      if (pageIndex) queryParams.page = pageIndex.toString();

      const query = new URLSearchParams(queryParams).toString();
      router.push(`${pathname}?${query}`);

      const res = await getAllUsers(query);

      if (!res) throw new Error("Failed to fetch users");
      console.log(res);

      setUsers(res?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Hide loader after fetching
    }
  };
  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, [search, role, status, pageSize, pageIndex]);

  console.log("users", users);

  // Paginate the data using useMemo
  const paginatedData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return users.slice(start, end);
  }, [users, pageIndex, pageSize]);

  // Handle delete
  const handleDelete = async (data: IUserDetails) => {
    console.log(data);
    setSelectedId(data?._id);
    setSelectedItem(data.name);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await blockUser(selectedId);
        console.log(res);
        if (res.success) {
          fetchUsers();
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

  // Handle role update
  const handleUpdateRole = async (userId: string, newRole: string) => {
    const roleInfo = {
      role: newRole,
    };
    console.log("new role", roleInfo);
    try {
      if (userId) {
        const res = await updateUserRole(userId, roleInfo);
        console.log(res);
        if (res.success) {
          fetchUsers();
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IUserDetails>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Select
          onValueChange={(value) => handleUpdateRole(row.original._id, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={row.original.role} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="landLord">LandLord</SelectItem>
            <SelectItem value="tenant">Tenant</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "isBlocked",
      header: "Status",
      cell: ({ row }) => (
        <p
          className={`text-center px-2 rounded ${
            row.original.isBlocked
              ? "text-red-500 bg-red-100"
              : "text-green-500 bg-green-100"
          }`}
        >
          {row.original.isBlocked ? "Blocked" : "Active"}
        </p>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <button
          className="text-red-500"
          title="Delete"
          onClick={() => handleDelete(row.original)}
        >
          <Trash className="w-5 h-5" />
        </button>
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
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          onValueChange={(value) => setRole(value === "all" ? "" : value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem className="cursor-pointer" value="all">
              All
            </SelectItem>
            <SelectItem className="cursor-pointer" value="admin">
              Admin
            </SelectItem>
            <SelectItem className="cursor-pointer" value="landLord">
              LandLord
            </SelectItem>
            <SelectItem className="cursor-pointer" value="tenant">
              Tenant
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
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
            Page {pageIndex + 1} of {Math.ceil(users?.length / pageSize)}
          </span>
          <Button
            disabled={(pageIndex + 1) * pageSize >= users?.length}
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

export default UsersTable;
