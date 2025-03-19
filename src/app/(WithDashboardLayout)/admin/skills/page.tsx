import SkillsTable from "@/components/modules/admin/skills/SkillsTable";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const Skills = () => {
  return (
    <div className="flex flex-col items-center  justify-center">
      <div className="flex justify-left mt-6">
        <Link href={"/admin/skills/create-skill"}>
          <Button className="px-6 py-2 bg-primary text-white uppercase text-lg rounded-lg font-medium hover:bg-primary-dark transition">
            <PlusIcon className="text-xl" /> Create Skill
          </Button>
        </Link>
      </div>
      <SkillsTable />
    </div>
  );
};

export default Skills;
