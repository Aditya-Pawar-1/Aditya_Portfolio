import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef, useMemo } from 'react';
import { lazy, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const DrivesSpline = lazy(() => import('./DrivesSpline'));

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Drives = () => {
    const line = useRef();
    const text = useRef();
    const textspan = useRef();
    const background = useRef();
    const mainbackground = useRef();
    const isMobile = useIsMobile();

    const colors = ['#fdefd4', '#ffcdd2', '#bbdefb', '#c8e6c9', '#fff59d', '#d1c4e9'];

    const handleColorChange = () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        gsap.to(textspan.current.parentElement, {
            backgroundColor: randomColor,
            duration: 0.5,
            ease: 'power1.out',
        });
    };

    useGSAP(() => {
        const tl = gsap.timeline();

        gsap.to(mainbackground.current, {
            scrollTrigger: {
                trigger: mainbackground.current,
                start: '90% center',
                end: '90% center',
                scrub: 2,
            },
            scale: 0.6,
            duration: 1.5,
            ease: 'cubic-bezier(0.65, 0.00, 0.45, 1.00)',
        });

        gsap.to(line.current, {
            scrollTrigger: {
                trigger: line.current,
                start: 'top center',
                end: 'bottom 20%',
                scrub: 1,
            },
            width: '80vw',
            duration: 1.5,
            ease: 'power2.inOut',
        });

        gsap.from(background.current, {
            scrollTrigger: {
                trigger: background.current,
                start: '-40% center',
                end: '-10% 20%',
                scrub: 1,
            },
            scale: 0.4,
            duration: 1.5,
            ease: 'power2.inOut',
        });

        tl.from(text.current, {
            scrollTrigger: {
                trigger: text.current,
                start: '-70% center',
                end: '-70% center',
                scrub: 3,
            },
            y: 200,
            x: 200,
            opacity: 0,
        });

        tl.from(textspan.current, {
            scrollTrigger: {
                trigger: textspan.current,
                start: '-600% bottom',
                end: '-300% 75%',
                scrub: 3,
            },
            y: '30vh',
        });
    });

    const memoizedSpline = useMemo(() => <DrivesSpline />, []);

    return (
        <div
            ref={mainbackground}
            className="h-[100vh] lg:h-[150vh] relative overflow-hidden bg-black"
        >
            <div
                ref={background}
                className="absolute will-change-transform scale-50 md:scale-75 lg:scale-90 -right-[60vw] md:-right-[80vw] lg:-right-[15vw]"
            >
                {isMobile ? (
                    <img
                        src="/assets/images/Drives_backgroud.gif"
                        alt="Drives Section Background"
                        className="object-contain h-[100vh] mt-[25vh] lg:mt-0 min-w-screen"
                    />
                ) : (
                    <Suspense fallback={<div className="h-[100vh] w-full bg-black" />}>
                        {memoizedSpline}
                    </Suspense>
                )}
            </div>

            <div className="absolute w-full h-full top-0">
                <div className="relative h-full">
                    <div
                        ref={line}
                        className="h-0.5 w-0 ml-[10vw] bg-white mt-8"
                    ></div>
                    <h2 className="text-[1.3rem] ml-[10vw] md:text-[2rem] py-6">what drives me?</h2>
                    <div
                        ref={text}
                        className="absolute font-bold ml-[5vw] top-[30%] w-[50%] lg:w-[40%] text-[2rem] md:text-[3rem] lg:text-[4rem]"
                    >
                        <h2>transforming ideas into</h2>
                        <div
                            className="bg-[#fdefd4] w-fit text-black px-[1.5rem] rounded-full overflow-hidden cursor-pointer"
                            onClick={handleColorChange}
                        >
                            <h2 ref={textspan}>interactive</h2>
                        </div>
                        <h2>web designs</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drives;
