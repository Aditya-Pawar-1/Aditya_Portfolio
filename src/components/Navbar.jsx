import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const menuRef = useRef(null);
  const navbarRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const cardVariants = {
    rest: { backgroundColor: "rgba(0,0,0,0)", scale: 1 },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
  };

  const githubLabelVariants = {
    rest: { opacity: 0, width: 0, x: -6 },
    hover: { opacity: 1, width: "60px", x: 0 },
  };

  const gmailLabelVariants = {
    rest: { opacity: 0, width: 0, x: -6 },
    hover: { opacity: 1, width: "55px", x: 0 },
  };

  const linkedinLabelVariants = {
    rest: { opacity: 0, width: 0, x: -6 },
    hover: { opacity: 1, width: "80px", x: 0 },
  };

  const resumeLabelVariants = {
    rest: { opacity: 0, width: 0, x: -6 },
    hover: { opacity: 1, width: "60px", x: 0 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div
      ref={navbarRef}
      className={`
    fixed top-0 left-0 w-full z-50
    flex justify-between items-center
    pointer-events-auto
    transition-all duration-300

    ${!isOpen
          ? "bg-black/40 backdrop-blur-md border-b border-white/10 md:bg-transparent md:backdrop-blur-none md:border-b-0"
          : "bg-transparent"
        }

    h-14 md:h-20 lg:h-[15vh] px-4 md:px-12
  `}>
      <div ref={menuRef} className="h-full flex items-center justify-center">
        <a href="/">
          <img src="/assets/Favicon/logo.svg" alt="logo" className="h-8 md:h-15" />
        </a>
      </div>

      <div className="hidden md:flex items-center justify-center gap-4">
        <motion.a
          initial="rest"
          animate="rest"
          whileTap={{ scale: 0.8 }}
          whileHover="hover"
          variants={cardVariants}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl cursor-pointer"
          href="https://github.com/Aditya-Pawar-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[2rem]"
            src="assets/icons/github-142-svgrepo-com.svg"
            alt="github"
          />
          <motion.span
            className="overflow-hidden whitespace-nowrap text-white text-sm font-medium"
            variants={githubLabelVariants}
            transition={{ duration: 0.25 }}
          >
            GitHub
          </motion.span>
        </motion.a>

        <motion.a
          initial="rest"
          animate="rest"
          whileTap={{ scale: 0.8 }}
          whileHover="hover"
          variants={cardVariants}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl cursor-pointer"
          href="mailto:aditya@pawaraditya.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[2rem]"
            src="assets/icons/gmail-svgrepo-com.svg"
            alt="Email"
          />
          <motion.span
            className="overflow-hidden whitespace-nowrap text-white text-sm font-medium"
            variants={gmailLabelVariants}
            transition={{ duration: 0.25 }}
          >
            Email
          </motion.span>
        </motion.a>

        <motion.a
          initial="rest"
          animate="rest"
          whileTap={{ scale: 0.8 }}
          whileHover="hover"
          variants={cardVariants}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl cursor-pointer"
          href="https://linkedin.com/in/aditya-pawar-dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[2rem]"
            src="assets/icons/linkedin-round-svgrepo-com.svg"
            alt="linkedin"
          />
          <motion.span
            className="overflow-hidden whitespace-nowrap text-white text-sm font-medium"
            variants={linkedinLabelVariants}
            transition={{ duration: 0.25 }}
          >
            LinkedIn
          </motion.span>
        </motion.a>

        <motion.a
          initial="rest"
          animate="rest"
          whileTap={{ scale: 0.8 }}
          whileHover="hover"
          variants={cardVariants}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-2 px-3 py-2 bg-white rounded-2xl cursor-pointer"
          href="https://drive.google.com/file/d/1CCQc2CU_NW_v-4X6SdOZY1Cbs_V__-ie/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-[2rem]"
            src="assets/icons/Resume.svg"
            alt="resume"
          />
          <motion.span
            className="overflow-hidden whitespace-nowrap text-white p-2 text-sm font-medium"
            variants={resumeLabelVariants}
            transition={{ duration: 0.25 }}
          >
            Resume
          </motion.span>
        </motion.a>
      </div>

      <div className="md:hidden z-50">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-40 flex flex-col items-end justify-center pr-12 gap-6 md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <motion.div variants={mobileItemVariants} className="flex flex-col items-end gap-1">
          <a
            href="https://github.com/Aditya-Pawar-1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-4xl font-light hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            GitHub
          </a>
          <div className="h-[1px] w-12 bg-white/20 mt-1"></div>
        </motion.div>

        <motion.div variants={mobileItemVariants} className="flex flex-col items-end gap-1">
          <a
            href="mailto:aditya@pawaraditya.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-4xl font-light hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Email
          </a>
          <div className="h-[1px] w-12 bg-white/20 mt-1"></div>
        </motion.div>

        <motion.div variants={mobileItemVariants} className="flex flex-col items-end gap-1">
          <a
            href="https://linkedin.com/in/aditya-pawar-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-4xl font-light hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            LinkedIn
          </a>
          <div className="h-[1px] w-12 bg-white/20 mt-1"></div>
        </motion.div>

        <motion.div variants={mobileItemVariants} className="flex flex-col items-end gap-1">
          <a
            href="https://drive.google.com/file/d/1CCQc2CU_NW_v-4X6SdOZY1Cbs_V__-ie/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-4xl font-light hover:text-gray-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Resume
          </a>
          <div className="h-[1px] w-12 bg-white/20 mt-1"></div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;