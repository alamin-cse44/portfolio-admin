"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

// create PROJECT
export const createProject = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    revalidateTag("PROJECTS");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

//get all projects
export const getAllProjects = async (query: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects?${query}`,
      {
        next: {
          tags: ["PROJECTS"],
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

// get single project
export const getSingleProject = async (id: string) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        next: {
          tags: ["PROJECTS"],
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



// Update project

export const updateProject = async (id: string, data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    revalidateTag("PROJECTS");

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};


// Delete project
export const deleteProject = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
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

    revalidateTag("PROJECTS");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
