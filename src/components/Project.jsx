import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from "react";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Project = () => {

    const Projects = [{
        pathImg: '/assets/images/Project_Portal.png',
        heading: 'Project Protal',
        subheading: 'The College Project Submission System provides a centralized, secure, and user-friendly platform for academic project management.'
    }, {
        pathImg: '/assets/images/LostAndFound.png',
        heading: 'Lost and Found',
        subheading: 'Website for addressing the Lost and Found needs of the college community. Created a user-friendly interface to facilitate the reporting and retrieval of lost items.'
    }, {
        pathImg: '/assets/images/Recipe_Finder.png',
        heading: 'Recipe Finder',
        subheading: 'Recipe Search Application allows users to search for recipes by name, view detailed recipe information, and save their Favorite recipes using TheMealDB API.'
    },]

    const line = useRef();
    const mainbackground = useRef();

    useGSAP(() => {
        gsap.to(mainbackground.current, {
            scrollTrigger: {
                trigger: mainbackground.current,
                start: '10% bottom',
                end: '90% bottom',
                scrub: 1,
                //   markers: true
            },
            backgroundColor: '#FFFFFF',
            ease: "cubic-bezier(0.65, 0.00, 0.45, 1.00)",
        })
        gsap.to(mainbackground.current, {
            scrollTrigger: {
                trigger: mainbackground.current,
                start: '90% center',
                end: '90% center',
                scrub: 2,
                //   markers: true
            },
            backgroundColor: '#000',
            scale: .8,
            duration: 1.5,
            ease: "cubic-bezier(0.65, 0.00, 0.45, 1.00)",
        })
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
        <div ref={mainbackground} id="projects" >
            <div className="pl-[10%] mb-[5%]">
                <div ref={line} className="h-0.5 w-[0] bg-white mt-8"></div>
                <h2 className='text-[1.3rem] md:text-[2rem] py-2'>How Do I Bring Ideas to Life?</h2>
            </div>

            <div className="w-100% flex flex-col items-center">

                {Projects.map((data, index) => (
                    <div key={index} className="pb-4 md:pb-0 h-[50vh] lg:h-[60vh] sticky top-[15%] mb-[10vh] w-[80vw] rounded-2xl bg-[#121212]">
                        <ProjectCard {...data} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Project