import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const ProCard = ({ pathImg, heading, subheading, github, liveLink, reverse }) => {
    const CardRef = useRef();

    useGSAP(() => {
        // if (window.innerWidth < 768) return;
        gsap.from(CardRef.current, {
            scrollTrigger: {
                trigger: CardRef.current,
                start: '25% 80%',
                end: '90% 80%',
                scrub: 4,
                once: true,
            },
            opacity: 0,
            ease: "cubic-bezier(0.65, 0.00, 0.45, 1.00)",
        });
    }, { dependencies: [CardRef] });

    return (
        <div
            ref={CardRef}
            className={`
                flex flex-col md:flex-row 
                ${reverse ? 'md:flex-row-reverse' : ''}
                items-center gap-8 my-12
            `}
        >
            {/* Image Section */}
            <div className="w-full md:w-1/2">
                <img
                    src={pathImg}
                    className="w-full h-full object-cover rounded-xl"
                    alt="Project Mockup"
                />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 px-4 lg:px-12 flex flex-col items-start justify-center md:text-left">
                <h3 className="text-3xl lg:text-6xl font-semibold">
                    {heading}
                </h3>
                <p className="text-base lg:text-lg font-normal mt-4  sm:max-w-[80%] md:max-w-[100%] ">
                    {subheading}
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                    {liveLink && (
                        <a href={liveLink} target="_blank" rel="noopener noreferrer">
                            <button className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition-all">
                                Live
                            </button>
                        </a>
                    )}
                    {github && (
                        <a href={github} target="_blank" rel="noopener noreferrer">
                            <button className="px-6 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition-all">
                                GitHub
                            </button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProCard;
