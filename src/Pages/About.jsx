import AboutMe from "../Components/About/AboutMe";

const About = () => {
  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-1 mb-6 ">
        <h1 className="text-3xl font-bold">
          {" "}
          <span className="text-secondary">/</span>about-me
        </h1>
        <span className="text-accent text-sm">Who am i?</span>
      </div>
      <AboutMe />
    </div>
  );
};

export default About;
