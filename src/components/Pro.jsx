import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ProCard from "./ProCard";
import useIsMobile from "../hooks/useIsMobile";

const Pro = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const Projects = [
    {
      pathVideo: "assets/videos/Mahavitaran_Video.mp4",
      heading: "Mahavitaran App Redesign",
      subheading:
        "A UI/UX case study detailing the design process for a user-centric redesign of the Mahavitaran mobile app, focusing on enhancing information clarity and building a functional service management platform.",
      behance:
        "https://www.behance.net/gallery/235079485/Mahavitaran-Application-Redesign",
      isMobileApp: true,
    },
    {
      pathImg: "/assets/images/Project_Portal.png",
      heading: "Project Portal",
      subheading:
        "The College Project Submission System provides a centralized, secure, and user-friendly platform for academic project management.",
      github: "https://github.com/Aditya-Pawar-1/Project-Portal",
    },
    {
      pathImg: "/assets/images/SM_Home.png",
      heading: "ScholarMind",
      subheading:
        "ScholarMind is a mobile application specifically designed to help students manage their study schedules, track their progress, and achieve their academic goals effectively.",
      github: "https://github.com/Aditya-Pawar-1/ScholarMind-main",
      isMobileApp: true,
    },
    {
      pathVideo: "assets/videos/Real_Estate_Video.mp4",
      heading: "Real Estate Case Study",
      subheading: "UI/UX case study on designing a user-centric real estate rental platform, enhancing property search, communication, and management.",
      behance: "https://www.behance.net/gallery/194289569/Real-Estate-Webite-Project-Case-Study",
    }
  ];

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full bg-[#050816] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-neutral-900/40 to-black pointer-events-none" />

      <motion.div
        style={{ y: isMobile ? 0 : glowY }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
              className="h-[1px] bg-indigo-400 w-full max-w-[100px] md:max-w-[220px]"
            />
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-indigo-400 tracking-[0.3em] text-sm uppercase font-medium"
            >
              Selected Works
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Projects
              </span>
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:gap-24">
          {Projects.map((data, index) => (
            <ProCard key={index} {...data} reverse={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pro;