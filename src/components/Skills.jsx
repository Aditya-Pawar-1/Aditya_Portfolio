import React from "react";
import { motion } from "motion/react";
import SkillCard from "./SkillCard";

const Skills = () => {
  const data = [
    {
      title: "Frontend Development",
      skill: ["HTML", "CSS & Tailwind CSS", "JavaScript", "TypeScript", "React", "GSAP & Framer Motion"],
    },
    {
      title: "Backend Development",
      skill: ["Node.js", "Express.js", "MongoDB / MySQL", "REST APIs", "JWT & Authentication", "MVC Architecture"],
    },
    {
      title: "UI/UX Design",
      skill: ["User Research", "Wireframing", "Prototyping", "Responsive Design", "Layout & Visual Design", "Web & Mobile Design", "Interaction Design"],
    },
    {
      title: "Tools & Platforms",
      skill: ["Figma", "Git & GitHub", "VS Code", "Vercel", "Postman", "ESLint"],
    },
    {
      title: "Programming & Technical",
      skill: ["C / C++", "Java", "Python", "DBMS", "Data Structures & Algorithms", "Object-Oriented Programming"],
    },
    {
      title: "Professional Workflow",
      skill: ["Agile & Scrum", "Code Review", "Technical Documentation", "Version Control (Git Flow)", "Project Management", "Debugging & Troubleshooting"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        damping: 15,
        duration: 0.8
      }
    },
  };

  return (
    <section className="w-full py-16 md:py-24 px-6 md:px-[10%] text-white overflow-hidden">
      <div className="mb-12 md:mb-20">

        <div className="flex items-center gap-4 mb-4">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-[1px] bg-indigo-400 w-full max-w-[120px] md:max-w-[200px]"
          />
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-indigo-400 tracking-[0.3em] text-xs md:text-sm uppercase font-medium"
          >
            Capabilities
          </motion.span>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold leading-tight text-white"
          >
            TECHNICAL{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              ARSENAL
            </span>
          </motion.h2>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
      >
        {data.map((item, index) => (
          <motion.div key={index} variants={cardVariants} className="h-full">
            <SkillCard {...item} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;