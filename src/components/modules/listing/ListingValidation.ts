import { z } from "zod";

export const listingValidationSchema = z.object({
  apartmentType: z
    .string({ required_error: "Apartment Type is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 200 characters"),
  bedrooms: z
    .string({ required_error: "Bedroom is required" })
    .min(1, "Invalid Bedroom quantity"),
  location: z
    .string({ required_error: "Location is required" })
    .min(5, "Location must be between 2 and 50 characters")
    .max(50, "Location must be between 2 and 50 characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(5, "Description must be between 2 and 50 characters")
    .max(200, "Description must be between 5 and 200 characters"),
  price: z.string({ required_error: "Price is required" }),
  category: z.string({ required_error: "Category is required" }),
  // image: z
  //   .string({ required_error: "Email is required" }),
});
