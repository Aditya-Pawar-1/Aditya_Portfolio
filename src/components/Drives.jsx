import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, lazy, Suspense } from "react";
import useIsMobile from "../hooks/useIsMobile";

const DrivesSpline = lazy(() => import("./DrivesSpline"));

gsap.registerPlugin(ScrollTrigger);

const Drives = () => {
    const containerRef = useRef(null);
    const textContainerRef = useRef(null);
    const splineContainerRef = useRef(null);
    const lineRef = useRef(null);

    const isMobile = useIsMobile();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
            }
        });

        tl.fromTo(lineRef.current,
            { width: 0 },
            { width: "100%", duration: 1, ease: "power3.inOut" }
        );

        tl.from(".drive-text-line", {
            y: "100%",
            opacity: 0,
            rotateX: -20,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
        }, "-=0.5");

        gsap.to(splineContainerRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
            y: isMobile ? 50 : 150,
            scale: isMobile ? 1 : 1.1,
            ease: "none"
        });

    }, { scope: containerRef });


    useGSAP(() => {
        if (isMobile) return;

        const xToText = gsap.quickTo(textContainerRef.current, "x", { duration: 1, ease: "power3.out" });
        const yToText = gsap.quickTo(textContainerRef.current, "y", { duration: 1, ease: "power3.out" });

        const xToSpline = gsap.quickTo(splineContainerRef.current, "x", { duration: 1.5, ease: "power3.out" });
        const yToSpline = gsap.quickTo(splineContainerRef.current, "y", { duration: 1.5, ease: "power3.out" });

        const handleMouseMove = (e) => {
            const { clientX, clientY, innerWidth, innerHeight } = window;
            const xNorm = (clientX / innerWidth) - 0.5;
            const yNorm = (clientY / innerHeight) - 0.5;

            xToText(xNorm * 30);
            yToText(yNorm * 30);

            xToSpline(xNorm * -60);
            yToSpline(yNorm * -60);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef, dependencies: [isMobile] });


    return (
        <section
            ref={containerRef}
            className="relative h-[100vh] lg:h-[120vh] w-full overflow-hidden bg-[#000000]"
        >

            <div
                ref={splineContainerRef}
                className="absolute inset-0 z-0 flex items-center justify-center md:items-start md:justify-end translate-y-10 md:translate-x-[10%]"
            >
                <div className="relative select-none pointer-events-none w-full h-full md:w-[80%] md:h-[80%] opacity-30 md:opacity-60 mix-blend-screen">
                    {isMobile ? (
                        <img
                            src="/assets/images/Drives_backgroud.gif"
                            alt="3D Abstract Shape"
                            className="w-full h-full object-contain scale-110"
                        />
                    ) : (
                        <Suspense fallback={<div className="w-full h-full flex items-center justify-start text-white/20">Loading 3D...</div>}>
                            <DrivesSpline />
                        </Suspense>
                    )}
                </div>
            </div>


            <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex flex-col justify-center h-full pointer-events-none">

                <div className="mb-8 md:mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-indigo-400 font-mono text-xs md:text-sm tracking-widest uppercase">
                            Core Philosophy
                        </span>
                        <div ref={lineRef} className="h-[1px] bg-gradient-to-r from-indigo-500 to-transparent w-full max-w-[200px]" />
                    </div>
                </div>

                <div ref={textContainerRef} className="pointer-events-auto mix-blend-difference">

                    <div className="overflow-hidden mb-2">
                        <h3 className="drive-text-line text-lg md:text-2xl text-slate-400 font-light tracking-wide">
                            Bridging the gap between
                        </h3>
                    </div>

                    <div className="overflow-hidden">
                        <h2 className="drive-text-line text-[3rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[8rem] font-black text-white leading-[0.9] tracking-tighter">
                            USER EXPERIENCE
                        </h2>
                    </div>

                    <div className="overflow-hidden">
                        <h2 className="drive-text-line text-[3rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-white leading-[0.9] tracking-tighter ml-0 md:ml-12 lg:ml-24">
                            <span className="text-indigo-500 font-light italic text-[0.8em] mr-4">& </span>
                            ENGINEERING
                        </h2>
                    </div>

                    <div className="overflow-hidden mt-8 md:mt-12 max-w-xl md:ml-24">
                        <p className="drive-text-line text-sm md:text-base text-slate-400 leading-relaxed">
                            I don't just write code; I craft digital environments. Every interaction is calculated, every pixel is deliberate, ensuring the technology serves the human experience.
                        </p>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default Drives;