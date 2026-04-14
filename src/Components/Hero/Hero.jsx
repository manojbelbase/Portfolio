import { motion } from "framer-motion";
import { useState } from "react";
import cover from "../../assets/cover.mp4";
import coverImg from "../../assets/cover.png";
import profile from "../../assets/profile.webp";
import socialLinks from "./SocilaLinks";
import { Link } from "react-router-dom";
import GitHub from "../../api/Github";
import { FiDownloadCloud } from "react-icons/fi";
import { RESUME_URL } from "../../const/const";

const Hero = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col shadow-sm border-[#262626]"
    >
      {/* Hero Video / Image */}
      <motion.div variants={itemVariants} className="overflow-hidden w-full">
        {/* Desktop video */}
        <div className="w-full hidden md:block overflow-hidden border rounded-t-md sm:rounded-t-2xl border-gray-700">
          <video
            src={cover}
            autoPlay
            muted
            playsInline
            preload="auto"
            poster={coverImg}
            className="w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Mobile fallback */}
        <div className="w-full block border rounded-t-md border-gray-700 md:hidden overflow-hidden">
          <img src={coverImg} alt="cover" className="rounded-t-md w-full" />
        </div>
      </motion.div>

      {/* Hero Container */}
      <motion.div
        variants={itemVariants}
        className="h-52 border rounded-b-md sm:rounded-b-3xl p-3 relative border-gray-600"
        style={{ boxShadow: "0 -1px 8px rgba(255, 255, 255, 0.3)" }}
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="md:h-44 md:w-44 h-28 w-28 md:-top-20 -top-14 left-6 absolute rounded-full border-2 border-white profile-background overflow-hidden"
        >
          <img
            src={profile}
            alt="profile"
            className="h-full w-full rounded-full object-cover"
          />
        </motion.div>

        {/* Profile Info and Social Icons */}
        <div className="md:bottom-10 bottom-5 left-6 right-6 absolute flex sm:flex-row flex-col gap-5 justify-between items-start">
          <motion.div variants={itemVariants}>
            <h1 className="font-medium md:text-2xl text-xl">Manoj Belbase</h1>
            <p className="text-xs font-normal text-accent">Full Stack Developer</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mt-1">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  className={`${link.bgColor} p-1 md:p-2 rounded-full cursor-pointer relative shadow-sm shadow-secondary`}
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  to={link.path}
                >
                  {link.icon}
                  {hoveredIcon === index && (
                    <span className="absolute -top-4 rounded-full transition-all transform scale-100 duration-300 delay-200 bg-primary border flex items-center justify-center h-6 -right-1 w-6 text-[8px] md:text-[10px] text-center text-secondary">
                      {link.title === "github" ? (
                        <GitHub />
                      ) : link.title === "facebook" ? (
                        "108"
                      ) : link.title === "youtube" ? (
                        "106"
                      ) : link.title === "linkedin" ? (
                        "116"
                      ) : link.title === "instagram" ? (
                        "124"
                      ) : link.title === "medium" ? (
                        "4"
                      ) : (
                        "2"
                      )}
                    </span>
                  )}
                  {hoveredIcon !== index && (
                    <span className="absolute -top-4 rounded-full transition-all transform scale-0 duration-300 delay-200 bg-primary border flex items-center justify-center h-6 -right-1 w-6 text-xs text-center text-white">
                      9
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Download Resume */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute md:right-6 md:bottom-36 bottom-5 right-4 rounded-md
            border border-secondary flex items-center px-2 py-1 md:px-3 md:py-2
            cursor-pointer shadow-sm shadow-secondary hover:shadow-md transition
            bg-black dark:bg-gray-900 text-white"
          onClick={() => window.open(RESUME_URL, "_blank", "noopener,noreferrer")}
        >
          <span className="mr-2 md:text-base text-sm">Resume</span>
          <FiDownloadCloud className="md:text-xl text-secondary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
