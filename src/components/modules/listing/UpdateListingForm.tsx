"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingValidationSchema } from "@/components/modules/listing/ListingValidation";
import { useRouter } from "next/navigation";
import { IListing } from "@/types";
import { updateListingByAdmin } from "@/services/AdminService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listingCategory } from "@/types/object";

export default function UpdateListingForm({ listing }: { listing: IListing }) {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    // resolver: zodResolver(listingValidationSchema),
  });

  const router = useRouter();

  const { user, setIsLoading } = useUser();

  // console.log("update listing user", user);

  const {
    formState: { isSubmitting },
  } = form;

  // Cloudinary Configuration
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = "first_preset_name";

  // Cloudinary Image Upload Function
  const uploadImagesToCloudinary = async (): Promise<{ url: string }[]> => {
    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await res.json();
        return data.secure_url ? { url: data.secure_url } : null;
      });

      // Wait for all uploads to complete
      const uploadedImages = (await Promise.all(uploadPromises)).filter(
        Boolean
      );
      return uploadedImages as { url: string }[];
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      setIsLoading(true);

      const modifiedData = {
        ...listing,
        apartmentType: data?.apartmentType || listing?.apartmentType,
        bedrooms: Number(data?.bedrooms) || listing?.bedrooms,
        location: data?.location || listing?.location,
        description: data?.description || listing?.description,
        price: Number(data?.price) || listing?.price,
        landLord: listing?.landLord?._id,
        category: data?.category || listing?.category,
      };

      console.log("modifiedData", modifiedData);

      // Send data to backend
      const res = await updateListingByAdmin(listing?._id, modifiedData);

      console.log(res);

      if (res.success) {
        toast.success(res.message);
        if (user?.userRole === "admin") {
          router.push("/listings");
        } else {
          router.push("/landLord/my-listings");
        }
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to create listing");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
        <div className="flex items-center space-x-4 mb-5">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-semibold text-center">
              Update Your Listing
            </h1>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="apartmentType"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Apartment Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={listing?.apartmentType}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedroom Quantities</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${listing?.bedrooms}`}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={listing?.location}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`${listing?.price}`}
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`${listing?.category}`} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {listingCategory.map((category) => (
                          <SelectItem key={category?.id} value={category?.name}>
                            {category?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={listing?.description}
                        className="h-36"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {imagePreview.length <= 2 && (
              <div className="mt-8">
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Image"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
              <div>
                {imagePreview.length <= 3 && (
                  <ImagePreviewer
                    setImageFiles={setImageFiles}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    className="mt-8"
                  />
                )}
              </div>
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Updating...." : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
