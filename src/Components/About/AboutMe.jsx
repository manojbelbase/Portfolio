import { motion } from "framer-motion";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import aboutImage from "../../assets/about.jpg";
import Education from "./Education";

const AboutMe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const hideReadMoreBtnRoute = "/about";
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className={`${
        location.pathname !== hideReadMoreBtnRoute
          ? "border border-gray-700 p-3 md:p-6  "
          : ""
      } rounded-md sm:rounded-2xl flex flex-col gap-5`}
    >
      {location.pathname !== hideReadMoreBtnRoute && (
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">
            <span className="text-secondary">#</span>about-me
          </h1>{" "}
          <div className="border w-[40%] border-secondary"></div>
        </motion.div>
      )}
      {/* profile descripion */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 sm:gap-20">
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-start gap-4 text-accent md:text-base text-sm"
        >
          <h2 className="text-white font-medium">Hello, I'm Manoj</h2>
          <p className="">
            I'm a self-taught full-stack developer passionate about crafting
            beautiful, high-performance websites from the ground up. With
            expertise in React, Next, Node.js, Express, Tailwind CSS, and modern
            frontend/back-end technologies, I specialize in turning creative
            ideas into responsive, user-friendly web experiences that work
            flawlessly across devices.
          </p>
          <p>
            Over the past year, I've enjoyed bringing clients' visions to life
            online, continuously learning and exploring new technologies and
            design trends to make my work stand out. I'm always excited to
            combine technical and creative skills to build solutions that are
            both functional and visually appealing.
          </p>
          {location.pathname !== hideReadMoreBtnRoute && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`border border-gray-700 px-2 py-2 rounded-md text-white flex items-center gap-2 transition-transform `}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => navigate("/about")}
            >
              <span>Read More</span>
              <BsArrowRight
                className={`text-2xl text-secondary transition-transform ${
                  isHovered ? "-rotate-45" : ""
                }`}
              />
            </motion.button>
          )}
        </motion.div>

        {location.pathname === hideReadMoreBtnRoute && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full flex justify-center"
          >
            <div className="relative w-full max-w-sm md:max-w-md">
              <img
                src={aboutImage}
                alt="Manoj Belbase"
                className="w-full h-80 sm:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </motion.div>
        )}
      </div>
      {/* Skills */}
      {location.pathname === hideReadMoreBtnRoute && (
        <motion.div variants={itemVariants}>
          <Education />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AboutMe;
