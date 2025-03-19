import ProjectsTable from "@/components/modules/admin/projects/ProjectsTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Projects = () => {
  return (
    <div>
      <div className="flex justify-left mt-6">
        <Link href={"/admin/projects/create-project"}>
          <Button className="px-6 py-2 bg-primary text-white uppercase text-lg rounded-lg font-medium hover:bg-primary-dark transition">
            <PlusIcon className="text-xl" /> Create Project
          </Button>
        </Link>
      </div>
      <ProjectsTable />
    </div>
  );
};

export default Projects;
