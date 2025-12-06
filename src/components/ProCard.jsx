import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsMobile from "../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const ProCard = ({
    pathImg,
    heading,
    subheading,
    github,
    liveLink,
    behance,
    reverse,
    isMobileApp,
}) => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const isMobile = useIsMobile();

    useGSAP(
        () => {
            if (isMobile) return;

            const card = cardRef.current;
            if (!card) return;

            const xTo = gsap.quickTo(card, "rotateY", {
                duration: 0.4,
                ease: "power3.out",
            });
            const yTo = gsap.quickTo(card, "rotateX", {
                duration: 0.4,
                ease: "power3.out",
            });

            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;

                const rotateY = ((mouseX - width / 2) / width) * 6;
                const rotateX = ((mouseY - height / 2) / height) * -6;

                xTo(rotateY);
                yTo(rotateX);
            };

            const handleMouseLeave = () => {
                xTo(0);
                yTo(0);
            };

            card.addEventListener("mousemove", handleMouseMove);
            card.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseleave", handleMouseLeave);
            };
        },
        { scope: containerRef, dependencies: [isMobile] }
    );

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                gsap.from(containerRef.current, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                    opacity: 0,
                    y: 60,
                    duration: 0.9,
                    ease: "power3.out",
                });
            }, containerRef);

            return () => ctx.revert();
        },
        { scope: containerRef }
    );

    const imgSizeClass = isMobileApp
        ? "h-[320px] md:h-[420px]"
        : "h-[280px] md:h-[380px] lg:h-[420px]";

    return (
        <div
            ref={containerRef}
            className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""
                } items-center gap-8 lg:gap-16 my-12 lg:my-24`}
        >
            <div className="w-full md:w-1/2 flex justify-center">
                <div
                    ref={cardRef}
                    className="relative w-full rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/25"
                >
                    <div
                        className={`relative overflow-hidden rounded-xl bg-black/50 w-full flex items-center justify-center ${imgSizeClass}`}
                    >
                        <img
                            ref={imgRef}
                            src={pathImg}
                            alt={heading}
                            className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left space-y-6">
                <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
                        {heading}
                    </h3>
                    <div className="h-[2px] w-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full" />
                </div>

                <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
                    {subheading}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                    {liveLink && (
                        <ProjectButton href={liveLink} label="Live Demo" icon="↗" />
                    )}
                    {behance && (
                        <ProjectButton href={behance} label="Behance" icon="↗" />
                    )}
                    {github && (
                        <ProjectButton href={github} label="GitHub" icon="↗" />
                    )}
                </div>
            </div>
        </div>
    );
};

const ProjectButton = ({ href, label, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative px-6 py-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
    >
        <div className="relative z-10 flex items-center gap-2">
            <span className="text-sm font-medium text-white group-hover:text-white transition-colors">
                {label}
            </span>
            <span className="text-xs opacity-80 group-hover:opacity-100">{icon}</span>
        </div>
    </a>
);

export default ProCard;