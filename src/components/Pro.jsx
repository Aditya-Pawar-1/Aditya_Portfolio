import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from "react";
// import ProjectCard from "./ProjectCard";
import ProCard from "./ProCard";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


const Pro = () => {
    const Projects = [{
        pathImg: '/assets/images/Project_Portal.png',
        heading: 'Project Protal',
        subheading: 'The College Project Submission System provides a centralized, secure, and user-friendly platform for academic project management.',
        github: 'https://github.com/Aditya-Pawar-1/Project-Portal',
    },{
        pathImg: '/assets/images/AV_Chat.png',
        heading: 'AV Chat',
        subheading: 'AV-Chat is a WebRTC-based real-time video and chat application that enables users to connect instantly through video streaming and text messaging.',
        github: 'https://github.com/Aditya-Pawar-1/AV-Chat',
    }, {
        pathImg: '/assets/images/LostAndFound.png',
        heading: 'Lost and Found',
        subheading: 'Website for addressing the Lost and Found needs of the college community. Created a user-friendly interface to facilitate the reporting and retrieval of lost items.',
        github: 'https://github.com/Aditya-Pawar-1/lost-found-PBL-project',
        liveLink: 'https://aditya-pawar-1.github.io/lost-found-PBL-project/',
    }, {
        pathImg: '/assets/images/Recipe_Finder.png',
        heading: 'Recipe Finder',
        subheading: 'Recipe Search Application allows users to search for recipes by name, view detailed recipe information, and save their Favorite recipes using TheMealDB API.',
        github: 'https://github.com/Aditya-Pawar-1/Recipe-Finder-App',
    },]

    const line = useRef();
    const mainbackground = useRef();

    useGSAP(() => {
        { window.innerWidth > 380 &&
            gsap.to(mainbackground.current, {
                scrollTrigger: {
                    trigger: mainbackground.current,
                    start: '90% center',
                    end: '90% center',
                    scrub: 2,
                },
                scale: .8,
                duration: 1.5,
                ease: "cubic-bezier(0.65, 0.00, 0.45, 1.00)",
            })
        }

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
                    <div
                        key={index}
                        className="pb-4 md:pb-0 mb-[10vh] w-[80vw] rounded-2xl h-full">
                        <ProCard {...data} reverse={index % 2 !== 0} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pro