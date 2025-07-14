import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from "react";
import ProCard from "./ProCard";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);


const Pro = () => {
    const Projects = [{
        pathImg: '/assets/images/Project_Portal.png',
        heading: 'Project Protal',
        subheading: 'The College Project Submission System provides a centralized, secure, and user-friendly platform for academic project management.',
        github: 'https://github.com/Aditya-Pawar-1/Project-Portal',
    }, {
        pathImg: '/assets/images/SM_Home.png',
        heading: 'ScholarMind',
        subheading: 'ScholarMind is a mobile application specifically designed to help students manage their study schedules, track their progress, and achieve their academic goals effectively.',
        github: 'https://github.com/Aditya-Pawar-1/ScholarMind-main',
        ImgheightD: '70vh',
        ImgheightM: '50vh'
    }, {
        pathImg: '/assets/images/Real_Estate_Website_Case_Study.png',
        heading: 'UI/UX Case Study',
        subheading: 'UI/UX case study detailing the design process for a user-centric digital real estate rental platform, focusing on enhancing property search, communication, and rental management for a seamless user experience.',
        github: 'https://github.com/Aditya-Pawar-1/ScholarMind-main',
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
        { window.innerWidth > 200 &&
            gsap.to(mainbackground.current, {
                scrollTrigger: {
                    trigger: mainbackground.current,
                    start: '90% center',
                    end: '90% center',
                    scrub: 2,
                },
                scale: window.innerWidth < 500 ? 0.95 : 0.8,
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
            <div className="pl-[5%] md:pl-[10%] mb-[5%]">
                <div ref={line} className="h-0.5 w-[0] bg-white mt-8"></div>
                <h2 className='text-[1.3rem] md:text-[2rem] py-2'>How Do I Bring Ideas to Life?</h2>
            </div>

            <div className="w-100% flex flex-col items-center">

                {Projects.map((data, index) => (
                    <div
                        key={index}
                        className="pb-4 md:pb-0 md:mb-[10vh] w-[80vw] rounded-2xl h-full">
                        <ProCard {...data} reverse={index % 2 !== 0} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pro