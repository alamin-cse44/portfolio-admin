"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface Role {
  role: string;
}

export const getAllUsers = async (query: any) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/users?${query}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = await user.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserRole = async (id: string, role: Role) => {
  console.log("server role", role);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/users/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
        body: JSON.stringify(role),
      }
    );

    const result = await res.json();
    revalidatePath("/admin/users");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const blockUser = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/user/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
      }
    );

    const result = await res.json();

    revalidatePath("/admin/users");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleListingByAdmin = async (id: string) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/listings/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
      }
    );

    const result = await user.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateListingByAdmin = async (
  id: string,
  updatedInfo: FieldValues
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/listings/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
        body: JSON.stringify(updatedInfo),
      }
    );

    const result = await res.json();
    // revalidatePath("/admin/users");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteListingByAdmin = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/listings/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
      }
    );

    const result = await res.json();

    // revalidatePath("/admin/users");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
