import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useIsMobile from "../hooks/useIsMobile";

const SkillCard = ({ title, skill, index }) => {
  const cardRef = useRef(null);
  const isMobile = useIsMobile();

  useGSAP((context, contextSafe) => {
      if (isMobile) return;
      const card = cardRef.current;
      if (!card) return;

      const rotateYTo = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power3.out" });
      const rotateXTo = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power3.out" });

      const handleMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateY = ((mouseX - width / 2) / width) * 10;
        const rotateX = ((mouseY - height / 2) / height) * -10;

        rotateYTo(rotateY);
        rotateXTo(rotateX);
      };

      const handleMouseEnter = contextSafe(() => {

        gsap.to(card, {
          scale: 1.03,
          borderColor: "rgba(255,255,255,0.4)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          backgroundColor: "rgba(255,255,255,0.08)",
          duration: 0.3,
        });

        gsap.to(".skill-title", {
            x: 5,
            color: "#818cf8",
            duration: 0.3
        });

        gsap.to(".skill-pill", {
            y: -5,
            stagger: 0.05,
            duration: 0.2,
            ease: "back.out(2)",
            yoyo: true,
            repeat: 1
        });
      });

      const handleMouseLeave = contextSafe(() => {

        rotateYTo(0);
        rotateXTo(0);

        gsap.to(card, {
          scale: 1,
          borderColor: "rgba(255,255,255,0.1)",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
          backgroundColor: "rgba(255,255,255,0.05)",
          duration: 0.3,
        });

        gsap.to(".skill-title", {
            x: 0,
            color: "#ffffff",
            duration: 0.3
        });

        gsap.to(".skill-pill", { y: 0, duration: 0.2, overwrite: true });
      });

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef, dependencies: [isMobile] }
  );

  return (
    <div
      ref={cardRef}
      className="h-full rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm relative overflow-hidden group perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <h4 className="skill-title text-xl font-bold mb-6 text-white will-change-transform">
        {title}
      </h4>
      
      <div className="flex flex-wrap gap-3">
        {skill.map((item, idx) => (
          <span
            key={idx}
            className="skill-pill inline-block px-3 py-1.5 text-sm font-medium text-gray-300 bg-white/5 rounded-lg border border-white/10 transition-colors duration-200 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20 cursor-default will-change-transform"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCard;