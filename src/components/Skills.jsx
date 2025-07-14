import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from "react";
import SkillCard from './SkillCard'

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const data = [
    {
      title: "Frontend Development",
      skill: [
        "HTML",
        "CSS & Tailwind CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "GSAP & Framer Motion"
      ]
    },
    {
      title: "Backend Development",
      skill: [
        "Node.js",
        "Express.js",
        "MongoDB and MySQL Databases",
        "REST APIs",
        "JWT & Authentication",
        "MVC Architecture"
      ]
    },
    {
      title: "UI/UX Design",
      skill: [
        "User Research",
        "Wireframing & Prototyping",
        "Layout & Visual Design",
        "Responsive Design",
        "Web & Mobile Design",
        "Interaction Design",
      ]
    },
    {
      title: "Tools & Platforms",
      skill: [
        "Figma",
        "Git & GitHub",
        "Visual Studio Code",
        "Vercel",
        "Postman",
        "ESLint"
      ]
    },
    {
      title: "Programming & Technical",
      skill: [
        "C / C++",
        "Java",
        "Python",
        "Database Management System",
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
      ]
    },
    {
      title: "Soft Skills",
      skill: [
        "Presentation",
        "Collaboration",
        "Teamwork",
        "Time Management",
        "Adaptability",
        "Problem Solving"
      ]
    }
  ];

  const line = useRef();
  useGSAP(() => {
    gsap.to(line.current, {
      scrollTrigger: {
        trigger: line.current,
        start: 'top center',
        end: 'bottom 20%',
        scrub: 1,
        // markers: true,
        duration: 1.5,
        ease: "power2.inOut",
      },
      width: '80vw'
    })

  })


  return (
    <>
      <div className="pl-[5%] mb-[5%]">
        <div ref={line} className="h-0.5 w-[0] bg-white mt-8"></div>
        <h2 className='text-[1.3rem] md:text-[2rem] py-2'>Which Skills I Used?</h2>
      </div>
      <div className='flex flex-col flex-wrap md:flex-row justify-between items-center gap-2 md:gap-8 md:px-[5%] pb-8'>
        {
          data.map((data, index) => (
            <SkillCard key={index} {...data}
            />
          ))
        }
      </div>
    </>
  )
}

export default Skills