import BlogsTable from "@/components/modules/admin/blogs/BlogsTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Projects = () => {
  return (
    <div>
      <div className="flex justify-left mt-6">
        <Link href={"/admin/blogs/create-blog"}>
          <Button className="px-6 py-2 bg-primary text-white uppercase text-lg rounded-lg font-medium hover:bg-primary-dark transition">
            <PlusIcon className="text-xl" /> Create Blog
          </Button>
        </Link>
      </div>
      <BlogsTable />
    </div>
  );
};

export default Projects;
