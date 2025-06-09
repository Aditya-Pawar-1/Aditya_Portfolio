import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { lazy } from 'react';
const DrivesSpline = lazy(() => import('./DrivesSpline'));

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const Drives = () => {
    const line = useRef();
    const text = useRef();
    const textspan = useRef();
    const background = useRef();
    const mainbackground = useRef();

    const tl = gsap.timeline();

    useGSAP(() => {
        gsap.to(mainbackground.current, {
            scrollTrigger: {
                trigger: mainbackground.current,
                start: '90% center',
                end: '90% center',
                scrub: 2,
                //   markers: true
            },
            scale: .6,
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

        gsap.from(background.current, {
            scrollTrigger: {
                trigger: background.current,
                start: '-40% center',
                end: '-10% 20%',
                scrub: 1,
                // markers: true,
                duration: 1.5,
                ease: "power2.inOut",
            },
            scale: .4,
        })

        tl.from(text.current, {
            scrollTrigger: {
                trigger: text.current,
                start: '-70% center',
                end: '-70% center',
                scrub: 3,
                // markers: true,
                duration: 1.5,
                ease: "power2.inOut",
            },
            y: 200,
            x: 200,
            opacity: 0,
        })
        tl.from(textspan.current, {
            scrollTrigger: {
                trigger: textspan.current,
                scrub: 3,
                start: '-600% bottom',
                end: '-300% 75%',
                duration: 1.5,
                ease: "power2.inOut",
                // markers: true,
            },
            y: '30vh'
        })

    })

    return (
        <div
            ref={mainbackground}
            className="h-[100vh] lg:h-[150vh] relative overflow-hidden bg-black"
        >
            <div ref={background} className='absolute scale-50 md:scale-75 lg:scale-90 -right-[150vw] md:-right-[80vw] lg:-right-[15vw]'>
               <DrivesSpline />
            </div>
            <div className='absolute w-full h-full top-0 '>
                <div className="relative h-full">
                    <div
                        ref={line}
                        className="h-0.5 w-[0] ml-[10vw] bg-white mt-8"></div>
                    <h2 className='text-[1.3rem] ml-[10vw] md:text-[2rem] py-6'>what drives me?</h2>
                    <div
                        ref={text}
                        className='absolute font-bold ml-[5vw] top-[30%] w-[50%] lg:w-[40%] text-[2rem] md:text-[3rem] lg:text-[4rem]'>
                        <h2>transforming ideas into </h2>
                        <div className='bg-[#fdefd4] w-fit text-black px-[1.5rem] rounded-full overflow-hidden'>
                            <h2 ref={textspan} className=''> interactive </h2>
                        </div>
                        <h2> web designs</h2>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Drives