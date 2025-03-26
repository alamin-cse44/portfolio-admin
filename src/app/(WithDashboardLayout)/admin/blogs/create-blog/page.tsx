"use client"

import { useForm } from "react-hook-form";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogFormValues {
  title: string;
  content: string;
}

export default function BlogForm() {
  const form = useForm<BlogFormValues>({
    defaultValues: { title: "", content: "" },
  });

  const { control, handleSubmit, setValue, watch } = form;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("content", editor.getHTML()); // Sync editor content with React Hook Form
    },
  });

  const onSubmit = async (data: BlogFormValues) => {
    setIsSubmitting(true);
    try {
      // await axios.post("/api/blogs", data);
      alert("Blog uploaded successfully!");
    } catch (error) {
      console.error("Error uploading blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4 p-4 border rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter blog title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <div className="border p-2 rounded">
                  <EditorContent editor={editor} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-5" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload Blog"}
        </Button>
      </form>
    </Form>
  );
}
