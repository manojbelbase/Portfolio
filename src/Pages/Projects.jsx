import ProjectContainer from "../Components/Project/ProjectContainer";

export const Projects = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">
          {" "}
          <span className="text-secondary">/</span>projects
        </h1>
        <span className="text-accent text-sm">List of my projects</span>
      </div>
      <ProjectContainer />
    </div>
  );
};
