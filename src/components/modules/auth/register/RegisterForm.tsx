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
import { registrationSchema } from "./registerValidation";
import { toast } from "sonner";
import { registerUser } from "@/services/AuthService";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { useRouter } from "next/navigation";
import Shell from "@/components/ui/core/Shell";

const RegisterForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  // Cloudinary Upload Function
  const uploadImagesToCloudinary = async () => {
    const cloudName = `${process.env.NEXT_PUBLIC_CLOUD_NAME}`; // Replace with your Cloudinary cloud name
    const uploadPreset = "first_preset_name"; // Replace with your Cloudinary upload preset
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
        phone: "+880 " + data.phone,
        image: uploadedImages[0].url,
      };
      const res = await registerUser(modifiedData);
      console.log("res", res);
      if (res.success) {
        toast.success(res?.message);
        router.push("/login");
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
          <h1 className="text-xl font-semibold my-2">Register</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
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
                  label="Upload Profile"
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Test Name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="test@gmail.com"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone (+880)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1643530000"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage>Password does not match!</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            <Button className="w-full mt-5" type="submit">
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
        <p className="text-sm text-gray-600 text-center my-3">
          Already have an account ?
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </Shell>
  );
};

export default RegisterForm;
