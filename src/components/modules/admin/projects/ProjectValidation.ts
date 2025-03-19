import { z } from "zod";

export const projectValidationSchema = z.object({
  title: z
    .string({ required_error: "Apartment Type is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 200 characters"),
  briefDescription: z.string({
    required_error: "Brief Description is required",
  }),
  service: z
    .string({ required_error: "Service is required" })
    .min(5, "Location must be between 2 and 50 characters")
    .max(20, "Location must be between 2 and 50 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(5, "Description must be between 2 and 50 characters")
    .max(500, "Description must be between 5 and 200 characters"),
});
