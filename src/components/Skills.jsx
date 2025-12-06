import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillCard from "./SkillCard";

gsap.registerPlugin(ScrollTrigger);

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
      skill: ["User Research", "Wireframing & Prototyping", "Layout & Visual Design", "Responsive Design", "Web & Mobile Design", "Interaction Design"],
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
      title: "Workflow & Architecture",
      skill: ["Git & GitHub", "Agile / Scrum", "CI/CD Pipelines", "Docker", "RESTful Architecture", "Testing (Jest/Cypress)"],
    },
  ];

  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(lineRef.current, {
        width: 0,
        duration: 1,
        ease: "power3.inOut",
      })
        .from(titleRef.current, {
          y: "100%",
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
        }, "-=0.5");

      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
        y: 50,
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 px-6 md:px-[10%] text-white overflow-hidden"
    >
      <div className="mb-12 md:mb-20">
        <div className="flex items-center gap-4 mb-4">
          <div
            ref={lineRef}
            className="h-[1px] bg-indigo-500/50 w-full max-w-[120px] md:max-w-[200px]"
          />
          <span className="text-indigo-300 tracking-[0.3em] text-xs md:text-sm uppercase font-medium">
            Capabilities
          </span>
        </div>

        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold leading-tight text-white"
          >
            TECHNICAL {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">
              ARSENAL
            </span>
          </h2>
        </div>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
      >
        {data.map((item, index) => (
          <div key={index} className="skill-card h-full">
            <SkillCard {...item} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;