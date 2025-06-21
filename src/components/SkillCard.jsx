import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({ title, skill }) => {

    const cardRef = useRef();
    useGSAP(() => {
        gsap.from(cardRef.current, {
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 90%',
                end: 'top 80%',
                scrub: 1,
                once: true,
                // markers: true,
                duration: 1.5,
                ease: "power2.inOut",
            },
            y: "100%",
            opacity: 0
        })

    })

    return (
        <div ref={cardRef} className='bg-[#0E0E0E] w-[80vw] md:w-[40vw] md:min-h-[50vh] p-4'>
            <h4 className='text-2xl md:text-4xl font-bold'>
                {title}
            </h4>
            <div className='p-4'>
                {skill.map((data, index) => (
                    <div key={index} className='flex items-center gap-4 pb-4'>
                        <img className='h-[1.2rem] md:h-[1.5rem]  rotate-45' src="assets/images/send.svg" alt="" />
                        <p className='text-[1rem] md:text-[1.2rem] normal-case'>{data}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillCard