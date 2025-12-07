import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useIsMobile from "../hooks/useIsMobile";

const SkillCard = ({ title, skill, index }) => {
  const cardRef = useRef(null);
  const isMobile = useIsMobile();

  useGSAP(
    () => {
      if (isMobile) return;
      const card = cardRef.current;
      if (!card) return;

      const rotateYTo = gsap.quickTo(card, "rotateY", {
        duration: 0.35,
        ease: "power3.out",
      });
      const rotateXTo = gsap.quickTo(card, "rotateX", {
        duration: 0.35,
        ease: "power3.out",
      });

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateY = ((mouseX - width / 2) / width) * 8;
        const rotateX = ((mouseY - height / 2) / height) * -8;

        rotateYTo(rotateY);
        rotateXTo(rotateX);
      };

      const handleMouseLeave = () => {
        rotateYTo(0);
        rotateXTo(0);
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef, dependencies: [isMobile] }
  );

  const handleMouseEnter = () => {
    if (!cardRef.current || isMobile) return;
    gsap.to(cardRef.current, {
      y: -6,
      scale: 1.02,
      boxShadow: "0 22px 55px rgba(0,0,0,0.65)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isMobile) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="h-full rounded-2xl border border-white/10 bg-white/5 px-6 py-6 md:px-7 md:py-7 backdrop-blur-sm transition-colors duration-200 hover:border-white/40 relative overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <h4 className="text-lg md:text-xl font-semibold mb-4 text-white">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {skill.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1 text-xs md:text-base text-gray-300 bg-black/30 rounded-full border border-white/10 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;