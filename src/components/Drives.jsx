import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, lazy, Suspense } from "react";
import useIsMobile from "../hooks/useIsMobile";

const DrivesSpline = lazy(() => import("./DrivesSpline"));
gsap.registerPlugin(ScrollTrigger);

const Drives = () => {
    const containerRef = useRef(null);
    const wrapperRef = useRef(null);
    const textContainerRef = useRef(null);
    const splineContainerRef = useRef(null);
    const lineRef = useRef(null);

    const heading1Ref = useRef(null);
    const heading2Ref = useRef(null);
    const descRef = useRef(null);

    const isMobile = useIsMobile();

    useGSAP(() => {
        if (isMobile) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%",
                pin: true,
                scrub: 1,
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(lineRef.current,
            { width: 0 },
            { width: "100%", duration: 1, ease: "power3.inOut" }
        )
            .fromTo(".drive-intro-text",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1 },
                "-=0.5"
            )
            .fromTo(heading1Ref.current,
                { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 50 },
                { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, duration: 2, ease: "power2.out" }
            )
            .fromTo(heading2Ref.current,
                { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", y: 50 },
                { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", y: 0, duration: 2, ease: "power2.out" },
                "-=1.5"
            )
            .fromTo(descRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.5 },
                "-=1"
            );

        gsap.to(splineContainerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%",
                scrub: 1.5,
            },
            y: -100,
            scale: 1.15,
            rotation: 5,
            ease: "none"
        });
    }, { scope: containerRef, dependencies: [isMobile] });

    useGSAP(() => {
        if (isMobile) return;

        const xToText = gsap.quickTo(textContainerRef.current, "x", { duration: 0.8, ease: "power3.out" });
        const yToText = gsap.quickTo(textContainerRef.current, "y", { duration: 0.8, ease: "power3.out" });
        const xToSpline = gsap.quickTo(splineContainerRef.current, "x", { duration: 1.2, ease: "power3.out" });
        const yToSpline = gsap.quickTo(splineContainerRef.current, "y", { duration: 1.2, ease: "power3.out" });

        const handleMouseMove = () => {
            const { clientX, clientY, innerWidth, innerHeight } = window;
            const xNorm = (clientX / innerWidth) * 2 - 1;
            const yNorm = (clientY / innerHeight) * 2 - 1;

            xToText(xNorm * -15);
            yToText(yNorm * -15);
            xToSpline(xNorm * 40);
            yToSpline(yNorm * 40);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef, dependencies: [isMobile] });

    return (
        <section ref={containerRef} className="relative w-full bg-black text-white">
            <div ref={wrapperRef} className={`${isMobile ? 'py-20 h-screen' : 'h-screen'} w-full flex items-center overflow-hidden relative`}>
                <div
                    ref={splineContainerRef}
                    className={`absolute inset-0 z-0 flex items-center ${isMobile ? 'justify-center opacity-40' : 'justify-end md:translate-x-[15%] opacity-70 mix-blend-screen'}`}
                >
                    <div className="relative select-none pointer-events-none w-full h-full">
                        {isMobile ? (
                            <img
                                src="/assets/images/Drives_backgroud.gif"
                                alt="3D Abstract Shape"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Suspense fallback={<div></div>}>
                                <DrivesSpline />
                            </Suspense>
                        )}
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center h-full pointer-events-none text-left">
                    <div className="mb-8 md:mb-16">
                        <div className="flex items-center gap-4 mb-4">
                            {isMobile ? (
                                <span className="text-indigo-500 font-mono text-xs md:text-sm tracking-widest uppercase">
                                    Core <br /> Philosophy
                                </span>
                            ) : (
                                <span className="text-indigo-500 font-mono text-xs md:text-sm tracking-widest uppercase">
                                    Core Philosophy
                                </span>
                            )}
                            <div ref={lineRef} className="h-[1px] bg-gradient-to-r from-indigo-500 to-transparent w-[60px] md:w-full md:max-w-[200px]" />
                        </div>
                        <h3 className={`drive-intro-text text-lg md:text-2xl text-slate-400 font-normal tracking-wide ${isMobile ? '' : 'opacity-0'}`}>
                            Bridging the gap between
                        </h3>
                    </div>

                    <div ref={textContainerRef} className="pointer-events-auto mix-blend-difference space-y-2 md:space-y-4">
                        <div className="overflow-hidden">
                            <h2
                                ref={heading1Ref}
                                className="text-[12vw] sm:text-[4rem] md:text-[5rem] lg:text-[8rem] font-neue-condensed font-black text-white leading-[0.9] tracking-tighter will-change-transform"
                            >
                                USER EXPERIENCE
                            </h2>
                        </div>

                        <div className="overflow-hidden">
                            <h2
                                ref={heading2Ref}
                                className="text-[12vw] sm:text-[4rem] md:text-[5rem] lg:text-[8rem] font-neue-condensed font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-white leading-[0.9] tracking-tighter md:ml-32 will-change-transform"
                            >
                                <span className={`text-indigo-500 font-normal italic sm:text-[4rem] md:text-[5rem] lg:text-[8rem] mr-2 md:mr-4 ${isMobile ? 'block mb-2' : 'inline'}`}>&</span>
                                ENGINEERING
                            </h2>
                        </div>

                        <div className={`overflow-hidden mt-8 md:mt-16 max-w-xl ${isMobile ? '' : 'md:ml-32'}`}>
                            <p
                                ref={descRef}
                                className={`text-sm md:text-lg text-slate-400 leading-relaxed ${isMobile ? '' : 'border-l-2 border-indigo-500/30 pl-6'}`}
                            >
                                I don't just write code; I craft digital environments. Every interaction is calculated, every pixel is deliberate, ensuring the technology serves the human experience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Drives;