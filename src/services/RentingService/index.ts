"use server";

import { IRentalRequest } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// create category
export const createRentingRequest = async (data: IRentalRequest) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tenants/requests`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("RENTING");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all RENTAL REQUESTS BY TENANT
export const getAllMyRequests = async (query: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tenants/requests?${query}`,
      {
        next: {
          tags: ["RENTING"],
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all RENTAL REQUESTS BY landlord
export const getAllTenantRequests = async (query: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/requests?${query}`,
      {
        next: {
          tags: ["RENTING"],
        },
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// update renatl status
export const updateRentalStatus = async (
  id: string,
  status: { rentalStatus: string }
) => {
  console.log("server role", status);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/landlords/requests/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
        body: JSON.stringify(status),
      }
    );

    const result = await res.json();

    revalidateTag("RENTING");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};



// create payment
export const createRentingPayment = async (data: IRentalRequest) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/payments`,
        {
          method: "POST",
          headers: {
            Authorization: (await cookies()).get("accessToken")!.value,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
  
      revalidateTag("RENTING");
  
      return res.json();
    } catch (error: any) {
      return Error(error);
    }
  };
