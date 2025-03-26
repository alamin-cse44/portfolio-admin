import { getSingleSkill } from '@/services/SkillService';

const SkillUpdatePage = async({
    params,
  }: {
    params: Promise<{ skillId: string }>;
  }) => {
    const { skillId } = await params;

    console.log("skill id", skillId);

    const skill = await getSingleSkill(skillId);

    console.log("skill data", skill?.data);
    return (
        <div>
            <h1>Update Skill</h1>
        </div>
    );
};

export default SkillUpdatePage;