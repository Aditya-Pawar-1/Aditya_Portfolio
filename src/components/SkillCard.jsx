import { useRef } from "react";
import gsap from "gsap";

const SkillCard = ({ title, skill, index }) => {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: -6,
      scale: 1.02,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="skill-card h-full rounded-2xl border border-white/10 bg-white/5 px-6 py-6 md:px-7 md:py-7 backdrop-blur-sm transition-colors duration-200 hover:border-white/30"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
