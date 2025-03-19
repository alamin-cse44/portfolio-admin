import UpdateListingForm from '@/components/modules/listing/UpdateListingForm';
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
            <UpdateListingForm listing={skill?.data} />
        </div>
    );
};

export default SkillUpdatePage;