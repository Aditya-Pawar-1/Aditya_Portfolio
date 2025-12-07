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
      const img = imgRef.current;
      if (!card || !img) return;

      const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });
      const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });
      const imgXTo = gsap.quickTo(img, "x", { duration: 0.4, ease: "power3.out" });
      const imgYTo = gsap.quickTo(img, "y", { duration: 0.4, ease: "power3.out" });

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rotateY = ((mouseX - width / 2) / width) * 6;
        const rotateX = ((mouseY - height / 2) / height) * -6;
        rotateYTo(rotateY);
        rotateXTo(rotateX);
        imgXTo((mouseX - width / 2) * 0.05);
        imgYTo((mouseY - height / 2) * 0.05);
      };

      const handleMouseLeave = () => {
        rotateYTo(0);
        rotateXTo(0);
        imgXTo(0);
        imgYTo(0);
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
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center gap-8 lg:gap-16 my-4 lg:my-8`}
    >
      <div className="w-full md:w-1/2 flex justify-center">
        <div
          ref={cardRef}
          className="group relative w-full rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-white/25"
          style={{ transformStyle: "preserve-3d" }}
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

          <div className="pointer-events-none absolute inset-x-4 top-3 h-20 bg-gradient-to-b from-white/10 via-white/0 to-transparent rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-left space-y-6">
        <div className="space-y-3">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            {heading}
          </h3>
          <div className="h-[2px] w-16 bg-gradient-to-r from-white to-neutral-500 rounded-full" />
        </div>

        <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
          {subheading}
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          {liveLink && <ProjectButton href={liveLink} label="Live Demo" icon="↗" />}
          {behance && <ProjectButton href={behance} label="Behance" icon="↗" />}
          {github && <ProjectButton href={github} label="GitHub" icon="↗" />}
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
    className="group relative px-6 py-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/12 hover:border-white/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.7)] active:scale-95"
  >
    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10 flex items-center gap-2">
      <span className="text-sm font-medium text-white transition-colors">
        {label}
      </span>
      <span className="text-xs opacity-80 group-hover:opacity-100 translate-y-[1px] transition-transform duration-300 group-hover:translate-x-0.5">
        {icon}
      </span>
    </div>
  </a>
);

export default ProCard;