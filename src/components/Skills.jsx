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
      title: "Frontend Skills",
      skill: ["HTML", "CSS / Tailwind CSS", "JavaScript", "TypeScript", "React",]
    },
    {
      title: "Backend Skills",
      skill: ["Express JS", "Node JS", "Web Socket", "WebRTC", "MongoDB", "MySQL"]
    },
    {
      title: "UI/UX Skills",
      skill: ["Wireframing", "Prototyping", "Layout Design", "UI Design", "Responsive Design", "Web & Mobile Design"]
    },
    {
      title: "Tools Used",
      skill: ["Design - Figma", "Version Control - Git and GitHub", "Programing - VS Code", "Deployment - Vercel", "Testing - Postman", "Code Quality - ESLint"]
    },
    {
      title: "Technical Skills",
      skill: ["C / C++", "JAVA", "Python", "Data Structures and Algorithms", "Object-Oriented Programming", "Competitive Programming", "System Design", ] 
    },
    {
      title: "Soft Skills",
      skill: ["Presentation", "Collaboration", "Teamwork", "Time Management", "Adaptability", "Problem Solving"]
    },
  ]
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