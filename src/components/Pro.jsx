import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ProCard from "./ProCard";

const Pro = () => {
  const Projects = [
    {
      pathImg: "/assets/images/Mahavitaran_Application_Redesign_Case_Study.jpg",
      heading: "Mahavitaran App Redesign",
      subheading:
        "A UI/UX case study detailing the design process for a user-centric redesign of the Mahavitaran mobile app, focusing on enhancing information clarity, and building a functional service management platform for a seamless and trustworthy user experience.",
      behance:
        "https://www.behance.net/gallery/235079485/Mahavitaran-Application-Redesign",
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
      pathImg: "/assets/images/Real_Estate_Website_Case_Study.jpg",
      heading: "Real Estate Website Case Study",
      subheading:
        "UI/UX case study detailing the design process for a user-centric digital real estate rental platform, focusing on enhancing property search, communication, and rental management for a seamless user experience.",
      behance:
        "https://www.behance.net/gallery/194289569/Real-Estate-Webite-Project-Case-Study",
    },
  ];

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full bg-[#050816] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-neutral-900/40 to-black pointer-events-none" />

      <motion.div
        style={{ y, opacity }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-white/5 via-neutral-900/80 to-black rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "100%", opacity: 0.5 }}
              transition={{ duration: 1, ease: "circOut" }}
              viewport={{ once: true }}
              className="h-[1px] bg-white/50 w-full max-w-[120px] md:max-w-[220px]"
            />
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-gray-400 tracking-[0.3em] text-sm uppercase"
            >
              Selected Works
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.33, 1, 0.68, 1],
              }}
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

        <div className="flex flex-col gap-12 md:gap-20">
          {Projects.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProCard {...data} reverse={index % 2 !== 0} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pro;