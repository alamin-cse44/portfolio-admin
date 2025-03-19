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
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerUser } from "@/services/AuthService";
import Link from "next/link";
import { useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { useRouter } from "next/navigation";
import Shell from "@/components/ui/core/Shell";

const SkillForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    // resolver: zodResolver(registrationSchema),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;


  // Cloudinary Upload Function
  const uploadImagesToCloudinary = async () => {
    const cloudName = `${process.env.NEXT_PUBLIC_CLOUD_NAME}`;
    const uploadPreset = "first_preset_name"; 
    const urls = [];

    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.secure_url) {
          urls.push({ url: data.secure_url });
        }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    return urls;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (imageFiles.length === 0) {
      toast.error("Please upload your profile image.");
      return;
    }

    try {
      const uploadedImages = await uploadImagesToCloudinary();
      const modifiedData = {
        ...data,
        icon: uploadedImages[0].url,
      };
      const res = await registerUser(modifiedData);
      console.log("res", res);
      if (res.success) {
        toast.success(res?.message);
        router.push("/admin/skills");
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Shell className="my-5  flex-grow max-w-md w-full">
      <div className="border border-gray-300 rounded-xl p-5 mt-10">
        <div className="text-center">
          <h1 className="text-xl font-semibold my-2">Add Skill</h1>
        </div>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-8"
              />
            ) : (
              <div className="mt-8">
                <NMImageUploader
                  setImageFiles={setImageFiles}
                  setImagePreview={setImagePreview}
                  label="Upload Icon"
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="i.e: JavaScript"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full mt-5" type="submit">
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </Form>
      </div>
    </Shell>
  );
};

export default SkillForm;
