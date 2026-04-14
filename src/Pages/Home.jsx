import { motion } from "framer-motion";
import Hero from "../Components/Hero/Hero";
import AboutMe from "../Components/About/AboutMe";
import ProjectContainer from "../Components/Project/ProjectContainer";
import ContactHome from "../Components/Contact/ContactHome";

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Home = () => {
  return (
    <div className="flex flex-col gap-4 relative max-w-[1600px] mx-auto overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeInVariant}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariant}
      >
        <AboutMe />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariant}
      >
        <ProjectContainer />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariant}
      >
        <ContactHome />
      </motion.div>
    </div>
  );
};

export default Home;
