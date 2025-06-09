/* eslint-disable react/prop-types */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ pathImg, heading, subheading }) => {
    const text = useRef();
    const cover = useRef();
    const [isopen, setIsopen] = useState(false)

    // const pathImg ='/assets/images/Project_Portal.svg'

    const handleOpen = () => {
        setIsopen(true)
    }

    useGSAP(() => {
        const tl = gsap.timeline()
        {
            tl.to(cover.current, {
                scrollTrigger: {
                    trigger: cover.current,
                    start: '20% 60%',
                    end: '20% 60%',
                    scrub: 5,
                    ease: "power2.out",
                    // markers: true,
                    once: true,
                },
                height: 0,
                opacity: 0,
                display: 'none',
            });


            tl.to(text.current, {
                display: 'block',
                opacity: 1,
                duration: 0.5,
                ease: "power2.inOut",
            })
        }
    }, { dependencies: [isopen] })
    return (

        <div className="w-full h-full relative rounded-2xl overflow-hidden ">
            <div ref={cover}
                className='flex items-center justify-center min-w-[100%] h-[100%]  absolute bg-[#121212]'
                onClick={handleOpen}>
                <h4 className="text-[8rem]"></h4>
            </div>
            <div ref={text} className="hidden opacity-0 h-full w-full">
                <div className="flex flex-col lg:flex-row h-full w-full">
                    <img
                        className="h-[60%] lg:w-[60%] lg:min-h-[100%] object-cover"
                        src={pathImg} />
                    <div className="text w-full pt-[5%] lg:pt-0 px-[2%]">
                        <h2 className="text-[2rem] font-bold lg:text-[4rem] pb-[2%] lg:pb-0 leading-[1.2] lg:pt-5">{heading}</h2>
                        <p className="hidden md:block w-[90%] lg:w-[80%] text-base pb-[2%]">{subheading}</p>
                        <button className="px-6 py-2 mr-4 mt-4 bg-black rounded">Live</button>
                        <button className="px-6 py-2 mr-4 mt-4 bg-black rounded">Github</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard