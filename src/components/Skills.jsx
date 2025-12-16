import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillCard from "./SkillCard";
import useIsMobile from "../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const lineRef = useRef(null);
  const isMobile = useIsMobile();

  const data = [
    {
      title: "Frontend Development",
      skill: ["HTML", "CSS & Tailwind", "JavaScript", "TypeScript", "React", "GSAP", "Framer Motion"],
    },
    {
      title: "Backend Development",
      skill: ["Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs", "JWT Auth"],
    },
    {
      title: "UI/UX Design",
      skill: ["User Research", "Wireframing", "Prototyping", "Responsive Design", "Figma"],
    },
    {
      title: "Tools & Platforms",
      skill: ["Git & GitHub", "VS Code", "Vercel", "Postman", "ESLint", "Vite"],
    },
    {
      title: "Programming",
      skill: ["C / C++", "Java", "Python", "DSA", "OOPs", "DBMS"],
    },
    {
      title: "Workflow",
      skill: ["Agile & Scrum", "Code Review", "Documentation", "System Design", "Debugging"],
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
        }
    });

    tl.fromTo(lineRef.current, 
        { width: 0 }, 
        { width: "100%", duration: 1, ease: "power3.inOut" }
    ).fromTo(titleRef.current,
        { y: "100%" },
        { y: 0, duration: 0.8, ease: "power4.out" },
        "-=0.5"
    );

    gsap.fromTo(".skill-card-container", 
        { y: 100, opacity: 0 },
        { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            stagger: 0.1, 
            ease: "power3.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        }
    );

    if (!isMobile) {
        const floaters = gsap.utils.toArray(".skill-float-anim");
        floaters.forEach((el) => {
            gsap.to(el, {
                y: -15,
                duration: gsap.utils.random(3, 5), 
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: gsap.utils.random(0, 2) 
            });
        });
    }

  }, { scope: containerRef, dependencies: [isMobile] });

  return (
    <section
      ref={containerRef}
      className="w-full py-16 md:py-32 px-6 md:px-[10%] text-white overflow-hidden bg-black"
    >
      <div className="mb-16 md:mb-24">
        <div className="flex items-center gap-4 mb-4">
          <div
            ref={lineRef}
            className="h-[1px] bg-white/40 w-full max-w-[120px] md:max-w-[200px]"
          />
          <span className="text-indigo-400 tracking-[0.3em] text-xs md:text-sm uppercase font-medium">
            Capabilities
          </span>
        </div>

        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold leading-tight text-white"
          >
            TECHNICAL{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              ARSENAL
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {data.map((item, index) => (
          <div key={index} className="skill-card-container h-full">
            <div className="skill-float-anim h-full">
               <SkillCard {...item} index={index} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;