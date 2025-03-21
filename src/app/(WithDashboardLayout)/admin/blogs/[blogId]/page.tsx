import UpdateProjectForm from '@/components/modules/admin/projects/ProjectUpdateForm';
import { getSingleProject } from '@/services/ProjectService';

const ProjectUpdatePage = async({
    params,
  }: {
    params: Promise<{ projectId: string }>;
  }) => {
    const { projectId } = await params;

    // console.log("project Id", projectId);

    const project = await getSingleProject(projectId);

    // console.log("project data", project);
    return (
        <div>
            <h2>Project update page {projectId}</h2>
            <UpdateProjectForm project={project?.data} />
        </div>
    );
};

export default ProjectUpdatePage;
