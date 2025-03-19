"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = await jwtDecode(accessToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  (await cookies()).delete("accessToken");
};

export const getMe = async () => {
  try {
    const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")!.value}`,
      },
    });

    const result = await user.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateMe = async (editInfo: FieldValues) => {
  try {
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/update-me`,
      {
        method: "PATCH",
        body: JSON.stringify(editInfo),
        headers: {
          "Content-Type": "application/json",
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

export const changePassword = async (passInfo: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            (await cookies()).get("accessToken")!.value
          }`,
        },
        body: JSON.stringify(passInfo),
      }
    );

    const result = await res.json();

    return result;
  } catch (error: any) {
    return Error(error);
  }
};
