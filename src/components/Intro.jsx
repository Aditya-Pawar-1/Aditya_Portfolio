import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { lazy, Suspense } from 'react';
const IntroSpline = lazy(() => import('./IntroSpline'));

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);



const Intro = () => {

    const line = useRef(null)
    const heading1 = useRef(null)
    const heading2 = useRef(null)
    const background = useRef(null)
    const mainbackground = useRef(null)
    const [isMobile, setisMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768)
            setisMobile(true)
    }, [isMobile])


    useGSAP(() => {

        gsap.to(mainbackground.current, {
            scrollTrigger: {
                trigger: background.current,
                start: '90% center',
                end: '90% center',
                scrub: 2,
                //   markers: true
            },
            scale: .8,
            duration: 1.5,
            ease: "cubic-bezier(0.65, 0.00, 0.45, 1.00)",
        })
        gsap.fromTo(line.current, {
            width: '0vw',
        }, {
            width: '80vw',
            scrollTrigger: {
                trigger: line.current,
                start: 'top center',
                end: 'bottom 20%',
                scrub: 1,
                // markers: true,
            },
            ease: "power2.inOut",
        });

        gsap.from(heading1.current, {
            scrollTrigger: {
                trigger: heading1.current,
                start: 'top center',
                end: 'top 15%',
                scrub: 1,
                // markers: true,
                duration: 1.5,
                ease: "power2.inOut",
            },
            opacity: 0,
            y: '-20vh',
        })
        gsap.from(heading2.current, {
            scrollTrigger: {
                trigger: heading2.current,
                start: '-40% center',
                end: '-30% 35%',
                scrub: 1,
                // markers: true,
                duration: 1.5,
                ease: "power2.inOut",
            },
            opacity: 0,
            y: '20vh',
        })
        {
            !isMobile && gsap.to(background.current, {
                scrollTrigger: {
                    trigger: heading1.current,
                    start: 'center center',
                    end: '30% 15%',
                    scrub: 4,
                    // markers: true,
                    duration: 1.5,
                    ease: "power2.inOut",
                },
                scale: 1.5,
                rotate: -25,
            })

            isMobile && gsap.to(background.current, {
                scrollTrigger: {
                    trigger: heading1.current,
                    start: 'center center',
                    end: '30% 15%',
                    scrub: 4,
                    // markers: true,
                    duration: 1.5,
                    ease: "power2.inOut",
                },
                scale: 1.5,
                rotate: -25,
            })

        }
    })



    return (
        <div
            ref={mainbackground}
            className="h-[100vh] lg:h-[200vh] max-w-screen relative overflow-hidden bg-[#BDCFF5] text-gray-950"
        >

            <div
                className="h-100% w-100%">
                <div className='absolute pointer-events-none left-[10%] z-10'>
                    <div
                        ref={line}
                        className="h-0.5 w-[0] bg-black mt-8"></div>
                    <h2 className='text-[1.3rem] md:text-[2rem] py-2'>who am i?</h2>
                    <div
                        className="h-[50vh] lg:h-[100vh]">
                        <h1
                            ref={heading1}
                            className="font-bold text-[3rem] md:text-[4rem] lg:text-[6rem] h-screen pt-[20%]">Web <br /> developer</h1>
                    </div>
                    <div
                        className="h-[50vh] lg:h-[100vh]">
                        <h1
                            ref={heading2}
                            className="font-bold ml-[20%] md:ml-[55%] text-[3rem] md:text-[4rem] lg:text-[6rem] h-screen pt-[16%]">ui/ux <br /> designer</h1>
                    </div>
                </div>
                <div
                    ref={background}
                    className="h-[120vh] lg:h-[200vh] scale-110 w-[100vw]"
                >
                    {isMobile ? (
                        <img src="/assets/images/Intro_Backgroud.jpg"
                            alt="Intro Background"
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <Suspense fallback={
                            <img src="/assets/images/Intro_Backgroud.jpg" alt="Intro Background"
                                className="h-full w-full object-cover"
                            />
                        }>
                            <IntroSpline />
                        </Suspense>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Intro