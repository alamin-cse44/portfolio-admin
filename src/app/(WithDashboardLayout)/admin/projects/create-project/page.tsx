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
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import { useState } from "react";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { createListing } from "@/services/ListingService";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { projectValidationSchema } from "@/components/modules/admin/projects/ProjectValidation";
import { createProject } from "@/services/ProjectService";

export default function CreateProjectForm() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    // resolver: zodResolver(projectValidationSchema),
  });

  const router = useRouter();

  const { user, setIsLoading } = useUser();

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

  const { append: appendTech, fields: techFields } = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  const addTech = () => {
    appendTech({ value: "" });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    if (imageFiles.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setIsLoading(true);
    try {
      setIsLoading(true);

      // Upload images to Cloudinary
      const uploadedImages = await uploadImagesToCloudinary();

      console.log("images", uploadedImages);

      // Prepare modified data
      const modifiedData = {
        ...data,
        user: user?.userId,
        technologies: data?.technologies,
        images: uploadedImages,
      };

      // console.log("modifiedData", modifiedData);

      // Send data to backend
      const res = await createProject(modifiedData);

      console.log(res);

      if (res.success) {
        toast.success(res.message);
        router.push("/admin/projects");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
        <div className="flex items-center justify-center space-x-4 mb-5">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-semibold">Create Your Project</h1>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Web/Mobile app service"
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
                name="briefDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-16"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <div className="flex justify-between items-center border-t border-b py-3 my-5">
                <p className="text-primary font-bold text-xl">
                  Used Technologies
                </p>
                <Button
                  variant="outline"
                  className="size-10"
                  onClick={addTech}
                  type="button"
                >
                  <Plus className="text-primary" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {techFields.map((techField, index) => (
                  <div key={techField.id}>
                    <FormField
                      control={form.control}
                      name={`technologies.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technology {index + 1}</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>
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
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
