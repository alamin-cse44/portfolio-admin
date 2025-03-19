"use server";

import { IRentalRequest } from "@/types";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create skill
export const createSkill = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/skills`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    revalidateTag("SKILLS");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all skills
export const getAllSkills = async (query: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills?${query}`,
      {
        next: {
          tags: ["SKILLS"],
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

// get single skill
export const getSingleSkill = async (id: string) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
      {
        next: {
          tags: ["SKILLS"],
        },
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const result = await user.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

// update skill
export const updateSkill = async (
  id: string,
  status: { rentalStatus: string }
) => {
  console.log("server role", status);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
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

    revalidateTag("SKILLS");

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteSkill = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/skills/${id}`,
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

    revalidateTag("SKILLS");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
