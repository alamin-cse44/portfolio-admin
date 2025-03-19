import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  // image: z
  //   .string({ required_error: "Email is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  passwordConfirm: z
    .string({ required_error: "Password Confirmation is required" })
    .min(1),
});

export const editUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters")
    .optional(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .optional(),
  // image: z
  //   .string({ required_error: "Email is required" }),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .optional(),
});
