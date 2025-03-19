"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createListing = async (data: FieldValues) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await user.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllListings = async (query: any) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/admin/listings?${query}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
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

export const getAllListingsById = async (query: any) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings?${query}`,
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

export const getSingleListingByLandlord = async (id: string) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings/${id}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-type": "application/json"
        },
      }
    );

    const result = await user.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateListingByLandlord = async (
  id: string,
  updatedInfo: FieldValues
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings/${id}`,
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

export const deleteListingByLandlord = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/listings/${id}`,
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
